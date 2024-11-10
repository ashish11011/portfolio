import { NextRequest, NextResponse } from "next/server";
import { connect } from "./../../../dbConfig/dbConfig";
import Email from "./../../../models/emailModel";

export async function POST(request: NextRequest) {
  connect();
  const { email } = await request.json();
  try {
    console.log(email);
    const response = await Email.deleteMany({ email });
    if (response) {
      console.log("Removed");
      return NextResponse.json({ message: "Email removed" });
    }
  } catch (error) {
    console.log(error);
  }
}

import { NextRequest, NextResponse } from "next/server";
import { connect } from "./../../../dbConfig/dbConfig";
import Email from "./../../../models/emailModel";

export async function POST(request: NextRequest) {
  connect();
  const { email } = await request.json();
  try {
    console.log(email);
    const response = await Email.deleteMany({ email });
    if (response) {
      console.log("Removed");
      return NextResponse.json({ message: "Email removed" });
    }
  } catch (error) {
    console.log(error);
  }
}
