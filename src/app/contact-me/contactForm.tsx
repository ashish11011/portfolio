"use client";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function ContactForm({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  function handleInputChange(e: any) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const notify = () =>
    toast("🦄 Thank you for contacting me", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  async function handleFormSubmittion(e: any) {
    e.preventDefault();
    setLoading(true);
    if (formData.name && formData.email && formData.message) {
      const response = await fetch("/api/contact-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        notify();
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    }
    setLoading(false);
  }
  return (
    <Reveal as="section" aria-labelledby="contact-heading" className="w-full">
      <ToastContainer />
      <p className="eyebrow mb-3">Get in touch</p>
      <Heading id="contact-heading" className="mb-3">Let’s talk.</Heading>
      <p className="mb-8 max-w-xl text-muted-foreground">Have an idea, a project, or just want to say hello? Leave a message and let’s connect.</p>
      <form onSubmit={handleFormSubmittion} className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-sm font-medium">Name</label>
            <input id="contact-name" onChange={handleInputChange} type="text" name="name" value={formData.name} placeholder="Your name" autoComplete="name" required className="field" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
            <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" autoComplete="email" required className="field" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
          <textarea id="contact-message" placeholder="Tell me a little about your project…" name="message" value={formData.message} onChange={handleInputChange} rows={5} required className="field resize-y" />
        </div>
        <Button type="submit" disabled={loading} size="lg" className="w-fit">
          {loading && <LoaderCircle className="animate-spin" aria-hidden="true" />}
          {loading ? "Sending…" : "Send message"}
        </Button>
      </form>
    </Reveal>
  );
}

export default ContactForm;
