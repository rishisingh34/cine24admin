import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import FeedbackQuestion from "@/models/feedbackQuestion.model";

// GET all feedback questions
export async function GET() {
  await connectToDB();

  try {
    const questions = await FeedbackQuestion.find().sort({ _id: 1 });
    return NextResponse.json({ success: true, data: questions });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

// POST a new feedback question
export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const body = await req.json();
    const question = await FeedbackQuestion.create(body);
    return NextResponse.json(
      { success: true, data: question },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create question" },
      { status: 400 }
    );
  }
}
