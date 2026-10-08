import { Reveal } from "@/components/reveal";
import Link from "next/link";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading">
      <Reveal><h2 id="experience-heading" className="section-heading">Experience</h2></Reveal>
      <div className="flex flex-col">
        {experienceData.map((item) => (
          <Reveal as="article" key={item.company} className="grid gap-4 border-b py-6 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[160px_1fr] sm:gap-8">
            <p className="eyebrow pt-1">{item.time}</p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3>{item.companyLink ? <Link href={item.companyLink} target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">{item.company}</Link> : item.company}</h3>
                {item.current && <span className="rounded-sm border px-2 py-1.5 font-mono text-xs text-muted-foreground">Current</span>}
              </div>
              <p className="text-sm">{item.position}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

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
