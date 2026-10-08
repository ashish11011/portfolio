import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.ashishbishnoi.com").replace(/\/$/, "");
export const siteName = "Ashish Bishnoi";
export const defaultDescription = "Full-Stack Engineer and ex-Microsoft intern building scalable web products, backend systems, APIs, and cloud services with Next.js, TypeScript, and AWS.";
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();

export function pageMetadata({ title, description, path, image = "/ashish-img.jpg" }: {
  title: string; description: string; path: string; image?: string;
}): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const url = absoluteUrl(path);
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: fullTitle, description, url, siteName, locale: "en_IN", type: "website", images: [{ url: absoluteUrl(image), alt: title }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [absoluteUrl(image)] },
  };
}
