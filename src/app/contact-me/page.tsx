import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "./contactForm";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Ashish Bishnoi to discuss web development projects, collaborations, and software engineering opportunities.",
  path: "/contact-me",
});

export default function Page() {
  return (
    <div className="page-stack">
      <NavBar />
      <main className="site-shell"><ContactForm /></main>
      <Footer />
    </div>
  );
}
