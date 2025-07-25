import mongoose from 'mongoose';
import { IFeedbackQuestion } from '@/types/model.interfaces';

const feedbackQuestionSchema = new mongoose.Schema<IFeedbackQuestion>({
  question: { type: String, required: true },
  type: { type: String, enum: ['text', 'rating'], required: true },
}, { versionKey: false, timestamps: false });

export default mongoose.models.FeedbackQuestion || mongoose.model<IFeedbackQuestion>('FeedbackQuestion', feedbackQuestionSchema);