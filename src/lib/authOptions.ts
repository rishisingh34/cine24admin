import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import Admin from "@/models/admin.model";
import Otp from "@/models/otp.model";
import { sendEmailOtp } from "@/lib/mail";
import bcrypt from "bcrypt";

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
        otp: { type: "text" },
      },
      async authorize(credentials) {
        const { email, password, otp } = credentials || {};
        if (!email) throw new Error("Email is required");

        await connectToDB();

        const admin = await Admin.findOne({
          email: email.toLowerCase(),
        }).select("+password");
        if (!admin || !admin.password) throw new Error("Invalid credentials");


        if (password && !otp) {
          const isPasswordValid = await bcrypt.compare(
            password.trim(),
            admin.password
          );
          if (!isPasswordValid) throw new Error("Invalid password");

          const generatedOtp = Math.floor(
            100000 + Math.random() * 900000
          ).toString();

          await Otp.findOneAndUpdate(
            { email: email.toLowerCase() },
            { email: email.toLowerCase(), otp: generatedOtp },
            { upsert: true, new: true }
          );

          await sendEmailOtp(email.toLowerCase(), generatedOtp);

          throw new Error("OTP_SENT");
        }


        if (otp && !password) {
          const otpRecord = await Otp.findOne({ email: email.toLowerCase() });
          const isOtpValid = otpRecord?.otp === otp.trim();

          if (!isOtpValid) throw new Error("Invalid or expired OTP");

          await Otp.deleteOne({ email: email.toLowerCase() });

          return {
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: admin.role,
          };
        }

        throw new Error("Invalid login flow");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

export default authOptions;