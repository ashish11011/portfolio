import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/dbConfig/dbConfig";
import { blogForm } from "../../../../db/schema";

export async function POST(request: NextRequest) {
  let input: unknown;
  try { input = await request.json(); }
  catch { return NextResponse.json({ message: "Please submit a valid email and message." }, { status: 400 }); }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return NextResponse.json({ message: "Please submit a valid email and message." }, { status: 400 });
  }
  const data = input as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (data.name !== undefined && (typeof data.name !== "string" || !name || name.length > 200)) {
    return NextResponse.json({ message: "Please enter a name of up to 200 characters." }, { status: 400 });
  }
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ message: "Please enter a message of up to 5,000 characters." }, { status: 400 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ message: "Messages are unavailable right now. Please use the WhatsApp link above." }, { status: 503 });
  }
  try {
    // Use the existing inquiry table; the email and message are stored together.
    await db.insert(blogForm).values({ email, message, ...(name ? { name } : {}) });
  } catch {
    return NextResponse.json({ message: "Couldn’t save your message. Please try again." }, { status: 500 });
  }
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  return NextResponse.json({ message: "Thanks! Your message has been received." });
}
