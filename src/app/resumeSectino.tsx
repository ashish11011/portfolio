"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ResumeSection() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Download My Resume
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Want to know more about my experience, skills, and projects? Download
          my resume to get a detailed look at my professional background.
        </p>

        <Button
          size="lg"
          variant={"default"}
          className="rounded-xl px-8 py-6 text-lg shadow-md hover:shadow-lg transition"
          asChild
        >
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1yvW5Ji3Eo1cWJJ5ciyvOUJVeepDCXTV_/view?usp=sharing"
            download
          >
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
}
