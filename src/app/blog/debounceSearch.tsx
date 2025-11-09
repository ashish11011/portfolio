"use client";
import { SearchIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
// import debounce from "lodash.debounce";

import { useRouter } from "next/navigation";
import { blogCategorySummery } from "../admin/blogs/selectblogcategory";
const DebounceSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = async (query: any) => {
    router.push(`/blog?search=${query}`);
  };

  // const debouncedSearch: any = useCallback<any>(
  //   debounce((query: any) => {
  //     handleSearch(query);
  //   }, 500),
  //   []
  // );

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);
    // debouncedSearch(value);
  };

  function handleCategoryFilter(blogCategorySlug: any) {
    // setSearchTerm('');

    if (blogCategorySlug === "all") {
      router.push(`/blog`);
      return;
    }

    router.push(`/blog?category=${blogCategorySlug}`);
  }

  return (
    <div className="flex min-h-80 w-full flex-col items-center justify-center space-y-8 bg-yellow-300/30 px-4 md:min-h-96">
      <h3 className="text-center text-3xl font-semibold text-neutral-700 md:text-4xl">
        Explore Our Latest Blogs & Insights
      </h3>
      <div className="flex w-full max-w-xl items-center justify-center rounded-3xl bg-white px-4 py-2.5 shadow transition-all focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          placeholder="Search blogs"
          value={searchTerm}
          onChange={handleChange}
          className="w-full bg-transparent px-2 py-1 text-sm placeholder-gray-400 focus:outline-none"
        />
        <SearchIcon size={20} className="text-gray-400" />
      </div>
      <div className="mb-12 flex w-full flex-col items-center justify-between gap-3 sm:flex-row sm:gap-6">
        <div className="w-full overflow-x-auto">
          <div className="flex w-full min-w-[48rem] items-center justify-center gap-6 overflow-x-auto py-4 lg:gap-10">
            {blogCategorySummery?.map((item, idx) => {
              return (
                <p
                  key={idx}
                  onClick={() => handleCategoryFilter(item.value)}
                  className="cursor-pointer hover:underline"
                >
                  {item.label}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebounceSearch;
