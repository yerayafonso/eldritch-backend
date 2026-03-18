import { MONSTER_HP_ADJUSTMENT_FACTOR } from '../constants.js';

export function scaleMonsterHP(baseHP, playerCount) {
  if (playerCount < 1) return baseHP;
  // with default adjustment factor this formula translate to monsterHP = monster base HP * number of players
  return Math.ceil(baseHP + baseHP * MONSTER_HP_ADJUSTMENT_FACTOR * (playerCount - 1));
}
