"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
    <section className="w-full py-24 bg-gray-50/35">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className=" mb-16"
        >
          <h2 className=" sm:text-5xl mb-1 text-3xl font-semibold text-gray-800">
            What People Say
          </h2>

          <p className="text-gray-600 text-lg">
            A few kind words from the people I’ve worked with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl shadow-sm hover:shadow-md transition bg-white border">
                <CardContent className="p-6">
                  <Quote className="h-6 w-6 text-gray-400 mb-4" />

                  <p className="text-gray-700 mb-6">{item.message}</p>

                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.position} @{" "}
                      <a
                        href={item.website}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                      >
                        {item.company}
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
