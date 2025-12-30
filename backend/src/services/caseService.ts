import { CaseModel } from '../models/Case';
import { InventoryItem } from '../models/InventoryItem';
import { User } from '../models/User';
import { ApiError } from '../utils/errorHandler';

export const listCases = async () => CaseModel.find();

const pickDrop = (drops: { weight: number }[]) => {
  const total = drops.reduce((sum, drop) => sum + drop.weight, 0);
  let roll = Math.random() * total;
  return drops.find((drop) => {
    roll -= drop.weight;
    return roll <= 0;
  });
};

export const openCase = async (userId: string, caseId: string) => {
  const caseData = await CaseModel.findById(caseId);
  if (!caseData) {
    throw new ApiError('Case not found', 404);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  if (user.coins < caseData.price) {
    throw new ApiError('Not enough coins', 400);
  }
  const drop = pickDrop(caseData.drops);
  if (!drop) {
    throw new ApiError('Case has no drops', 400);
  }
  user.coins -= caseData.price;
  const inventoryItem = await InventoryItem.create({
    user: user._id,
    name: drop.name,
    type: drop.type,
    rarity: drop.rarity,
    iconUrl: drop.iconUrl
  });
  user.inventory.push(inventoryItem._id);
  await user.save();
  return inventoryItem;
};
