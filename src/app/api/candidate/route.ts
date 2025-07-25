import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Candidate from "@/models/candidate.model";
import { ICandidate } from "@/types/model.interfaces";
import { FilterQuery } from "mongoose";

export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const body = await req.json();
    const candidate = await Candidate.create(body);
    return NextResponse.json(
      { success: true, data: candidate },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectToDB();

  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const branch = searchParams.get("branch");
    const gender = searchParams.get("gender");
    const residence = searchParams.get("residence");

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const query: FilterQuery<ICandidate> = {};

    if (search) {
      const regex = { $regex: search, $options: "i" };
      query.$or = [
        { name: regex },
        { email: regex },
        { studentNumber: regex },
        { phone: regex },
      ];
    }

    if (branch) query.branch = branch;
    if (gender) query.gender = gender;
    if (residence) query.residence = residence;

    const [candidates, total] = await Promise.all([
      Candidate.find(query).skip(skip).limit(limit),
      Candidate.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: candidates,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

