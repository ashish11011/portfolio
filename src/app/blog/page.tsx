import { Metadata } from "next";

import ShowBlogs from "./showBlogs";
import { BlogPagination } from "./paginationblog";
import { getAllBlogsByPage } from "@/lib/blog.helper";
import NavBar from "@/components/navBar";
import { Footer } from "@/components/footer";
import ContactForm from "../contact-me/contactForm";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: {
    absolute: "Ashish Bishnoi blog",
  },
  description: "Read new tech related blogs from Ashish Bishnoi",
  alternates: {
    canonical: "https://www.ashishbishnoi.com/blog/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ashish Bishnoi blog",
    description: "Read new tech related blogs from Ashish Bishnoi",
    url: "https://www.ashishbishnoi.com/blog/",
    siteName: "Ashish Bishnoi",
    type: "website",
  },
};

const Blog = async ({ searchParams }: any) => {
  const PAGE_LIMIT = 10;
  const searchParamsData = await searchParams;
  const currentPage = searchParamsData.page || 1;
  const searchText = searchParamsData.search || "";
  const selectedCategory = searchParamsData.category || "";

  const blogData = await getAllBlogsByPage({
    page: currentPage,
    limit: PAGE_LIMIT,
    selectedCategory,
    search: searchText,
  });

  return (
    <div className="pt-24 text-black">
      <NavBar />
      {/* <DebounceSearch /> */}
      <div className="fontTest mx-auto mt-10 max-w-7xl px-6 md:px-4">
        <ShowBlogs
          key={String(currentPage + selectedCategory)}
          blogData={blogData?.data}
        />
      </div>
      {(blogData?.data?.length as number) > 0 ? (
        <BlogPagination
          limit={PAGE_LIMIT}
          page={Number(currentPage)}
          totalPages={Number(blogData?.totalPages)}
        />
      ) : null}
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Blog;
