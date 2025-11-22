import { db } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { subscribe } from "../../../../db/schema";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  try {
    await db.insert(subscribe).values({ email });
    return NextResponse.json({ message: "Form submited successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Error form submition, please try again",
    });
  }
} // TODO: Implement POST
