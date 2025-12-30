import { Request, Response } from 'express';
import { registerUser, loginUser, issueToken } from '../services/authService';
import { requireFields } from '../utils/validateRequest';

export const register = async (req: Request, res: Response): Promise<void> => {
  requireFields(req.body, ['email', 'password', 'nickname']);
  const user = await registerUser(req.body);
  const token = issueToken(user._id.toString());
  res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      stats: user.stats,
      rating: user.rating,
      mastery: user.mastery,
      coins: user.coins
    }
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  requireFields(req.body, ['email', 'password']);
  const { user, token } = await loginUser(req.body);
  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      stats: user.stats,
      rating: user.rating,
      mastery: user.mastery,
      coins: user.coins
    }
  });
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  requireFields(req.body, ['userId']);
  const token = issueToken(req.body.userId);
  res.json({ token });
};

export const resetPassword = async (_req: Request, res: Response): Promise<void> => {
  res.json({
    message: 'Password reset email sent (mock).',
    resetToken: 'mock-reset-token'
  });
};
