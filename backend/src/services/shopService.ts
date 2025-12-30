import { ShopItem } from '../models/ShopItem';
import { InventoryItem } from '../models/InventoryItem';
import { User } from '../models/User';
import { ApiError } from '../utils/errorHandler';

export const listShopItems = async () => ShopItem.find();

export const purchaseItem = async (userId: string, itemId: string) => {
  const item = await ShopItem.findById(itemId);
  if (!item) {
    throw new ApiError('Item not found', 404);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  if (user.coins < item.price) {
    throw new ApiError('Not enough coins', 400);
  }
  user.coins -= item.price;
  const inventoryItem = await InventoryItem.create({
    user: user._id,
    name: item.name,
    type: item.type,
    rarity: item.rarity,
    iconUrl: item.iconUrl
  });
  user.inventory.push(inventoryItem._id);
  await user.save();
  return inventoryItem;
};
