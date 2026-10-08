"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

export function TableOfContents({ slug }: { slug: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const content = document.querySelector(".tiptap");
    if (!content) return;
    const elements = Array.from(content.querySelectorAll<HTMLElement>("h1, h2, h3"));
    setHeadings(elements.map((heading, index) => {
      const id = heading.id || `${heading.innerText.toLowerCase().replace(/\s+/g, "-")}-${index}`;
      heading.id = id;
      return { id, text: heading.innerText, level: Number(heading.tagName.slice(1)) };
    }));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: "0px 0px -70% 0px", threshold: 1 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [slug]);

  if (!headings.length) return null;
  return (
    <nav aria-label="Table of contents" className="rounded-lg border p-6">
      <p className="eyebrow mb-4">On this page</p>
      <ul className="flex flex-col gap-2 text-sm">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: `${Math.max(0, level - 2) * 16}px` }}>
            <a href={`#${id}`} aria-current={activeId === id ? "location" : undefined} className={`hover:underline underline-offset-4 ${activeId === id ? "font-medium text-foreground" : "text-muted-foreground"}`}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
