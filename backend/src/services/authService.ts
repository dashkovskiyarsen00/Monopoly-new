import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { User, UserDocument } from '../models/User';
import { ApiError } from '../utils/errorHandler';

export const registerUser = async ({
  email,
  password,
  nickname
}: {
  email: string;
  password: string;
  nickname: string;
}): Promise<UserDocument> => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError('Email already registered', 400);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash, nickname });
  return user;
};

export const loginUser = async ({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<{ user: UserDocument; token: string }> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new ApiError('Invalid credentials', 401);
  }
  const token = jwt.sign({ userId: user._id.toString() }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
  return { user, token };
};

export const issueToken = (userId: string): string =>
  jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
