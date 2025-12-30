import { Router } from 'express';
import { leaderboard, seasonLeaderboard } from '../controllers/statsController';

const router = Router();

router.get('/leaderboard', leaderboard);
router.get('/season', seasonLeaderboard);

export default router;
