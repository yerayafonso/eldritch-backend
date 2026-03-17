import { fetchLeaderboard } from './leaderboard.model.js';

export function getLeaderboardService() {
  return fetchLeaderboard().then((users) => {
    return users;
  });
}
