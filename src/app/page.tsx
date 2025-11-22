import NavBar from "@/components/navBar";
import Image from "next/image";

import { Footer } from "@/components/footer";
import ProjectSection from "./projectSection";
import Experience from "./experienceSection";
import SubscriptionSection from "./subscriptionSection";
import ResumeSection from "./resumeSectino";
import TestimonialSection from "./testimonialSection";

export default function Home() {
  return (
    <div className="">
      <div className=" w-full min-h-screen  dark:bg-darkColor flex gap-12 flex-col px-4">
        <NavBar />
        <HeroSection />
        <ProjectSection />
        <Experience />
        <TestimonialSection />
        <SubscriptionSection />
        <ResumeSection />
        <Footer />
      </div>
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className=" flex gap-6 flex-col max-w-3xl w-full mx-auto mt-40">
      <div className="flex justify-between flex-col-reverse sm:flex-row  gap-6 w-full">
        <h1 className="  pt-2 sm:text-4xl text-4xl text-gray-500 font-semibold gap-2 dark:text-gray-200 ">
          👋 Hi, I’m <br className=" block sm:hidden" />
          <span className="text-black">Ashish Bishnoi</span>
        </h1>
        <div className="">
          <div className="p-2 relative w-fit translate-x-2/3 sm:translate-x-0 ">
            <Image
              className="rounded"
              src="/ashish-img.jpg"
              width={80}
              height={80}
              alt="Picture of the author"
            />
            <div className="absolute right-0 top-4 h-full w-[0.5px] bg-gradient-to-b from-white via-gray-400 to-white dark:from-gray-800 dark:via-gray-400 dark:to-gray-800 "></div>

            <div className="absolute -top-8 right-0 flex h-8 w-32 flex-col justify-end overflow-hidden">
              <div className="bottom-0 -mb-[4px] h-1 w-full blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>

              <div className="blur-[0.1px] bottom-0 h-[0.5px] w-full [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            </div>
          </div>
        </div>
      </div>

      <h2 className=" w-full text-gray-600 text-xl max-w-2xl dark:text-gray-200">
        Software Engineer & Full Stack Developer - building modern{" "}
        <span className=" font-semibold">
          SAAS products, Scalable Web Apps Building
        </span>
      </h2>

      <p className=" max-w-xl text-gray-600 dark:text-gray-200 ">
        Creating fast, scalable apps with Next.js, TypeScript, and AWS - always
        exploring better deployments.
      </p>
    </div>
  );
};
