"use client";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProjectSection = () => {
  const [showProjectCount, setShowProjectCount] = useState(4);
  const [showMoreText, setShowMoreText] = useState("View More");
  useEffect(() => {
    if (showProjectCount === projectsData.length) {
      setShowMoreText("View Less");
    } else {
      setShowMoreText("View More");
    }
  });
  return (
    <div
      id="projects"
      className=" max-w-3xl mt-4 w-full mx-auto flex flex-col gap-6"
    >
      <div className=" sm:text-5xl text-3xl font-semibold text-gray-800 dark:text-gray-200 flex">
        Projects{" "}
      </div>
      <div className=" w-full flex gap-4 flex-wrap">
        {projectsData.map((project: any, index: number) => {
          if (index >= showProjectCount) {
            return;
          }
          return <ProjectCard project={project} />;
        })}
      </div>
      <Link
        href={"/projects"}
        className=" w-fit px-4 cursor-pointer mx-auto bg-white dark:bg-neutral-700 dark:text-white dark:border-gray-500 text-gray-600 hover:text-gray-900 rounded select-none hover:bg-gray-100 duration-200 py-2 border"
      >
        View More
      </Link>
    </div>
  );
};
export default ProjectSection;

const ProjectCard = (props: any) => {
  const { logo, name, desc, techs, github, url } = props.project;

  return (
    <Link
      href={url}
      target="_blank"
      className="sm:w-[calc(50%-0.5rem)] hover:shadow-lg dark:bg-emerald-900/20 dark:border-gray-600 cursor-pointer duration-200 w-full border flex flex-col sm:gap-8 gap-6 p-4 rounded-lg"
    >
      <div className="flex gap-4 justify-between">
        <div className=" flex gap-4 items-center">
          {logo && (
            <Image
              className=" rounded"
              src={logo}
              width={40}
              height={40}
              alt="Project logo"
            />
          )}
          <div className="text-2xl line-clamp-2 text-gray-800 dark:text-gray-200 capitalize font-semibold">
            {name}
          </div>
        </div>
        {github && (
          <Link href={github} target="_blank">
            {" "}
            <Github
              color="#888"
              className=" hover:border-gray-400 hover:dark:border-gray-400 dark:border-gray-500 duration-200 hover:scale-105 p-1 border rounded-full size-8 shrink-0"
            />
          </Link>
        )}
      </div>

      <div className="text-gray-500 dark:text-gray-400 text-sm tracking-wider">
        {desc}
      </div>

      <div className="flex gap-2 flex-wrap">
        {techs.map((tech: string, index: number) => {
          return (
            <div
              key={index}
              className="py-1.5 px-3 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-800 dark:text-gray-200 font-semibold"
            >
              {tech}
            </div>
          );
        })}
      </div>
    </Link>
  );
};

const projectsData = [
  {
    logo: "https://ik.imagekit.io/hop/logo-nobg.png",
    name: "Haus of Privae",
    desc: "Developed a luxury e-commerce platform for Haus of Privae, enabling seamless shopping and custom garment experiences with modern, elegant UI.",
    url: "https://www.hausofprivae.com/",
    github: "https://github.com/ashish11011/hous-of-privae",
    techs: [
      "Nextjs",
      "Tailwind",
      "Typescript",
      "Vercel",
      "imagekit",
      "postgresql",
      "Next Auth",
    ],
  },
  {
    logo: "https://s3.ap-south-1.amazonaws.com/cozzy.corner/cozzy-corner-logo-dark.png",
    name: "Cozzy Corner",
    desc: "Cozzy Corner is your go-to spot for high-quality anime action figures. Discover a curated collection that brings your favorite characters to life!",
    url: "https://cozzycorner.in",
    github: "https://github.com/ashish11011/anime",
    techs: ["Nextjs", "Tailwind", "Typescript", "MongoDB", "AWS", "Vercel"],
  },
  {
    logo: "https://s3.ap-south-1.amazonaws.com/chal.chitrakaar/logo+dark.PNG",
    name: "Cahl Chitrakaar",
    desc: "Chal Chitrakaar is a portfolio website for a photographer showcasing expertise in wedding shoots, corporate photography, and a diverse range of professional photography services.",
    url: "https://www.chalchitrakaar.in/",
    github: "https://github.com/ashish11011/anime",
    techs: ["Nextjs", "Tailwind", "Typescript", "MongoDB", "AWS", "Vercel"],
  },

  {
    logo: "https://www.roamifyplanners.in/logo-black.png",
    name: "Roamify Planners",
    desc: "Developed a real-time chat application, allowing users to join specific chat rooms with room IDs for participate live conversations.",
    url: "https://www.roamifyplanners.in/",
    github: "https://github.com/ashish11011/roamfy",
    techs: ["Nextjs", "Tailwind", "Typescript", "Prisma", "Vercel"],
  },
  {
    logo: "",
    name: " Entry Management System with QR Integration",
    desc: "Created a web app to prevent fake event entries. Features include participant data collection, QR code generation, and automated email delivery",
    url: "",
    github: "",
    techs: ["Nextjs", "Tailwind", "Typescript", "Prisma", "NextAuth", "Vercel"],
  },
  {
    logo: "",
    name: " Abhyudaya",
    desc: "Created a website for social welfare and awareness, where people can subscribe to the newsletter and participate in upcoming events.",
    url: "",
    github: "",
    techs: ["HTML", "Tailwind", "JavaScript", "MongoDB", "JWT", "Vercel"],
  },
];
