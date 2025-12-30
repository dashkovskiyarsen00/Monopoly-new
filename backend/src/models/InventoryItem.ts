import mongoose, { Schema, Document } from 'mongoose';

export interface InventoryItemDocument extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  type: 'token' | 'frame' | 'effect';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  iconUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const inventorySchema = new Schema<InventoryItemDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['token', 'frame', 'effect'], required: true },
    rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'], required: true },
    iconUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export const InventoryItem = mongoose.model<InventoryItemDocument>('InventoryItem', inventorySchema);
