"use client";

import NavBar from "@/components/navBar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import whatsappIcon from "./../../public/whatsappIcon.svg";
import spotifyIcon from "./../../public/spotifyIcon.svg";
import blueTick from "./../../public/tickBlueIcon.svg";
import goldTick from "./../../public/tickGoldIcon.svg";
import grayTick from "./../../public/tickGrayIcon.svg";
// import emailList from "./../../public/emails.js";
// import fs from "fs";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className={` ${isDarkMode ? "dark" : ""}`}>
      <div className=" w-full min-h-screen  dark:bg-darkColor flex gap-12 flex-col px-4">
        <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <HeroSection />
        <ProjectSection />
        <Experience />
        <SubscriptionSection />
        <Spotify />
        <Footer />
      </div>
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className=" flex gap-6 flex-col max-w-3xl w-full mx-auto mt-40">
      <div className="flex justify-between flex-col-reverse sm:flex-row  gap-6 w-full">
        <div className=" sm:text-5xl text-4xl font-semibold flex gap-2 dark:text-gray-200 ">
          Ashish <span className="text-gray-500">Bishnoi</span>
        </div>
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

      <div className=" w-full text-gray-600 dark:text-gray-200">
        Building{" "}
        <span className=" py-1.5 px-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold">
          Web3
        </span>
        ,{" "}
        <Link
          href="https://saaskart.co"
          className=" py-1.5 px-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold"
        >
          Saaskart
        </Link>{" "}
        and{" "}
        <span className=" font-semibold text-gray-800 dark:text-gray-300">
          cool projects
        </span>
        .
      </div>

      <div className=" max-w-xl text-gray-600 dark:text-gray-200 ">
        Software Engineer building SaaS products and web apps. Find me on
        twitter for tech updates and memes.
      </div>
    </div>
  );
};

const ProjectSection = () => {
  return (
    <div className=" max-w-3xl mt-4 w-full mx-auto flex flex-col gap-6">
      <div className=" sm:text-5xl text-3xl font-semibold text-gray-800 dark:text-gray-200 flex">
        Projects{" "}
      </div>
      <div className=" w-full flex gap-4 flex-wrap">
        {projectsData.map((project) => {
          return <ProjectCard project={project} />;
        })}
      </div>
    </div>
  );
};

