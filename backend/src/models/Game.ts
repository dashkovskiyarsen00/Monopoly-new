import mongoose, { Schema, Document } from 'mongoose';

export interface GameDocument extends Document {
  roomId: string;
  state: Record<string, unknown>;
  updatedAt: Date;
  createdAt: Date;
}

const gameSchema = new Schema<GameDocument>(
  {
    roomId: { type: String, required: true, unique: true },
    state: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

export const Game = mongoose.model<GameDocument>('Game', gameSchema);
