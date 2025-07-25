import mongoose from "mongoose";
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
        isVerified: { type: Boolean, default: false }
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.models.Candidate || mongoose.model<ICandidate>("Candidate", candidateSchema);