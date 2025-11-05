"use client";

import NavBar from "@/components/navBar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import whatsappIcon from "./../../public/whatsappIcon.svg";
import blueTick from "./../../public/tickBlueIcon.svg";
import goldTick from "./../../public/tickGoldIcon.svg";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Footer } from "@/components/footer";
import { useRouter } from "next/navigation";

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

        <Footer />
      </div>
    </div>
  );
}

const HeroSection = () => {
  return (
    <div className=" flex gap-6 flex-col max-w-3xl w-full mx-auto mt-40">
      <div className="flex justify-between flex-col-reverse sm:flex-row  gap-6 w-full">
        <p className="  pt-2 sm:text-4xl text-4xl text-gray-500 font-semibold gap-2 dark:text-gray-200 ">
          👋 Hi, I’m <br className=" block sm:hidden" />
          <span className="text-black">Ashish Bishnoi</span>
        </p>
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

      <div className=" w-full text-gray-600 text-xl max-w-2xl dark:text-gray-200">
        Software Engineer & Full Stack Developer - building modern{" "}
        <span className=" font-semibold">
          SAAS products, Scalable Web Apps Building
        </span>
        {/* <span className=" py-1.5 px-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold">
          Web3
        </span>
        ,{" "}
        <Link
          href="https://cozzycorner.in"
          target="_blank"
          className=" py-1.5 px-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-semibold"
        >
          Cozzy Corner
        </Link>{" "}
        and{" "}
        <span className=" font-semibold text-gray-800 dark:text-gray-300">
          cool projects
        </span>
        . */}
      </div>

      <div className=" max-w-xl text-gray-600 dark:text-gray-200 ">
        {/* Software Engineer building SaaS products and web apps. Find me on
        twitter for tech updates and memes. */}
        Creating fast, scalable apps with Next.js, TypeScript, and AWS - always
        exploring better deployments.
      </div>
    </div>
  );
};

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
const ProjectCard = (props: any) => {
  const { logo, name, desc, techs, github, url } = props.project;
  const router = useRouter();
  function handleProjectClick(url: string) {
    router.push(url);
  }
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

const Experience = () => {
  return (
    <div
      id="experience"
      className="max-w-3xl mx-auto w-full flex flex-col gap-6"
    >
      <div className="sm:text-5xl text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Experience
      </div>
      <div className="flex flex-col gap-10">
        {experienceData.map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.7, scaleX: 0.9 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className=""
          >
            <ExperienceCard data={data} />
          </motion.div>
        ))}
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
    <motion.div className="flex gap-3 w-full">
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
            <Link target="_blank" href={companyLink}>
              {company}
            </Link>
            {current && (
              <span className=" text-sm text-green-400  ">current</span>
            )}
          </div>
          <div className=" text-sm text-gray-500 dark:text-gray-400">
            {position}
          </div>
        </div>
        <div className=" font-semibold text-xs">{time}</div>
        <div className=" text-gray-500 dark:text-gray-400">{description}</div>
      </div>
    </motion.div>
  );
};

const experienceData = [
  {
    logo: "",
    company: "AV Technosys",
    isGolden: false,
    companyLink: "https://avtechnosys.com",
    description:
      "Developing scalable SaaS products and modern web applications using Next.js and Node.js, with a focus on performance, clean architecture, and efficient deployment workflows.",
    position: "Full Stack Developer",
    current: true,
    time: "Jan 2025 – Present",
  },
  {
    logo: "",
    company: "Saaskart",
    isGolden: false,
    companyLink: "https://saaskart.in",
    description:
      "Built and optimized a SaaS marketplace platform for buying and selling digital products. Implemented onboarding dashboards, ticketing system, and AWS S3-based file management with SEO and analytics integration.",
    position: "Full Stack Developer",
    current: false,
    time: "Feb 2024 – Nov 2024",
  },
  {
    logo: "",
    company: "Carmatik",
    isGolden: false,
    companyLink: "",
    description:
      "Developed an engaging, high-performance front end for a car lending platform, ensuring responsive design and smooth user experience across devices.",
    position: "Frontend Developer",
    current: false,
    time: "Dec 2024 – Feb 2024",
  },
  {
    logo: "",
    company: "Scrapbag",
    isGolden: false,
    companyLink: "",
    description:
      "Built a full-featured analytics dashboard to visualize and manage energy usage data with secure authentication and modern UI components.",
    position: "Full Stack Developer",
    current: false,
    time: "Nov 2024 – Dec 2024",
  },
  {
    logo: "",
    company: "Microsoft",
    isGolden: true,
    companyLink: "",
    description:
      "Implemented a YARP reverse proxy system that reduced latency by 50% and improved request throughput by 45%. Conducted performance testing to enhance system reliability.",
    position: "Software Engineer Intern",
    current: false,
    time: "Apr 2023 – Jun 2023",
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
