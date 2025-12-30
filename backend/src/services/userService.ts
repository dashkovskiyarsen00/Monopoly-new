import { User, UserDocument } from '../models/User';
import { ApiError } from '../utils/errorHandler';
import { getRankByMmr } from '../utils/ranking';

export const getUserById = async (userId: string): Promise<UserDocument> => {
  const user = await User.findById(userId).populate('inventory');
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  return user;
};

export const updateUserProfile = async (
  userId: string,
  payload: { nickname?: string; avatarUrl?: string }
): Promise<UserDocument> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  if (payload.nickname) {
    user.nickname = payload.nickname;
  }
  if (payload.avatarUrl) {
    user.avatarUrl = payload.avatarUrl;
  }
  await user.save();
  return user;
};

export const updateRating = async (userId: string, delta: number): Promise<UserDocument> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  user.rating.mmr = Math.max(0, user.rating.mmr + delta);
  user.rating.rank = getRankByMmr(user.rating.mmr);
  await user.save();
  return user;
};

export const awardCoins = async (userId: string, amount: number): Promise<UserDocument> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  user.coins += amount;
  await user.save();
  return user;
};
