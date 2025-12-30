import { Router } from 'express';
import { banUser, getInventory, getProfile, listUsers, updateProfile } from '../controllers/userController';
import { requireAdmin, requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.put('/me', requireAuth, updateProfile);
router.get('/me/inventory', requireAuth, getInventory);
router.get('/admin/users', requireAuth, requireAdmin, listUsers);
router.post('/admin/users/:userId/ban', requireAuth, requireAdmin, banUser);

export default router;
