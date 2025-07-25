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
  { versionKey: false, timestamps: true }
);

candidateSchema.pre("save", async function (next) {
  const candidate = this as ICandidate;

  if (!candidate.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    candidate.password = await bcrypt.hash(candidate.password, salt);
    next();
  } catch (err) {
    if (err instanceof mongoose.Error) {
      next(err);
    } else {
      next(new mongoose.Error("Unknown error in password hashing"));
    }
  }
});

export default mongoose.models.Candidate ||
  mongoose.model<ICandidate>("Candidate", candidateSchema);
