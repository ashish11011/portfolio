"use client";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
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
    <div className=" max-w-3xl mx-auto w-full flex flex-col gap-6">
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
    <div className=" px-4 md:px-0 max-w-3xl mx-auto w-full flex flex-col gap-6 ">
      <p className=" text-3xl font-bold text-gray-800">Featured Projects</p>
      <div className=" flex flex-col gap-12">
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
    <div className=" flex flex-col md:flex-row gap-8">
      <div className=" w-full md:w-1/2 h-auto rounded-lg shadow-lg overflow-hidden ">
        <img
          className=" w-full h-auto object-cover"
          src="https://manuarora.in/freelance/moonbeam.png"
          alt=""
        />
      </div>
      <div className=" flex flex-col gap-3 w-full md:w-1/2">
        <p className=" text-3xl font-bold text-gray-800">{name}</p>
        <div className=" flex flex-col w-full gap-2">
          <div className=" text-gray-600">{description}</div>
          <div className=" text-gray-600">
            Blogs, Twitter Threads, Essays and much more.
          </div>
        </div>
        <div className=" flex flex-col gap-1 mt-2">
          <div className=" font-semibold text-gray-800 ">Tect Stack</div>
          <div className=" flex flex-wrap gap-2 gap-y-0">
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
    image: "https://manuarora.in/freelance/moonbeam.png",
    link: "https://cozzycorner.in",
  },
  {
    name: "Solana Wallet",
    description:
      "Build flux wallet where a user can add and create their Solana balance.",
    feature: [
      "Create and manage Solana wallet balances",
      "Secure transaction features",
      "Easy to use UI for wallet management",
    ],
    techs: ["Nextjs", "Tailwind", "Typescript", "Alchemy", "Vercel"],
    image: "https://manuarora.in/freelance/moonbeam.png",
    link: "https://solana-wallet-sandy-tau.vercel.app/",
  },
  {
    name: "Real-time chat X",
    description:
      "Developed a real-time chat application, allowing users to join specific chat rooms with room IDs for live conversations.",
    feature: [
      "Real-time chat functionality",
      "Custom chat room creation with unique room IDs",
      "Supports multiple concurrent users in a room",
    ],
    techs: ["Nextjs", "Tailwind", "Typescript", "Prisma", "NextAuth", "Vercel"],
    image: "https://manuarora.in/freelance/moonbeam.png",
    link: "", // Provide the link if available
  },
  {
    name: "Entry Management System with QR Integration",
    description:
      "Created a web app to prevent fake event entries. Features include participant data collection, QR code generation, and automated email delivery.",
    feature: [
      "QR code generation for event entry",
      "Real-time participant tracking",
      "Automated email delivery for confirmations",
    ],
    techs: ["Nextjs", "Tailwind", "Typescript", "Prisma", "NextAuth", "Vercel"],
    image: "https://manuarora.in/freelance/moonbeam.png",
    link: "", // Provide the link if available
  },
  {
    name: "Abhyudaya",
    description:
      "Created a website for social welfare and awareness, where people can subscribe to the newsletter and participate in upcoming events.",
    feature: [
      "Newsletter subscription integration",
      "Event participation management",
      "User-friendly design for social impact",
    ],
    techs: ["HTML", "Tailwind", "JavaScript", "MongoDB", "JWT", "Vercel"],
    image: "https://manuarora.in/freelance/moonbeam.png",
    link: "", // Provide the link if available
  },
];
