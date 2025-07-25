import { Schema, model, Document, models } from 'mongoose';

export interface OtpDocument extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
    createdAt: Date;
}

const otpSchema = new Schema<OtpDocument>(
    {
        email: { type: String, required: true, lowercase: true, trim: true },
        otp: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        timestamps: false
    }
);

export default models.Otp || model<OtpDocument>('Otp', otpSchema);