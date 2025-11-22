import React from "react";

import TiptapEditor from "./../editor";
import { getBlogBySlug } from "@/lib/blog.helper";

const Page = async (context: any) => {
  const slug = (await context.params).slug;
  const [blogData] = await getBlogBySlug(slug);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28">
      <TiptapEditor data={blogData} />
    </div>
  );
};

export default Page;
