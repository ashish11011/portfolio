import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "lucide-react";

const testimonials = [
  {
    name: "Vaishnavi Dhameja",
    position: "Creative Director",
    company: "Haus of Privae",
    website: "https://www.hausofprivae.com/",
    message:
      "Ashish helped us improve our online presence with a smooth and modern shopping experience. The website feels premium, and perfectly matches our brand aesthetic. Working with him was seamless and professional.",
  },
  {
    name: "Rishab Batra",
    position: "Travel Operations Manager",
    company: "Roamify Planners",
    website: "https://www.roamifyplanners.in/",
    message:
      "Ashish developed our tours platform and built a great UI that makes it easier for travelers to explore packages and submit inquiries. Great communication and timely delivery throughout the project.",
  },
  {
    name: "Sachin Choudhary",
    position: "Event Coordinator",
    company: "SBN Infra",
    website: "https://www.sbninfra.in/",
    message:
      "Ashish helped us present our projects and company details in a clear and professional way. The website reflects the quality of our work and makes it easy for clients to understand what we do.",
  },
  {
    name: "Hitesh Berwal",
    position: "Managing Director",
    company: "JB Supreme",
    website: "https://www.superaxlecompany.com/",
    message:
      "Ashish translated our engineering and manufacturing story into a clear online experience. The website showcases our legacy, quality processes, and solutions in a refined, professional way. It was great working with him from start to finish.",
  },

  {
    name: "Ajay Puri",
    position: "Founder",
    company: "Cozzy Corner",
    website: "https://cozzycorner.in",
    message:
      "Ashish built our entire e-commerce experience from scratch. The UI is clean, fast, and perfectly tailored for showcasing anime figures. Our sales increased after the site went live.",
  },
];

export default function TestimonialSection() {
  return (
    <section aria-labelledby="testimonials-heading">
      <Reveal>
      <h2 id="testimonials-heading" className="section-heading mb-3">Kind words</h2>
      <p className="mb-6 text-sm text-muted-foreground">From the people I’ve worked with.</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {testimonials.map((item, index) => (
          <Reveal as="figure" key={item.name} delay={(index % 2) * 0.08} className="surface motion-card flex flex-col gap-6">
            <blockquote className="text-sm text-muted-foreground">“{item.message}”</blockquote>
            <figcaption className="mt-auto">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{item.position}</p>
              <a href={item.website} className="mt-2 inline-flex items-center gap-1.5 text-xs hover:underline underline-offset-4" target="_blank" rel="noreferrer">
                {item.company}<ArrowUpRight size={12} />
              </a>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
