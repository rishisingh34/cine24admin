import mongoose, { Schema, Document } from "mongoose";

export interface IResponse extends Document {
  quesId: Schema.Types.ObjectId;
  candidateId: Schema.Types.ObjectId;
  status: number; // enum { 0: "Not Attempted", 1: "Attempted", 2: "Marked for Review" }
  ansId?: number;
}

export interface IFeedbackQuestion extends Document {
  question: string;
  type: 'text' | 'rating';
  answer: string | number;
}

export interface IFeedback extends Document {
    candidateId: mongoose.Schema.Types.ObjectId;
    feedbacks: [{
        question: string;
        type: 'text' | 'rating';
        answer: string | number; 
    }]
}

export interface IOption {
  id: number;
  desc: string;
}

export interface IQuestion extends mongoose.Document {
    subject: string;
    question: string;
    code?: string;
    options: IOption[];
    answer: number;
}

export interface ICandidate extends mongoose.Document {
    name: string;
    studentNumber: string;
    branch: string;
    gender: string;
    email: string;
    residence: string;
    phone: string;
    password: string;
    isVerified: boolean;
}