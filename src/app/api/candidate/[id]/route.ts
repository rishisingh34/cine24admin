import { NextRequest, NextResponse } from "next/server";
import Candidate from "@/models/candidate.model";
import { connectToDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  await connectToDB();

  try {
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return NextResponse.json(
        { success: false, message: "Candidate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: candidate });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop();
  await connectToDB();

  try {
    const body = await req.json();
    const updatedCandidate = await Candidate.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCandidate) {
      return NextResponse.json(
        { success: false, message: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCandidate });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
