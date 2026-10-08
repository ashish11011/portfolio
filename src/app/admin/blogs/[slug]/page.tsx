import React from "react";

import TiptapEditor from "./../editor";
import { getBlogBySlug } from "@/lib/blog.helper";
import { notFound } from "next/navigation";

const Page = async (context: any) => {
  const slug = (await context.params).slug;
  const [blogData] = await getBlogBySlug(slug);
  if (!blogData) notFound();
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <TiptapEditor data={blogData} />
    </main>
  );
};

export default Page;
