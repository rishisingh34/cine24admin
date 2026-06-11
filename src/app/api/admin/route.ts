import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/admin.model";
import { auth } from "@/auth";
import bcrypt from "bcrypt";

export async function GET(){
    await connectToDB();
    
    const session = await auth();
    
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const adminId = session?.user?.id;
    
    try {
        const admin = await Admin.findById(adminId).select("-password");
    
        if (!admin) {
        return NextResponse.json({ message: "Admin not found" }, { status: 404 });
        }
    
        return NextResponse.json(admin);
    } catch (error) {
        console.error("Error fetching admin:", error);
        return NextResponse.json(
        { message: "Server error", error },
        { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
  await connectToDB();

  const session = await auth();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const adminId = session?.user?.id;

  try {
    const body = await req.json();

    const { name, email, password, role } = body;

    const modifiedPassword = bcrypt.hashSync(password, 10);

    const updateData: Partial<{
      name: string;
      email: string;
      password: string;
      role: string;
    }> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = modifiedPassword;
    if (role) updateData.role = role;

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAdmin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
