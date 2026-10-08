import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { defaultDescription, pageMetadata, siteName, siteUrl } from "@/lib/seo";
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-schibsted",
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata({ title: "Software Engineer & Full Stack Developer", description: defaultDescription, path: "/" }),
  metadataBase: new URL(siteUrl),
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  verification: { google: "Cb1GJz6cXV30OfW6PyQDLKilPa0DRJtDpLnFL2V7C6g" },
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${schibsted.variable} font-sans`}>{children}</body>
    </html>
  );
}
