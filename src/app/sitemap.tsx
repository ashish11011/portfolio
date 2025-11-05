import { MetadataRoute } from "next";

const pages = ["/", "/projects", "/contact-me"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const pathEntries = pages.map((path) => ({
    url: `${baseUrl}${path}/`,
    lastModified: new Date().toISOString(),
  }));

  return [...pathEntries];
}
