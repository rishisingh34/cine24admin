import mongoose from 'mongoose';
import { IFeedback } from '@/types/model.interfaces';

const feedbackSchema = new mongoose.Schema<IFeedback>({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    feedbacks: [{
        _id: false, 
        question: { type: String, required: true },
        type: { type: String, enum: ['text', 'rating'], required: true },
        answer: { type: mongoose.Schema.Types.Mixed, required: true }
    }]
}, { versionKey: false, timestamps: true });

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', feedbackSchema);

