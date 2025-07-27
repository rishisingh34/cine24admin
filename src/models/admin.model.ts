import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role?: string;
}

const AdminSchema = new Schema<IAdmin>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'viewer'], default: 'viewer' },
    },
    {
        timestamps: true,
    }
);

AdminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    if (err instanceof mongoose.Error) {
      next(err);
    } else {
      next(new mongoose.Error("Unknown error in password hashing"));
    }
  }
});

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);