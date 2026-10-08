import { defaultDescription, pageMetadata, siteName, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import NavBar from "@/components/navBar";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileLinks } from "@/data/profile";
import { Footer } from "@/components/footer";
import ProjectSection from "./projectSection";
import Experience from "./experienceSection";
import SkillsSection from "./skillsSection";
import { skillGroups } from "@/data/skills";
import SubscriptionSection from "./subscriptionSection";
import ResumeSection from "./resumeSectino";
import TestimonialSection from "./testimonialSection";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-static";
export const revalidate = 86400;
export const metadata = pageMetadata({ title: "Software Engineer & Full Stack Developer", description: defaultDescription, path: "/" });

export default function Home() {
  return (
    <div className="page-stack">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: siteName, url: siteUrl, jobTitle: "Full-Stack Engineer", image: `${siteUrl}/ashish-img.jpg`, sameAs: [profileLinks.github, profileLinks.linkedin, "https://x.com/bishnoi11011"], knowsAbout: skillGroups.flatMap((group) => [...group.skills]) }} />
      <NavBar />
      <main className="site-shell flex flex-col gap-20">
        <HeroSection />
        <ProjectSection />
        <SkillsSection />
        <Experience />
        <TestimonialSection />
        <SubscriptionSection />
        <ResumeSection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section aria-labelledby="intro-heading" className="flex flex-col gap-6">
      <Reveal onMount>
        <Image className="rounded-lg" src="/ashish-img.jpg" width={80} height={80} alt="Ashish Bishnoi" priority />
      </Reveal>
      <Reveal onMount delay={0.08} className="flex flex-col gap-3">
        <p className="eyebrow">Ashish Bishnoi</p>
        <h1 id="intro-heading">Full-Stack Engineer building scalable web products and backend systems.</h1>
      </Reveal>
      <Reveal onMount delay={0.16}>
        <p className="max-w-xl font-light text-muted-foreground">
          Ex-Microsoft intern with nearly 3 years of experience building production web apps,
          cloud systems, APIs, payments, and scalable backend services.
        </p>
      </Reveal>
      <Reveal onMount delay={0.24} className="flex flex-wrap items-center gap-3">
        <Button asChild className="shadow-none"><Link href="/projects">View Projects <ArrowUpRight aria-hidden="true" /></Link></Button>
        <Button asChild variant="outline" className="shadow-none"><a href={profileLinks.resume} target="_blank" rel="noreferrer" download>Download Resume <Download aria-hidden="true" /></a></Button>
        <div className="flex items-center gap-2" aria-label="Professional profiles">
          <a href={profileLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Github size={20} aria-hidden="true" /></a>
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Linkedin size={20} aria-hidden="true" /></a>
        </div>
      </Reveal>
      <Reveal onMount delay={0.32} as="section" aria-labelledby="about-heading" className="mt-2 flex flex-col gap-3 border-t pt-6">
        <h2 id="about-heading" className="text-base">About</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          I build end-to-end products with Next.js, React, Node.js, and TypeScript,
          backed by PostgreSQL, Redis, AWS, and Docker. My work spans API development,
          payments, and cloud infrastructure, with a focus on reliable backend systems,
          clean UX, performance, and dependable deployments.
        </p>
      </Reveal>
    </section>
  );
}
