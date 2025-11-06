import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "./contactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Ashish Bishnoi",
  description:
    "Let’s connect! Reach out to discuss new ideas, collaborations, or exciting projects in web development.",
  openGraph: {
    title: "Ashish Bishnoi",
    description:
      "Let’s connect! Reach out to discuss new ideas, collaborations, or exciting projects in web development.",
    url: "https://www.ashishbishnoi.com/contact-me",
    siteName: "Ashish Bishnoi",
    images: [
      {
        url: "https://ik.imagekit.io/hop/1718461831024.jpeg",
        width: 512,
        height: 512,
        alt: "Ashish Bishnoi Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Bishnoi",
    description:
      "Let’s connect! Reach out to discuss new ideas, collaborations, or exciting projects in web development.",
    images: ["https://ik.imagekit.io/hop/1718461831024.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const Page = () => {
  return (
    <div className=" px-4 flex flex-col gap-12">
      <NavBar />
      <div className="h-20"></div>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default Page;
