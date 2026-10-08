"use client";

import { Reveal } from "@/components/reveal";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscriptionSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formResponse, setFormResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !message.trim() || loading) return;
    setLoading(true);
    setFormResponse("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), message: message.trim() }),
      });
      const data = await response.json();
      setFormResponse(data.message);
      if (response.ok) { setEmail(""); setMessage(""); }
    } catch {
      setFormResponse("Couldn’t send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Reveal as="section" className="surface flex flex-col gap-6" aria-labelledby="connect-heading">
      <div className="flex flex-col gap-3">
        <p className="eyebrow">Let’s build something</p>
        <h2 id="connect-heading">Have a project in mind?</h2>
        <p className="text-sm text-muted-foreground">I’d love to hear what you’re working on. Get in touch to discuss your next project.</p>
        <Link href="https://wa.me/6239565852?text=Hi%20Ashish%20Bishnoi" className="text-link mt-1.5 w-fit">Message me on WhatsApp <ArrowUpRight size={16} /></Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-t pt-6">
        <p className="text-sm text-muted-foreground">Or send me a message here.</p>
        <label htmlFor="subscriber-email" className="text-sm font-medium">Email</label>
        <Input id="subscriber-email" onChange={(event) => setEmail(event.target.value)} value={email} name="email" type="email" autoComplete="email" required maxLength={254} disabled={loading} className="h-10 min-w-0 bg-white" placeholder="you@example.com" />
        <label htmlFor="inquiry-message" className="text-sm font-medium">Message</label>
        <textarea id="inquiry-message" onChange={(event) => setMessage(event.target.value)} value={message} name="message" rows={4} required maxLength={5000} disabled={loading} className="field resize-y" placeholder="Tell me about your project or what you have in mind…" />
        <Button type="submit" disabled={loading || !email.trim() || !message.trim()} size="lg" className="w-fit shadow-none">{loading ? "Sending…" : "Send message"}</Button>
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{formResponse}</p>
      </form>
    </Reveal>
  );
}
