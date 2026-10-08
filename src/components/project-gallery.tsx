"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ProjectGalleryProps = {
  projectName: string;
  images: readonly string[];
  priority?: boolean;
};

export function ProjectGallery({ projectName, images, priority = false }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  if (!images.length) return null;

  const activeIndex = selectedIndex % images.length;
  const hasMultipleImages = images.length > 1;

  return (
    <div
      role="group"
      aria-roledescription={hasMultipleImages ? "carousel" : undefined}
      aria-label={`${projectName} screenshots`}
      className="flex min-w-0 flex-col gap-3"
    >
      <div className="motion-image-frame relative aspect-[3/2] overflow-hidden rounded-lg border bg-muted">
        <Image
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${projectName} screenshot ${activeIndex + 1} of ${images.length}`}
          fill
          unoptimized={images[activeIndex].startsWith("http")}
          sizes="(max-width: 768px) 100vw, 704px"
          className="gallery-image motion-image object-contain"
          priority={priority && activeIndex === 0}
        />
      </div>
      {hasMultipleImages && (
        <>
          <div className="flex items-center justify-between gap-3">
            <Button type="button" variant="outline" size="icon" aria-label={`Previous image for ${projectName}`}
              onClick={() => setSelectedIndex((activeIndex - 1 + images.length) % images.length)}>
              <ChevronLeft aria-hidden="true" />
            </Button>
            <p role="status" aria-live="polite" aria-atomic="true" className="eyebrow">
              Image {activeIndex + 1} of {images.length}
            </p>
            <Button type="button" variant="outline" size="icon" aria-label={`Next image for ${projectName}`}
              onClick={() => setSelectedIndex((activeIndex + 1) % images.length)}>
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto p-1.5" aria-label="Choose a screenshot">
            {images.map((src, index) => (
              <button key={`${src}-${index}`} type="button" aria-label={`Show image ${index + 1} for ${projectName}`}
                aria-pressed={activeIndex === index} onClick={() => setSelectedIndex(index)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border bg-muted transition-colors ${activeIndex === index ? "border-foreground" : "border-border hover:border-neutral-400"}`}>
                <Image src={src} alt="" fill unoptimized={src.startsWith("http")} sizes="96px" className="object-contain" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
