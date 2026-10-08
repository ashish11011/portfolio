import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { profileLinks } from "@/data/profile";

export default function ResumeSection() {
  return (
    <Reveal as="section" className="flex flex-col items-start gap-6 border-t pt-10 sm:flex-row sm:items-center sm:justify-between" aria-labelledby="resume-heading">
      <div className="flex max-w-md flex-col gap-3">
        <h2 id="resume-heading">A little more about me</h2>
        <p className="text-sm text-muted-foreground">My experience, skills, and projects, all in one place.</p>
      </div>
      <Button variant="outline" className="shrink-0" asChild>
        <a target="_blank" rel="noreferrer" href={profileLinks.resume} download>
          Download resume <ArrowUpRight size={16} />
        </a>
      </Button>
    </Reveal>
  );
}
