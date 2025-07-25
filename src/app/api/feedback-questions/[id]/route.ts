import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import FeedbackQuestion from "@/models/feedbackQuestion.model";

export async function PUT(req: NextRequest) {
  await connectToDB();

  const id = req.nextUrl.pathname.split("/").pop();

  try {
    const body = await req.json();
    const updated = await FeedbackQuestion.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update question" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDB();

  const id = req.nextUrl.pathname.split("/").pop();

  try {
    const deleted = await FeedbackQuestion.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete question" },
      { status: 400 }
    );
  }
}
