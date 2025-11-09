"use client";
import Link from "next/link";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { blogCategories } from "../admin/blogs/selectblogcategory";

dayjs.extend(utc);
const ShowBlogs = ({ blogData }: any) => {
  const [filteredBlogs, setFilteredBlogs] = useState(blogData);
  const router = useRouter();

  const params = useSearchParams();
  const searchparam = params.get("search");

  useEffect(() => {
    setFilteredBlogs(blogData);
    router.refresh();
  }, [searchparam]);

  return (
    <div className="flex flex-col">
      {filteredBlogs?.length > 0 ? (
        <div className="mb-12 flex h-full w-full flex-col items-center gap-6 md:flex-row">
          <div className="w-full max-w-2xl">
            <Link
              className="block w-full"
              href={`/blog/${filteredBlogs[0]?.slug}`}
            >
              <div className="w-full overflow-hidden rounded-2xl">
                <Image
                  // src={convertS3ToImageKit(filteredBlogs[0]?.image)}
                  src={filteredBlogs[0]?.image}
                  alt=""
                  width={800}
                  height={450}
                  className="h-auto w-full rounded-2xl"
                  sizes="(max-width: 768px) 1500px, 800px"
                />
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <p>{getBlogCategory(filteredBlogs[0]?.blogCategory)}</p>
            <Link href={`/blog/${filteredBlogs[0]?.slug}`}>
              <h1 className="text-3xl font-semibold hover:underline">
                {filteredBlogs[0]?.title}
              </h1>
            </Link>
            <p className="mb-4 text-xl font-medium text-gray-600">
              {filteredBlogs[0]?.metaDescription}
            </p>
            <p className="text-gray-400">{filteredBlogs[0]?.userName}</p>
          </div>
        </div>
      ) : (
        <p className="text-2xl font-semibold text-gray-500">No Blogs</p>
      )}
      <div className="mt-6 grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {filteredBlogs?.map((blog: any, idx: any) => {
            if (idx == 0) return;
            return <BlogCard blog={blog} idx={blog.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowBlogs;

function getBlogCategory(blogCategorySlug: any) {
  return blogCategories.find((item: any) => item.value === blogCategorySlug)
    ?.label;
}

function BlogCard({ blog, idx }: any) {
  function formatDateToDDMMYYYY(isoDateStr: string) {
    const date = dayjs.utc(JSON.parse(isoDateStr));
    return date.format("DD/MM/YYYY");
  }

  return (
    <div key={blog.id} className="relative mb-4 flex flex-col gap-2">
      <Link
        prefetch={false}
        href={`/blog/${blog?.slug}`}
        className="block w-full"
      >
        <div className="w-full overflow-hidden rounded-xl">
          <Image
            className="h-auto w-full"
            // src={convertS3ToImageKit(blog.image)}
            src={blog.image}
            alt={blog.title}
            width={800}
            height={450}
            sizes="(max-width: 768px) 1500px, 800px"
          />
        </div>
      </Link>

      <div className="flex gap-2 text-sm text-gray-600">
        <p className="">{blog.userName}</p>
        <p className=" ">{formatDateToDDMMYYYY(blog.date)}</p>
      </div>
      <Link
        href={`/blog/${blog?.slug}`}
        className="line-clamp-2 text-lg font-semibold hover:underline"
      >
        {blog.title}
      </Link>
      <p className="line-clamp-2 text-gray-600">{blog.metaDescription}</p>
    </div>
  );
}
