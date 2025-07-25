// lib/mail.ts
import nodemailer from "nodemailer";

export async function sendEmailOtp(email: string, otp: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cine 24" <${process.env.EMAIL}>`,
      to: email,
      subject: "🔐 Your Cine 24 OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #007bff;">🔐 Cine 24 OTP Verification</h2>
          <p>Hello,</p>
          <p>Your one-time password (OTP) for login is:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 10px 0; color: #007bff;">
            ${otp}
          </div>
          <p>This OTP will expire in <b>10 minutes</b>.</p>
          <p style="color: #888;">If you did not request this, please ignore this email.</p>
          <hr style="margin-top: 20px;" />
          <p>Regards,<br><strong>CINE 24 Team</strong></p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}
