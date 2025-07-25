import mongoose from "mongoose";
import { IQuestion } from "@/types/model.interfaces";

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    subject: { type: String, required: true },
    question: { type: String, required: true },
    options: {
      type: [
        {
          _id: false,
          id: { type: Number, required: true },
          desc: { type: String, required: true },
        },
      ],
      required: true,
    },
    answer: { type: Number, required: true },
    code: { type: String, default: "" },
    codeLang: { type: String},
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", questionSchema);
