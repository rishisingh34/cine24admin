import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";
import { connectToDB } from "@/lib/db";
import Admin from "@/models/admin.model";
import Otp from "@/models/otp.model";
import { authConfig } from "@/auth.config";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    email: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
        otp: { type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const otp = credentials?.otp as string | undefined;
        if (!email) throw new CredentialsSignin("Email is required");

        await connectToDB();

        const admin = await Admin.findOne({
          email: email.toLowerCase(),
        }).select("+password");
        if (!admin || !admin.password)
          throw new CredentialsSignin("Invalid credentials");

        if (otp && !password) {
          const otpRecord = await Otp.findOne({ email: email.toLowerCase() });
          const isOtpValid =
            otpRecord?.otp === otp.trim() &&
            !!otpRecord?.expiresAt &&
            otpRecord.expiresAt > new Date();

          if (!isOtpValid)
            throw new CredentialsSignin("Invalid or expired OTP");

          await Otp.deleteOne({ email: email.toLowerCase() });

          return {
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: admin.role,
          };
        }

        throw new CredentialsSignin("Invalid login flow");
      },
    }),
  ],
});
