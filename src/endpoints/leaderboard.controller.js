import { getLeaderboardService } from './leaderboard.service.js';

export function getLeaderboard(req, res, next) {
  getLeaderboardService()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      next(err);
    });
}
