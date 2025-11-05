"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className="px-4  bg-white dark:bg-darkColor flex flex-col gap-12">
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="h-20"></div>
      <FreelanceHead />
      <FreelanceProjectList />
      <Footer />
    </div>
  );
};

function FreelanceHead() {
  return (
    <div className=" max-w-4xl mx-auto w-full flex flex-col gap-6">
      <p className=" text-5xl font-bold text-gray-800">Freelancing</p>
      <div className=" flex flex-col gap-2">
        <p className=" text-gray-600">
          I love building products and web apps for humans. 👑
        </p>
      </div>
    </div>
  );
}

function FreelanceProjectList() {
  return (
    <div className=" px-4 md:px-0 max-w-4xl mx-auto w-full flex flex-col gap-6 ">
      <p className=" text-3xl font-bold text-gray-800">Featured Projects</p>
      <div className=" flex flex-col gap-16">
        {freelancingData.map((data, index) => (
          <FreelancingCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

function FreelancingCard(props: any) {
  const { name, description, feature, techs, image, link } = props.data;

  const features = [
    "Nextjs",
    "Tailwind",
    "Remix",
    "User-fr display",
    "Secure integration",
  ];
  return (
    <div className=" flex flex-col md:flex-row gap-4 md:gap-8">
      <div className=" w-full shrink-0 md:w-[32rem] h-auto rounded-2xl shadow-lg overflow-hidden ">
        <img className=" w-full h-auto object-cover" src={image} alt="" />
      </div>
      <div className=" flex flex-col gap-0.5 md:gap-3 ">
        <p className=" text-3xl font-bold text-gray-800">{name}</p>
        <Link href={link} className=" underline ">
          {link}
        </Link>
        <div className=" flex flex-col w-full gap-2">
          {/* <div className=" text-gray-600">{description}</div> */}
          {/* <div className=" text-gray-600">
            Blogs, Twitter Threads, Essays and much more.
          </div> */}
        </div>
        <div className=" flex flex-col gap-1 mt-2">
          <div className=" font-semibold text-gray-800 ">Tect Stack</div>
          <div className=" flex flex-col gap-2 gap-y-0">
            {techs.map((tech: string) => (
              <div className=" text-gray-600">{tech}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;

const freelancingData = [
  {
    name: "Cozzy Corner",
    description:
      "Cozzy Corner is your go-to spot for high-quality anime action figures. Discover a curated collection that brings your favorite characters to life!",
    feature: [
      "Curated anime action figure collection",
      "User-friendly product display",
      "Secure payment integration",
    ],
    techs: ["Nextjs", "Tailwind", "Typescript", "MongoDB", "AWS", "Vercel"],
    image: "/project/1.png",
    link: "https://cozzycorner.in",
  },
  {
    name: "Roamify Planners",
    description:
      "Build flux wallet where a user can add and create their Solana balance.",
    feature: [
      "Create and manage Solana wallet balances",
      "Secure transaction features",
      "Easy to use UI for wallet management",
    ],
    techs: ["Nextjs", "Tailwind", "Typescript", "Postgress sql", "Vercel"],
    image: "/project/2.png",
    link: "https://www.roamifyplanners.in/",
  },
  {
    name: "Haus of Privae",
    description:
      "Developed a real-time chat application, allowing users to join specific chat rooms with room IDs for live conversations.",
    feature: [
      "Real-time chat functionality",
      "Custom chat room creation with unique room IDs",
      "Supports multiple concurrent users in a room",
    ],
    techs: [
      "Nextjs",
      "Tailwind",
      "Typescript",
      "Drizzle",
      "NextAuth",
      "Vercel",
      "AWS",
    ],
    image: "/project/3.png",
    link: "https://www.hausofprivae.com/",
  },
  {
    name: "SBN Infra",
    description:
      "Created a web app to prevent fake event entries. Features include participant data collection, QR code generation, and automated email delivery.",
    feature: [
      "QR code generation for event entry",
      "Real-time participant tracking",
      "Automated email delivery for confirmations",
    ],
    techs: ["Nextjs", "Tailwind", "Typescript", "Vercel"],
    image: "/project/4.png",
    link: "https://www.sbninfra.in/",
  },
  {
    name: "JB Supreme",
    description:
      "Created a website for social welfare and awareness, where people can subscribe to the newsletter and participate in upcoming events.",
    feature: [
      "Newsletter subscription integration",
      "Event participation management",
      "User-friendly design for social impact",
    ],
    techs: ["Nextjs", "Tailwind", "Vercel"],
    image: "/project/5.png",
    link: "https://www.superaxlecompany.com/", // Provide the link if available
  },
  {
    name: "The Adventure Bag Club",
    description:
      "Created a website for social welfare and awareness, where people can subscribe to the newsletter and participate in upcoming events.",
    feature: [
      "Newsletter subscription integration",
      "Event participation management",
      "User-friendly design for social impact",
    ],
    techs: ["Nextjs", "Tailwind", "Typescript", "Vercel"],
    image: "/project/6.png",
    link: "", // Provide the link if available
  },
  {
    name: "Codeframe",
    description:
      "Created a website for social welfare and awareness, where people can subscribe to the newsletter and participate in upcoming events.",
    feature: [
      "Newsletter subscription integration",
      "Event participation management",
      "User-friendly design for social impact",
    ],
    techs: ["Nextjs", "Tailwind", "Typescript", "Vercel"],
    image: "/project/7.png",
    link: "", // Provide the link if available
  },
];
