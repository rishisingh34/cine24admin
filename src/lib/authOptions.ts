import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import Admin from "@/models/admin.model";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
        role: { type: "text" },
        otp: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        const { email, password, role, otp } = credentials;

        if (!email || !password || !role) {
          throw new Error("All fields are required");
        }

        if (role !== "admin" && role !== "moderator") {
          throw new Error("Access denied");
        }

        try {
          await connectToDB();

          const user = await Admin.findOne({
            email: email.toLowerCase(),
            role,
          }).select("+password");

          if (!user || !user.password) {
            throw new Error("Invalid credentials");
          }

          const isPasswordValid = await user.comparePassword(password);
          if (!isPasswordValid) throw new Error("Invalid credentials");

          if (!otp) {
            throw new Error("OTP required");
          }

          const otpVerification = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/verify-otp`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, otp }),
            }
          );

          const data = await otpVerification.json();

          const isOtpValid = data.message === "OTP verified successfully";
          if (!isOtpValid) throw new Error("Invalid or expired OTP");

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default authOptions;