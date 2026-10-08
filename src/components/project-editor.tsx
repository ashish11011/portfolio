"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TiptapImage from "@tiptap/extension-image";
import { ArrowDown, ArrowUp, Bold, Italic, List, ListOrdered, Trash2, Underline as UnderlineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectContent } from "@/components/project-content";
import { isImageSource, isProjectLink } from "@/lib/projects.validation";
import { saveProject } from "@/lib/projects.actions";
import type { Project, ProjectDocument } from "@/types/project";

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return <div className="flex min-w-0 flex-col gap-2"><label htmlFor={id} className="text-sm font-medium">{label}</label>{children}</div>;
}
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function ProjectEditor({ initialProject, storageReady, isNew = false }: { initialProject: Project; storageReady: boolean; isNew?: boolean }) {
  const [project, setProject] = useState(initialProject);
  const [imageUrl, setImageUrl] = useState("");
  const [contentImage, setContentImage] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } }), TiptapLink.configure({ openOnClick: false }), Underline, TiptapImage],
    content: initialProject.content,
    editorProps: { attributes: { class: "tiptap min-h-80 p-6 focus:outline-none", role: "textbox", "aria-label": "Project content", "aria-multiline": "true" } },
    onUpdate: ({ editor }) => setProject((current) => ({ ...current, content: editor.getJSON() as ProjectDocument })),
  });
  function setField<K extends keyof Project>(field: K, value: Project[K]) {
    setProject((current) => ({ ...current, [field]: value }));
  }
  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || uploading) return;
    setSaving(true);
    setMessage("");
    try {
      const result = await saveProject({ ...project, content: editor?.getJSON() || project.content });
      if (!result.success) { setMessage(result.message); return; }
      setProject(result.project);
      editor?.commands.setContent(result.project.content);
      setMessage("Project saved. The public pages are updated.");
      if (isNew) router.replace(`/admin/projects/${result.project.id}`);
      router.refresh();
    } catch { setMessage("Couldn’t save this project. Please try again."); }
    finally { setSaving(false); }
  }
  function addImage() {
    const url = imageUrl.trim();
    if (!isImageSource(url)) { setMessage("Enter a valid image URL or a local path starting with /."); return; }
    if (!project.images.includes(url)) setField("images", [...project.images, url]);
    setImageUrl("");
    setMessage("");
  }
  function moveImage(index: number, direction: number) {
    const images = [...project.images];
    [images[index], images[index + direction]] = [images[index + direction], images[index]];
    setField("images", images);
  }
  async function uploadImages(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const files = Array.from(input.files || []);
    if (!files.length) return;
    setUploading(true);
    setMessage("");
    try {
      for (const file of files) {
        const response = await fetch("/api/projects/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileType: file.type, fileSize: file.size }) });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Couldn’t prepare the image upload.");
        const upload = await fetch(data.url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
        if (!upload.ok) throw new Error(`Couldn’t upload ${file.name}. Please try again.`);
        setProject((current) => ({ ...current, images: [...current.images, data.imageUrl] }));
      }
      setMessage("Images uploaded. Save the project to publish them.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Image upload failed."); }
    finally { setUploading(false); input.value = ""; }
  }
  const toolbar = [
    { label: "Bold", icon: <Bold size={16} />, active: editor?.isActive("bold"), action: () => editor?.chain().focus().toggleBold().run() },
    { label: "Italic", icon: <Italic size={16} />, active: editor?.isActive("italic"), action: () => editor?.chain().focus().toggleItalic().run() },
    { label: "Underline", icon: <UnderlineIcon size={16} />, active: editor?.isActive("underline"), action: () => editor?.chain().focus().toggleUnderline().run() },
    { label: "Heading", icon: "H2", active: editor?.isActive("heading", { level: 2 }), action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "Subheading", icon: "H3", active: editor?.isActive("heading", { level: 3 }), action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "Bullet list", icon: <List size={16} />, active: editor?.isActive("bulletList"), action: () => editor?.chain().focus().toggleBulletList().run() },
    { label: "Numbered list", icon: <ListOrdered size={16} />, active: editor?.isActive("orderedList"), action: () => editor?.chain().focus().toggleOrderedList().run() },
    { label: "Quote", icon: "❞", active: editor?.isActive("blockquote"), action: () => editor?.chain().focus().toggleBlockquote().run() },
    { label: "Code block", icon: "</>", active: editor?.isActive("codeBlock"), action: () => editor?.chain().focus().toggleCodeBlock().run() },
  ];
  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1>{isNew ? "New project" : `Edit ${initialProject.name}`}</h1>
        {!isNew && <Link href={`/projects/${project.slug}`} className="text-link" target="_blank">View project</Link>}
      </div>
      {!storageReady && <p role="status" className="rounded-lg border bg-muted p-4 text-sm">Project storage is unavailable. Changes cannot be saved until the project database is configured.</p>}
      <fieldset disabled={saving} className="flex min-w-0 flex-col gap-8">
        <section className="surface flex flex-col gap-6" aria-labelledby="editor-basics">
          <h2 id="editor-basics">Project information</h2>
          <Field label="Project name" id="project-name"><Input id="project-name" value={project.name} required maxLength={200} onChange={(event) => {
            const name = event.target.value;
            setProject((current) => ({ ...current, name, slug: isNew && (!current.slug || current.slug === slugify(current.name)) ? slugify(name) : current.slug }));
          }} /></Field>
          <Field label="URL slug" id="project-slug"><Input id="project-slug" value={project.slug} required maxLength={150} pattern="[a-z0-9]+(-[a-z0-9]+)*" onChange={(event) => setField("slug", event.target.value)} /><p className="eyebrow">/projects/{project.slug || "your-project"}</p></Field>
          <Field label="Short summary" id="project-summary"><textarea id="project-summary" className="field" rows={3} maxLength={1000} value={project.summary} onChange={(event) => setField("summary", event.target.value)} /></Field>
          <Field label="Description" id="project-description"><textarea id="project-description" className="field" rows={5} required maxLength={10000} value={project.description} onChange={(event) => setField("description", event.target.value)} /></Field>
          <Field label="Website URL" id="project-website"><Input id="project-website" type="url" placeholder="https://example.com" value={project.website} onChange={(event) => setField("website", event.target.value)} /></Field>
          <Field label="Logo URL or local path" id="project-logo"><Input id="project-logo" value={project.logo} onChange={(event) => setField("logo", event.target.value)} /></Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Highlights (one per line)" id="project-features"><textarea id="project-features" className="field" rows={5} value={project.features.join("\n")} onChange={(event) => setField("features", event.target.value.split("\n"))} /></Field>
            <Field label="Technologies (one per line)" id="project-technologies"><textarea id="project-technologies" className="field" rows={5} value={project.technologies.join("\n")} onChange={(event) => setField("technologies", event.target.value.split("\n"))} /></Field>
          </div>
        </section>
        <section className="surface flex flex-col gap-6" aria-labelledby="editor-images">
          <h2 id="editor-images">Project images</h2>
          <p className="text-sm text-muted-foreground">The first image is the cover. Add, replace, reorder, or remove screenshots below.</p>
          <Field label="Upload images" id="project-upload"><Input id="project-upload" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/avif" disabled={uploading} onChange={uploadImages} /><p className="eyebrow">Up to 10 MB per image. {uploading ? "Uploading…" : "You can also use existing URLs or local image paths."}</p></Field>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1"><Field label="Image URL or local path" id="project-image-url"><Input id="project-image-url" value={imageUrl} placeholder="/project/1.png or https://…" onChange={(event) => setImageUrl(event.target.value)} /></Field></div>
            <Button type="button" variant="outline" onClick={addImage}>Add image</Button>
          </div>
          {project.images.map((src, index) => (
            <div key={index} className="flex flex-col gap-3 rounded-md border p-4">
              <Field label={`Image ${index + 1} URL`} id={`project-image-${index}`}><Input id={`project-image-${index}`} value={src} onChange={(event) => setField("images", project.images.map((image, position) => position === index ? event.target.value : image))} /></Field>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon" aria-label={`Move image ${index + 1} up`} disabled={index === 0} onClick={() => moveImage(index, -1)}><ArrowUp /></Button>
                <Button type="button" variant="outline" size="icon" aria-label={`Move image ${index + 1} down`} disabled={index === project.images.length - 1} onClick={() => moveImage(index, 1)}><ArrowDown /></Button>
                <Button type="button" variant="outline" aria-label={`Remove image ${index + 1}`} onClick={() => setField("images", project.images.filter((_, position) => position !== index))}><Trash2 /> Remove</Button>
              </div>
            </div>
          ))}
          <ProjectGallery projectName={project.name || "Project preview"} images={project.images.filter(isImageSource)} />
        </section>
        <section className="surface flex flex-col gap-6" aria-labelledby="editor-content">
          <h2 id="editor-content">Project content</h2>
          <p className="text-sm text-muted-foreground">Tell the story: goals, your role, challenges, approach, and results.</p>
          <div className="overflow-hidden rounded-md border">
            <div role="toolbar" aria-label="Content formatting" className="flex flex-wrap gap-2 border-b bg-muted p-3">
              {toolbar.map((item) => <Button key={item.label} type="button" variant={item.active ? "secondary" : "ghost"} size="icon" aria-label={item.label} aria-pressed={Boolean(item.active)} disabled={!editor} onClick={item.action}>{item.icon}</Button>)}
              <Button type="button" variant="ghost" size="sm" disabled={!editor?.can().undo()} onClick={() => editor?.chain().focus().undo().run()}>Undo</Button>
              <Button type="button" variant="ghost" size="sm" disabled={!editor?.can().redo()} onClick={() => editor?.chain().focus().redo().run()}>Redo</Button>
            </div>
            <EditorContent editor={editor} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1"><Field label="Link URL" id="project-content-link"><Input id="project-content-link" value={linkUrl} onChange={(event) => setLinkUrl(event.target.value)} placeholder="Select some text, then add its link" /></Field></div>
            <Button type="button" variant="outline" disabled={!editor} onClick={() => {
              if (!linkUrl.trim()) { editor?.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
              if (!isProjectLink(linkUrl.trim())) { setMessage("Enter a valid link URL."); return; }
              editor?.chain().focus().extendMarkRange("link").setLink({ href: linkUrl.trim() }).run(); setLinkUrl("");
            }}>Apply link</Button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1"><Field label="Content image URL" id="project-content-image"><Input id="project-content-image" value={contentImage} onChange={(event) => setContentImage(event.target.value)} placeholder="Use an uploaded image URL or local path" /></Field></div>
            <Button type="button" variant="outline" disabled={!editor} onClick={() => {
              if (!isImageSource(contentImage.trim())) { setMessage("Enter a valid content image URL."); return; }
              editor?.chain().focus().setImage({ src: contentImage.trim(), alt: project.name }).run(); setContentImage("");
            }}>Insert image</Button>
          </div>
        </section>
        <section className="surface flex flex-col gap-6" aria-labelledby="editor-publishing">
          <h2 id="editor-publishing">Publishing</h2>
          <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={project.isVisible} onChange={(event) => setField("isVisible", event.target.checked)} />Visible on the portfolio</label>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Projects page order" id="project-order"><Input id="project-order" type="number" min={0} max={10000} required value={project.sortOrder} onChange={(event) => setField("sortOrder", Number(event.target.value))} /></Field>
            <Field label="Homepage order (blank to unfeature)" id="project-featured-order"><Input id="project-featured-order" type="number" min={0} max={10000} value={project.featuredOrder ?? ""} onChange={(event) => setField("featuredOrder", event.target.value === "" ? null : Number(event.target.value))} /></Field>
          </div>
        </section>
      </fieldset>
      <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t bg-white py-4">
        <Button type="submit" disabled={saving || uploading || !storageReady}>{saving ? "Saving…" : "Save project"}</Button>
        <Button type="button" variant="outline" onClick={() => setPreview(!preview)}>{preview ? "Hide preview" : "Preview content"}</Button>
        <p role="status" aria-live="polite" className="w-full text-sm text-muted-foreground">{message}</p>
      </div>
      {preview && <section className="surface flex flex-col gap-6" aria-label="Project content preview"><h2>{project.name}</h2><p className="whitespace-pre-line text-muted-foreground">{project.description}</p><ProjectContent content={project.content} /></section>}
    </form>
  );
}
