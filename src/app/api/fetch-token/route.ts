"use server";

import { getToken } from "next-auth/jwt";
import generateJWT from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (!token)
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        const jwt = generateJWT(
            String(token.id),
            String(token.email),
            String(token.name),
            String(token.role)
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
