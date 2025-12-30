import mongoose, { Schema, Document } from 'mongoose';

export interface CaseDrop {
  name: string;
  type: 'token' | 'frame' | 'effect';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  iconUrl: string;
  weight: number;
}

export interface CaseDocument extends Document {
  name: string;
  price: number;
  drops: CaseDrop[];
  createdAt: Date;
  updatedAt: Date;
}

const caseDropSchema = new Schema<CaseDrop>({
  name: { type: String, required: true },
  type: { type: String, enum: ['token', 'frame', 'effect'], required: true },
  rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'], required: true },
  iconUrl: { type: String, required: true },
  weight: { type: Number, required: true }
});

const caseSchema = new Schema<CaseDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    drops: { type: [caseDropSchema], default: [] }
  },
  { timestamps: true }
);

export const CaseModel = mongoose.model<CaseDocument>('Case', caseSchema);
