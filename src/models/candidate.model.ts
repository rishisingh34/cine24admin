import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ICandidate } from "@/types/model.interfaces";

const candidateSchema = new mongoose.Schema<ICandidate>(
  {
    name: { type: String, required: true },
    studentNumber: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    residence: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

candidateSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.Candidate ||
  mongoose.model<ICandidate>("Candidate", candidateSchema);
