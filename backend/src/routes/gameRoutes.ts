import { Router } from 'express';
import { createRoomHandler, getRooms, quickMatch } from '../controllers/gameController';

const router = Router();

router.get('/rooms', getRooms);
router.post('/rooms', createRoomHandler);
router.post('/quick-match', quickMatch);

export default router;
