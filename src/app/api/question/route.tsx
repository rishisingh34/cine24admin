import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/question.model";
import { connectToDB } from "@/lib/db";

// GET all questions
export async function GET() {
  try {
    await connectToDB();
    const questions = await Question.find();
    return NextResponse.json(
      { success: true, data: questions },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

// POST a new question
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();

    const newQuestion = {
      subject: body.subject,
      question: body.question,
      options: body.options,
      answer: body.answer,
      code: body.code || "",
      codeLang: body.codeLang || "",
    };

    const created = await Question.create(newQuestion);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: message },
      { status: 400 }
    );
  }
}
