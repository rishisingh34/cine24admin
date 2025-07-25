import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/question.model";
import { connectToDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Question ID is required" },
        { status: 400 }
      );
    }

    await connectToDB();
    const body = await req.json();

    const updatedQuestion = {
      subject: body.subject,
      question: body.question,
      options: body.options,
      answer: body.answer,
      code: body.code || "",
      codeLang: body.codeLang || "",
    };

    const question = await Question.findByIdAndUpdate(id, updatedQuestion, {
      new: true,
    });

    if (!question) {
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: question },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: message },
      { status: 400 }
    );
  }
}
