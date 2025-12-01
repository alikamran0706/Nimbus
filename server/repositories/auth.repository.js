import UserModel from "../models/user.model.js"
import nodemailer from "nodemailer"
import { connectDB } from "../db/connect.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  // secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

export const AuthRepository = {
  async findByEmail(email) {
    await connectDB();
    return UserModel.findOne({ email })
  },
  async findById(id) {
    console.log(id,'tesss')
    await connectDB();
    return UserModel.findById(id)
  },

  async create(data) {
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    await connectDB();
    const user = await UserModel.create({
      ...data,
      verificationCode,
      verificationCodeExpires,
      isVerified: false,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    });

    console.log('SUCESSFULLY SENT')

    return user;
  },

  async resend(email) {
    await connectDB();
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with new code and expiration
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = verificationCodeExpires;
    await user.save();

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your Verification Code",
        text: `Your new verification code is: ${verificationCode}`,
      });

      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send verification email");
    }
  },

  async verifyByEmail(email, code) {
    await connectDB();
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.verificationCode !== code) {
      throw new Error("Invalid verification code");
    }

    if (user.verificationCodeExpires < new Date()) {
      throw new Error("Verification code expired");
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;

    await user.save();

    return user;
  }
}
