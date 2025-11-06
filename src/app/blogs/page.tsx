import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Talks - Ashish Bishnoi",
  description:
    "Sharing my experiences, lessons, and ideas in tech - from building scalable apps to exploring new web technologies.",
  openGraph: {
    title: "Ashish Bishnoi",
    description:
      "Sharing my experiences, lessons, and ideas in tech - from building scalable apps to exploring new web technologies.",
    url: "https://www.ashishbishnoi.com/blogs",
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
      "Sharing my experiences, lessons, and ideas in tech - from building scalable apps to exploring new web technologies.",
    images: ["https://ik.imagekit.io/hop/1718461831024.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const Page = () => {
  return (
    <div className="px-4 min-h-screen h-full bg-white dark:bg-darkColor flex flex-col gap-12">
      <NavBar />
      <div className="h-20"></div>
      <FreelanceHead />
      <BlogsSection />
      <Footer className="mt-auto border" />
    </div>
  );
};

export default Page;

function FreelanceHead() {
  return (
    <div className=" max-w-4xl mx-auto w-full flex flex-col gap-6">
      <p className=" text-5xl font-bold text-gray-800">Tech talks</p>
      <div className=" flex flex-col gap-2">
        <p className=" text-gray-600">
          Insights, lessons, and experiments from my journey in web development
          and product building.
        </p>
      </div>
    </div>
  );
}

function BlogsSection() {
  return (
    <div className=" px-4 md:px-0 max-w-4xl mx-auto w-full flex flex-col gap-6">
      <p className=" text-gray-800">comming soon</p>
    </div>
  );
}
