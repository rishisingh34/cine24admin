import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Admin from "@/models/admin.model";
import Otp from "@/models/otp.model";
import { sendEmailOtp } from "@/lib/mail";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!admin || !admin.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      admin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const generatedOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        email: email.toLowerCase(),
        otp: generatedOtp,
        expiresAt,
      },
      { upsert: true, returnDocument: "after" }
    );

    await sendEmailOtp(email.toLowerCase(), generatedOtp);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json(
      { message: "Failed to send OTP email" },
      { status: 500 }
    );
  }
}
