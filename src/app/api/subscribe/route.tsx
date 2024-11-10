import { NextResponse, NextRequest } from "next/server";
import { connect } from "./../../../dbConfig/dbConfig";
import Email from "../../../models/emailModel";

export async function POST(request: NextRequest) {
  connect();
  const { email } = await request.json();
  try {
    const response = new Email({
      email,
    });

    await response.save();
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Submited" });
} // TODO: Implement POST

import { NextResponse, NextRequest } from "next/server";
import { connect } from "./../../../dbConfig/dbConfig";
import Email from "../../../models/emailModel";

export async function POST(request: NextRequest) {
  connect();
  const { email } = await request.json();
  try {
    const response = new Email({
      email,
    });

    await response.save();
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Submited" });
} // TODO: Implement POST
