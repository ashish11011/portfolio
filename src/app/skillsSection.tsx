import { Reveal } from "@/components/reveal";
import { skillGroups } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <Reveal><h2 id="skills-heading" className="section-heading">Skills</h2></Reveal>
      <dl className="flex flex-col">
        {skillGroups.map(({ category, skills }) => (
          <Reveal key={category} className="grid gap-4 border-b py-6 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[160px_1fr] sm:gap-8">
            <dt className="text-sm font-medium sm:pt-1.5">{category}</dt>
            <dd>
              <ul aria-label={`${category} skills`} className="flex flex-wrap gap-2">
                {skills.map((skill) => <li key={skill} className="rounded-sm border px-3 py-1.5 font-mono text-xs text-muted-foreground">{skill}</li>)}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
