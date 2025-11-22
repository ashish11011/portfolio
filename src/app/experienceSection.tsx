"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import blueTick from "./../../public/tickBlueIcon.svg";
import goldTick from "./../../public/tickGoldIcon.svg";
import Link from "next/link";

const Experience = () => {
  return (
    <div
      id="experience"
      className="max-w-3xl mx-auto w-full flex flex-col gap-6"
    >
      <p className="sm:text-5xl text-3xl font-semibold text-gray-800 dark:text-gray-200">
        Experience
      </p>
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

export default Experience;

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
          <p className=" text-sm text-gray-500 dark:text-gray-400">
            {position}
          </p>
        </div>
        <h3 className=" font-semibold text-xs">{time}</h3>
        <p className=" text-gray-500 dark:text-gray-400">{description}</p>
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
      "Developing scalable, web applications using Next.js and Node.js, with a focus on performance, clean architecture, and efficient deployment workflows.",
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
