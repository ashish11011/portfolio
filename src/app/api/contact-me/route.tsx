import { connect } from "@/dbConfig/dbConfig";
import Contact from "@/models/contact";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(request: NextRequest) {
  connect();
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
      user: "bishnoi11011@gmail.com",
      pass: "qfyq ludh njzw cust",
    },
  });

  const mailOptions = {
    from: "bishnoi11011@gmail.com",
    to: email,
    subject: "Thank you for contacting me!",
    text: `Hi ${name},\n\nThank you for reaching out through my portfolio! I appreciate your interest and will get back to you as soon as possible.\n\nHere's the message you sent:\n"${message}"\n\nBest regards,\nAshish Bishnoi`,
  };

  const ownerMailOptions = {
    from: "bishnoi11011@gmail.com",
    to: "bishnoi11011@gmail.com",
    subject: "New Form Submission",
    text: `New form submission received:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    const response = new Contact({
      name,
      email,
      message,
    });

    await response.save();

    const isVerified = await transporter.verify();

    if (isVerified) {
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(ownerMailOptions);
    } else {
      console.log("Not verified");
    }

    return NextResponse.json({ message: "Submitted and email sent." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "An error occurred while processing your request.",
    });
  }
}
