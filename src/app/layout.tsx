import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ashish Bishnoi",
  description:
    "Creating fast, scalable apps with Next.js, TypeScript, and AWS - always exploring better deployments.",
  openGraph: {
    title: "Ashish Bishnoi",
    description:
      "Creating fast, scalable apps with Next.js, TypeScript, and AWS - always exploring better deployments.",
    url: "https://www.ashishbishnoi.com",
    siteName: "Ashish Bishnoi",
    images: [
      {
        url: "https://ik.imagekit.io/hop/1718461831024.jpeg",
        width: 512,
        height: 512,
        alt: "Ashish Bishnoi Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Bishnoi",
    description:
      "Creating fast, scalable apps with Next.js, TypeScript, and AWS - always exploring better deployments.",
    images: ["https://ik.imagekit.io/hop/1718461831024.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Cb1GJz6cXV30OfW6PyQDLKilPa0DRJtDpLnFL2V7C6g"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
