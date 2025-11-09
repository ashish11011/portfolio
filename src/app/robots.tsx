import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Admin and API
          "/admin/",
          "/admin/*",
          "/blogs/",
          "/api/",
          "/api/*",

          // Disallow static files
          "/*.jpg$",
          "/*.jpeg$",
          "/*.png$",
          "/*.gif$",
          "/*.webp$",
          "/*.svg$",
          "/*.mp4$",
          "/*.webm$",
          "/*.mov$",
          "/*.pdf$",
          "/*.doc$",
          "/*.docx$",
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
