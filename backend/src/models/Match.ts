import mongoose, { Schema, Document } from 'mongoose';

export interface MatchPlayer {
  user: mongoose.Types.ObjectId;
  nickname: string;
  placement: number;
  endingBalance: number;
}

export interface MatchDocument extends Document {
  roomId: string;
  mode: 'casual' | 'fast' | 'ranked';
  startedAt: Date;
  endedAt: Date;
  durationSeconds: number;
  players: MatchPlayer[];
}

const matchPlayerSchema = new Schema<MatchPlayer>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nickname: { type: String, required: true },
  placement: { type: Number, required: true },
  endingBalance: { type: Number, required: true }
});

const matchSchema = new Schema<MatchDocument>(
  {
    roomId: { type: String, required: true },
    mode: { type: String, enum: ['casual', 'fast', 'ranked'], required: true },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, required: true },
    durationSeconds: { type: Number, required: true },
    players: { type: [matchPlayerSchema], default: [] }
  },
  { timestamps: true }
);

export const Match = mongoose.model<MatchDocument>('Match', matchSchema);
