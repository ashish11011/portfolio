import { Fragment, type ReactNode } from "react";
import type { ProjectDocument } from "@/types/project";
import { isImageSource, isProjectLink } from "@/lib/projects.validation";

function renderNode(node: ProjectDocument, key: number): ReactNode {
  const children = node.content?.map(renderNode);
  if (node.type === "text") {
    let text: ReactNode = node.text || "";
    for (const mark of node.marks || []) {
      switch (mark.type) {
        case "bold": text = <strong>{text}</strong>; break;
        case "italic": text = <em>{text}</em>; break;
        case "underline": text = <u>{text}</u>; break;
        case "strike": text = <s>{text}</s>; break;
        case "code": text = <code>{text}</code>; break;
        case "link": {
          const href = String(mark.attrs?.href || "");
          if (isProjectLink(href)) text = <a href={href} rel="noreferrer">{text}</a>;
          break;
        }
      }
    }
    return <Fragment key={key}>{text}</Fragment>;
  }
  switch (node.type) {
    case "doc": return <Fragment key={key}>{children}</Fragment>;
    case "paragraph": return <p key={key}>{children}</p>;
    case "heading": return node.attrs?.level === 3 ? <h3 key={key}>{children}</h3> : <h2 key={key}>{children}</h2>;
    case "bulletList": return <ul key={key}>{children}</ul>;
    case "orderedList": return <ol key={key} start={Number(node.attrs?.start) || 1}>{children}</ol>;
    case "listItem": return <li key={key}>{children}</li>;
    case "blockquote": return <blockquote key={key}>{children}</blockquote>;
    case "codeBlock": return <pre key={key}><code>{children}</code></pre>;
    case "hardBreak": return <br key={key} />;
    case "horizontalRule": return <hr key={key} />;
    case "image": {
      const src = String(node.attrs?.src || "");
      return isImageSource(src) ? <img key={key} src={src} alt={String(node.attrs?.alt || "")} loading="lazy" /> : null;
    }
    default: return null;
  }
}

export function ProjectContent({ content }: { content: ProjectDocument }) {
  return <div className="tiptap break-words">{renderNode(content, 0)}</div>;
}
