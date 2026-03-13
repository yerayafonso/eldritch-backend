export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 1;
export const TOTAL_STAGES = 3; // for now it must be left at 3 getMonsterForStage() needs updating before tweaking this
export const QUESTIONS_PER_MONSTER = 50;
export const ROUND_DURATION_MS = 15000;
export const DIFFICULTY_MAP = ['easy', 'medium', 'hard'];
export const ROOM_CLEANUP_DELAY_MS = 180000;
export const MONSTER_DAMAGE_ADJUSTMENT_FACTOR = 1; // 1 means adding 100% of base damage per extra player, 0.5 would mean adding 50% of base damage per extra player
