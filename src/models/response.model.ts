import { IResponse } from "@/types/model.interfaces";
import { Schema, model, models } from "mongoose";

const responseSchema = new Schema<IResponse>({
    quesId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    candidateId: { type: Schema.Types.ObjectId, ref: "Candidate", required: true },
    status: { type: Number, default: 0, enum: [0, 1, 2] }, // 0: Not Attempted, 1: Attempted, 2: Marked for Review
    ansId: { type: Number }
}, { versionKey: false, timestamps: false });

export default models.Response || model<IResponse>("Response", responseSchema);