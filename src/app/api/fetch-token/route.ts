import { auth } from "@/auth";
import generateJWT from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const jwt = generateJWT(
      String(session.user.id),
      String(session.user.email),
      String(session.user.name),
      String(session.user.role)
    );
    return NextResponse.json({ token: jwt });
  } catch (err) {
    console.error("Error generating JWT:", err);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
