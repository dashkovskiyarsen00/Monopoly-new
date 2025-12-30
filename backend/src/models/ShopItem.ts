import mongoose, { Schema, Document } from 'mongoose';

export interface ShopItemDocument extends Document {
  name: string;
  description: string;
  type: 'token' | 'frame' | 'effect';
  price: number;
  iconUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  createdAt: Date;
  updatedAt: Date;
}

const shopItemSchema = new Schema<ShopItemDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['token', 'frame', 'effect'], required: true },
    price: { type: Number, required: true },
    iconUrl: { type: String, required: true },
    rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'], required: true }
  },
  { timestamps: true }
);

export const ShopItem = mongoose.model<ShopItemDocument>('ShopItem', shopItemSchema);
