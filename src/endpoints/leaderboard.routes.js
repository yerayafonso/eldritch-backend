import express from 'express';
import { getLeaderboard } from './leaderboard.controller.js';

const leaderboardRouter = express.Router();

leaderboardRouter.route('/').get(getLeaderboard);

export default leaderboardRouter;
