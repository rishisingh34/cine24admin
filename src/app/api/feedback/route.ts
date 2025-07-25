import { NextResponse } from "next/server";
import Feedback from "@/models/feedback.model";
import { connectToDB } from "@/lib/db";

export async function GET() {
  try {
    await connectToDB();
    const feedbacks = await Feedback.find().populate(
      "candidateId",
      "name email"
    );

    return NextResponse.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error("Failed to fetch feedbacks:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}