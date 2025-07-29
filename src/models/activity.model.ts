import mongoose from "mongoose";

export interface IActivity extends mongoose.Document {
  candidateId: mongoose.Schema.Types.ObjectId;
  preference: number;
  isPreferenceSet?: boolean;
  lastLogin: Date;
  timeSpent: number;
  logInCount: number;
  adminApprovals: number;
  isExamCompleted?: boolean;
  dismissalReason?: string;
}

const activitySchema = new mongoose.Schema<IActivity>(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Candidate",
    },
    preference: { type: Number, required: true }, //  { 1: "C", 2: "C++", 3: "Java", 4: "Python", 5: "JavaScript" }
    isPreferenceSet: { type: Boolean, default: false },
    timeSpent: { type: Number, default: 0 },
    logInCount: { type: Number, default: 0 },
    adminApprovals: { type: Number, default: 0 },
    isExamCompleted: { type: Boolean, default: false },
    dismissalReason: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", activitySchema);
