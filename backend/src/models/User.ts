import mongoose, { Schema, Document } from 'mongoose';

export interface UserStats {
  gamesPlayed: number;
  wins: number;
  winRate: number;
  timePlayed: number;
  maxCapital: number;
}

export interface UserRating {
  mmr: number;
  rank: string;
}

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
  nickname: string;
  avatarUrl: string;
  stats: UserStats;
  rating: UserRating;
  mastery: number;
  coins: number;
  inventory: mongoose.Types.ObjectId[];
  activeCosmetics: {
    tokenSkin?: string;
    avatarFrame?: string;
    diceEffect?: string;
  };
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const userStatsSchema = new Schema<UserStats>({
  gamesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  winRate: { type: Number, default: 0 },
  timePlayed: { type: Number, default: 0 },
  maxCapital: { type: Number, default: 0 }
});

const userRatingSchema = new Schema<UserRating>({
  mmr: { type: Number, default: 1000 },
  rank: { type: String, default: 'Bronze' }
});

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    nickname: { type: String, required: true },
    avatarUrl: { type: String, default: 'https://i.pravatar.cc/150?img=3' },
    stats: { type: userStatsSchema, default: () => ({}) },
    rating: { type: userRatingSchema, default: () => ({}) },
    mastery: { type: Number, default: 1 },
    coins: { type: Number, default: 1000 },
    inventory: [{ type: Schema.Types.ObjectId, ref: 'InventoryItem' }],
    activeCosmetics: {
      tokenSkin: { type: String },
      avatarFrame: { type: String },
      diceEffect: { type: String }
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>('User', userSchema);
