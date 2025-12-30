import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { listShopItems, purchaseItem } from '../services/shopService';
import { listCases, openCase } from '../services/caseService';

export const getShopItems = async (_req: AuthRequest, res: Response): Promise<void> => {
  const items = await listShopItems();
  res.json(items);
};

export const buyShopItem = async (req: AuthRequest, res: Response): Promise<void> => {
  const item = await purchaseItem(req.userId!, req.params.itemId);
  res.json(item);
};

export const getCases = async (_req: AuthRequest, res: Response): Promise<void> => {
  const cases = await listCases();
  res.json(cases);
};

export const openCaseItem = async (req: AuthRequest, res: Response): Promise<void> => {
  const item = await openCase(req.userId!, req.params.caseId);
  res.json(item);
};
