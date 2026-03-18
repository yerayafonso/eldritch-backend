// SYSTEM CONFIG
export const DIFFICULTY_MAP = ['easy', 'medium', 'hard'];
export const ROOM_CLEANUP_DELAY_MS = 180000;
export const DISCONNECT_GRACE_PERIOD_MS = 10000;

// GAME TUNING
export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 1;
export const QUESTIONS_PER_MONSTER = 50;
export const ROUND_DURATION_MS = 15000;

// for now it must be left at 3 getMonsterForStage() needs updating before tweaking this
export const TOTAL_STAGES = 3;

//  Controls how severely a group is punished when a player answers incorrectly.
//  = 1.0 DEFAULT: Fair scaling. It means adding 100% of base damage per extra player. If 4 players get it wrong, they take 4x the base damage.
//  < 1.0 : more forgiving, it reduces the penalty for extra players. Great if you want to let the game not feel too short with weak players.
//  > 1.0 : more difficult, missing a question deals massive damage to the team. Requires a strong team and penalizes weaker players heavily resulting in short games.
export const MONSTER_DAMAGE_ADJUSTMENT_FACTOR = 1;

// Controls how the monster HP is scaled based on the number of players. It affects the speed of the game.
//   = 1.0: 100% of base HP per extra player. So in solo mode, monster HP equals his max_hp value. With more players its gets doubled, trebled etc.
//   < 1.0: FASTER FIGHTS. The monster's HP scales up slower than the player count. Makes multi-player games slightly faster and makes the players feel powerful.
//   > 1.0:  ENDURANCE MODE. The monster gains massive HP in multiplayer. Forces the team to maintain high accuracy over a much longer period of time.
export const MONSTER_HP_ADJUSTMENT_FACTOR = 1;