const ProjectCard = (props: any) => {
  const { logo, name, desc, url, github, techs } = props.project;
  return (
    <div className=" sm:w-[calc(50%-0.5rem)] w-full border flex flex-col sm:gap-8 gap-6 p-4 rounded-lg">
      <div className="flex gap-4">
        {logo && (
          <Image
            src={logo}
            width={40}
            height={40}
            alt="Picture of the author"
          />
        )}
        <div className=" text-2xl text-gray-800 dark:text-gray-200 capitalize font-semibold">
          {name}
        </div>
      </div>

      <div className=" text-gray-500 dark:text-gray-400 text-sm tracking-wider ">
        {" "}
        {desc}
      </div>

      <div className=" flex gap-2 flex-wrap">
        {techs.map((tech: string) => {
          return (
            <div className=" py-1.5 px-3 bg-gray-100 dark:bg-gray-700 text-xs rounded text-gray-800 dark:text-gray-200 font-semibold">
              {tech}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const projectsData = [
  {
    logo: "",
    name: " Real-time chat X",
    desc: "Developed a real-time chat application, allowing users to join specific chat rooms with room IDs for participate live conversations.",
    url: "",
    github: "",
    techs: ["Nextjs", "Tailwind", "Typescript", "Prisma", "NextAuth", "Vercel"],
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

const Experience = () => {
  return (
    <div className=" max-w-3xl mx-auto w-full flex flex-col gap-6">
      <div className=" sm:text-5xl text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Experience
      </div>
      <div className=" flex flex-col gap-10">
        {experienceData.map((data) => {
          return <ExperienceCard data={data} />;
        })}
      </div>
    </div>
  );
};

const ExperienceCard = (props: any) => {
  const {
    logo,
    company,
    isGolden,
    companyLink,
    description,
    position,
    current,
    time,
  } = props.data;
  return (
    <div className="flex gap-3 w-full">
      <div className=" pt-1.5">
        <Image
          className=""
          src={isGolden ? goldTick : blueTick}
          width={20}
          height={20}
          alt="Logo"
        ></Image>
      </div>
      <div className=" flex flex-col gap-4 w-full">
        <div className=" flex gap-0 flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className=" text-lg font-semibold dark:text-gray-200 flex gap-2 items-center">
            <div className="">{company}</div>
            {current && (
              <span className=" text-sm text-green-400  ">current</span>
            )}
          </div>
          <div className=" text-sm text-gray-500 dark:text-gray-400">
            {position}
          </div>
        </div>
        <div className=" text-gray-500 dark:text-gray-400">{description}</div>
        {/* <div className=" text-gray-500 text-xs">{time}</div> */}
      </div>
    </div>
  );
};

const experienceData = [
  {
    logo: "",
    company: "Saaskart",
    isGolden: false,
    companyLink: "",
    description: "Building a platform for buying and selling Saas products",
    position: "Full Stack Developer",
    current: true,
    time: "June 2024 - Present",
  },
  {
    logo: "",
    company: "Carmatik",
    isGolden: false,
    companyLink: "",
    description: "Created an engaging front end for a car lending website.",
    position: "Frontend Developer",
    time: "Apr 2024 - June 2024",
  },
  {
    logo: "",
    company: "Scrapbag",
    isGolden: false,
    companyLink: "",
    description:
      "Developed a fully-fledged dashboard for analyzing energy usage data.",
    position: "Full Stack Developer",
    time: "Jan 2024 - Feb 2024",
  },
  {
    logo: "",
    company: "Microsoft",
    isGolden: true,
    companyLink: "",
    description:
      "Developed Reverse proxy system and improved the response time by 20X.",
    position: "SDE intern",
    time: "Apr 2023 - June 2021",
  },
];

const SubscriptionSection = () => {
  const [email, setEmail] = useState("");
  const [formResponse, setFormResponse] = useState("");
  const handleFormSubmition = (e: any) => {
    e.preventDefault();
    if (email) {
      setEmail("");

      const saveForm = async (email: string) => {
        fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res?.message === "Submited") {
              setFormResponse("Will Contect you shortly");
            }
          });
      };
      saveForm(email);
    }
  };

  useEffect(() => {
    if (formResponse === "Will Contect you shortly") {
      setTimeout(() => {
        setFormResponse("");
      }, 4000);
    }

    return () => {};
  }, [formResponse]);
  return (
    <div className=" border rounded-sm bg-blue-50 dark:bg-gray-800 dark:border-gray-600 mx-auto max-w-3xl w-full p-6 flex gap-4 flex-col">
      <div className="flex flex-col gap-0">
        <div className=" text-2xl sm:font-bold font-semibold dark:text-gray-200">
          Want to hire me as a freelancer? Let's discuss.
        </div>
        <div className=" text-gray-500 dark:text-gray-400">
          Drop your message and let's discuss about your project.
        </div>
      </div>

      <Link
        href={"https://wa.me/6239565852?text=Hi%20Ashish%20Bishnoi"}
        className=" flex items-center rounded bg-green-500 hover:bg-gradient-to-br hover:from-green-500 hover:to-green-600 duration-300 gap-2 flex-row-reverse sm:justify-end cursor-pointer sm:w-fit w-full p-1.5 justify-center group"
      >
        <div className=" text-white dark:text-gray-200 font-semibold">
          Text on whatsapp
        </div>
        <Image
          className=" cursor-pointer rounded flex"
          src={whatsappIcon}
          alt="whatsapp icon"
          width={28}
          height={28}
        ></Image>
      </Link>

      <form
        onSubmit={handleFormSubmition}
        className=" border-t dark:border-gray-600 py-4 flex flex-col gap-2"
      >
        <div className=" text-gray-500 dark:text-gray-200 ">
          Drop in your email ID and I will get back to you.
        </div>
        <div className="flex">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            type="email"
            className=" focus:outline-none rounded-l-sm border dark:border-gray-500 w-full bg-white dark:bg-gray-600 flex overflow-hidden p-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 "
            placeholder="bishnoi11011@gmail.com"
          ></input>
          <button
            type="submit"
            className=" p-2 rounded-r-sm bg-green-500 w-40 right-2 flex justify-center items-center text-white font-bold hover:bg-green-600 duration-300 cursor-pointer"
          >
            Submit
          </button>
        </div>
        <div className=" text-green-600 dark:text-green-400">
          {formResponse}
        </div>
      </form>
    </div>
  );
};

const Footer = () => {
  return (
    <div className=" min-h-24 w-full bg-gra">
      <div className=" mx-auto max-w-3xl w-full flex flex-col sm:flex-row gap-6 py-8 border-t dark:border-gray-600 px-2 sm:px-0">
        {footerData.map((data) => {
          return (
            <div className=" w-full flex flex-col gap-6">
              {data.map((item) => {
                return (
                  <Link
                    href={item.link}
                    target="_blank"
                    className=" hover:text-gray-900 dark:hover:text-gray-200  cursor-pointer duration-300 text-gray-600 dark:text-gray-400 w-fit transition-all"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const footerData = [
  [
    { name: "Home", link: "#" },
    { name: "Dashboard", link: "#" },
    { name: "Profile", link: "#" },
    { name: "About", link: "#" },
    { name: "Links", link: "#" },
  ],
  [
    { name: "GitHub", link: "https://github.com/ashish11011" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/ashish-bishnoi/" },
    { name: "Twitter", link: "https://x.com/bishnoi11011" },
    // { name: "Instagram", link: "https://instagram.com" },
  ],
  [
    { name: "Resources", link: "#" },
    {
      name: "Twitter DM",
      link: "https://twitter.com/messages/compose?recipient_id=bishnoi11011&text=Hi%20Ashish%20Bishnoi",
    },
    { name: "Live Demos", link: "#" },
    { name: "Design Inspiration", link: "#" },
  ],
];

const Spotify = () => {
  return (
    <div className=" max-w-3xl w-full mx-auto -mb-8 flex gap-2">
      <Image
        src={spotifyIcon}
        width={25}
        height={25}
        alt="spotify icon"
      ></Image>
      <Link
        href={"https://open.spotify.com/user/9vpkggyb99w31vy2yj0ge0g3o"}
        target="_blank"
        className=" dark:text-gray-400"
      >
        Spotify
      </Link>
    </div>
  );
};
