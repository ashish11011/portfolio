import type { Project, ProjectDocument } from "@/types/project";

export function isImageSource(value: string) {
  if (value.startsWith("/") && !value.startsWith("//") && !/[\\\s]/.test(value)) return true;
  try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; }
}

export function isProjectLink(value: string) {
  try { return ["https:", "http:", "mailto:", "tel:"].includes(new URL(value).protocol); } catch { return false; }
}

const nodeTypes = new Set(["doc", "paragraph", "text", "heading", "bulletList", "orderedList", "listItem", "blockquote", "codeBlock", "hardBreak", "horizontalRule", "image"]);
const markTypes = new Set(["bold", "italic", "strike", "underline", "code", "link"]);

function validateDocument(value: unknown): ProjectDocument {
  if (JSON.stringify(value)?.length > 300_000) throw new Error("Project content is too long.");
  let nodes = 0;
  function visit(input: unknown, depth: number): ProjectDocument {
    if (++nodes > 5000 || depth > 20 || !input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid project content.");
    const node = input as ProjectDocument;
    if (!nodeTypes.has(node.type)) throw new Error("Unsupported content format.");
    const result: ProjectDocument = { type: node.type };
    if (node.text !== undefined) {
      if (typeof node.text !== "string") throw new Error("Invalid content text.");
      result.text = node.text;
    }
    if (node.type === "heading") {
      const level = Number(node.attrs?.level);
      if (![1, 2, 3].includes(level)) throw new Error("Invalid heading level.");
      result.attrs = { level };
    }
    if (node.type === "image") {
      if (typeof node.attrs?.src !== "string" || !isImageSource(node.attrs.src)) throw new Error("Content images need a valid URL or local path.");
      result.attrs = { src: node.attrs.src, alt: typeof node.attrs.alt === "string" ? node.attrs.alt.slice(0, 500) : "" };
    }
    if (node.type === "orderedList") result.attrs = { start: Math.max(1, Math.min(10000, Number(node.attrs?.start) || 1)) };
    if (node.marks !== undefined) {
      if (!Array.isArray(node.marks) || node.marks.length > 10) throw new Error("Invalid text formatting.");
      result.marks = node.marks.map((mark) => {
        if (!mark || !markTypes.has(mark.type)) throw new Error("Unsupported text formatting.");
        if (mark.type === "link") {
          if (typeof mark.attrs?.href !== "string" || !isProjectLink(mark.attrs.href)) throw new Error("Content links need a valid URL.");
          return { type: "link", attrs: { href: mark.attrs.href } };
        }
        return { type: mark.type };
      });
    }
    if (node.content !== undefined) {
      if (!Array.isArray(node.content)) throw new Error("Invalid project content.");
      result.content = node.content.map((child) => visit(child, depth + 1));
    }
    return result;
  }
  const document = visit(value, 0);
  if (document.type !== "doc") throw new Error("Invalid project document.");
  return document;
}

export function validateProject(input: unknown): Project {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid project.");
  const data = input as Record<string, unknown>;
  function text(key: string, max: number, required = false) {
    if (typeof data[key] !== "string") throw new Error(`Invalid ${key}.`);
    const value = (data[key] as string).trim();
    if ((required && !value) || value.length > max) throw new Error(`Please check the ${key} field.`);
    return value;
  }
  function list(key: string, maxItems: number, maxLength: number) {
    if (!Array.isArray(data[key]) || data[key].length > maxItems) throw new Error(`Please check the ${key} list.`);
    const values = (data[key] as unknown[]).map((value) => {
      if (typeof value !== "string" || value.trim().length > maxLength) throw new Error(`Invalid ${key} item.`);
      return value.trim();
    }).filter(Boolean);
    return [...new Set(values)];
  }
  function order(value: unknown, nullable = false) {
    if (nullable && value === null) return null;
    if (!Number.isSafeInteger(value) || (value as number) < 0 || (value as number) > 10000) throw new Error("Display order must be a number from 0 to 10000.");
    return value as number;
  }
  const id = text("id", 150, true);
  const slug = text("slug", 150, true);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Use lowercase letters, numbers, and single hyphens for the project URL.");
  const images = list("images", 50, 2048);
  if (images.some((image) => !isImageSource(image))) throw new Error("Images need an http(s) URL or a local path starting with /.");
  const website = text("website", 2048);
  const logo = text("logo", 2048);
  if (website && (!isImageSource(website) || website.startsWith("/"))) throw new Error("The website needs a full http(s) URL.");
  if (logo && !isImageSource(logo)) throw new Error("The logo needs a valid image URL or local path.");
  if (typeof data.isVisible !== "boolean") throw new Error("Invalid visibility setting.");
  return {
    id, slug, name: text("name", 200, true), description: text("description", 10000, true), summary: text("summary", 1000),
    features: list("features", 100, 1000), technologies: list("technologies", 100, 100), images, website, logo,
    featuredOrder: order(data.featuredOrder, true), sortOrder: order(data.sortOrder) as number,
    isVisible: data.isVisible, content: validateDocument(data.content),
  };
}
