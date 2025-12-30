import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { getUserById, updateUserProfile } from '../services/userService';
import { User } from '../models/User';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await getUserById(req.userId!);
  res.json(user);
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await updateUserProfile(req.userId!, req.body);
  res.json(user);
};

export const getInventory = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.userId!).populate('inventory');
  res.json({ inventory: user?.inventory ?? [] });
};

export const listUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await User.find().select('email nickname role rating stats');
  res.json(users);
};

export const banUser = async (req: Request, res: Response): Promise<void> => {
  res.json({ message: `User ${req.params.userId} banned (mock).` });
};
