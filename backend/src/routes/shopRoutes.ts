import { Router } from 'express';
import { buyShopItem, getCases, getShopItems, openCaseItem } from '../controllers/shopController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/items', requireAuth, getShopItems);
router.post('/items/:itemId/buy', requireAuth, buyShopItem);
router.get('/cases', requireAuth, getCases);
router.post('/cases/:caseId/open', requireAuth, openCaseItem);

export default router;
