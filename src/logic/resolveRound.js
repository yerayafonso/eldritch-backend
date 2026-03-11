import { rooms } from '../rooms.js';
import { getMonsterForStage, getRandomQuestions } from '../db/queries.js';
// import { saveMatch, saveMatchPlayers } from '../db/queries.js';
import { QUESTIONS_PER_MONSTER, DIFFICULTY_MAP, TOTAL_STAGES } from '../constants.js';
import { startNextRound } from './startNextRound.js';
import { calculateAccuracy } from '../utils/calculateAccuracy.js';

export async function resolveRound(io, code) {
  // INTIALISATION
  clearTimeout(rooms[code].timerId);

  const currentQuestionIndex = rooms[code].currentQuestionIndex;
  const currentQuestion = rooms[code].questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correct_option;

  let totalMonsterDamage = 0;

  let totalTeamDamage = 0;

  let playerResults = [];

  // CHECK ANSWERS AND UPDATE TEAM AND MONSTER HP

  for (let player of rooms[code].players) {
    player.totalQuestions++;

    const playerAnswer = rooms[code].answers[player.userId];
    const isAnswerCorrect = playerAnswer === correctAnswer;

    // if player has won round
    if (isAnswerCorrect) {
      player.correctAnswers++;
      totalMonsterDamage += player.character.base_attack;
    }

    // if monster has won round
    else {
      totalTeamDamage += rooms[code].monster.attack_damage;
    }

    let playerResult = {
      userId: player.userId,
      name: player.name,
      answer: playerAnswer,
      isCorrect: isAnswerCorrect,
      correctAnswers: player.correctAnswers,
      totalQuestions: player.totalQuestions,
    };

    playerResults.push(playerResult);
  }

  rooms[code].monsterHp -= totalMonsterDamage;
  rooms[code].teamHp -= totalTeamDamage;
  if (rooms[code].monsterHp < 0) rooms[code].monsterHp = 0;
  if (rooms[code].teamHp < 0) rooms[code].teamHp = 0;

  // GAME BRANCHING: 1) GAMEOVER (defeat or vicotory) or 2) LEVEL UP 3) NEXT ROUND

  const isDefeat = rooms[code].teamHp === 0;
  const isVictory = rooms[code].monsterHp === 0 && rooms[code].currentStage === TOTAL_STAGES;
  const isGameOver = isDefeat || isVictory;
  const result = isVictory ? 'victory' : 'defeat';

  const baseResultPayload = {
    roundNumber: rooms[code].roundNumber,
    questionId: currentQuestion.question_id,
    correctOption: correctAnswer,
    playerResults: playerResults,
    teamDamageTaken: totalTeamDamage,
    monsterDamageTaken: totalMonsterDamage,
    teamHpAfter: rooms[code].teamHp,
    monsterHpAfter: rooms[code].monsterHp,
    isFinalRound: isGameOver,
  };

  // 1) GAME OVER FLOW
  if (isGameOver) {
    rooms[code].roomStatus = 'ended';
    io.to(code).emit('roundResult', baseResultPayload);

    const perPlayerAccuracyArray = calculateAccuracy(rooms[code].players);

    const gameEndedPayload = {
      result: result,
      monsterId: rooms[code].monster.monster_id,
      teamHpFinal: rooms[code].teamHp,
      monsterHpFinal: rooms[code].monsterHp,
      perPlayerAccuracy: perPlayerAccuracyArray,
    };

    io.to(code).emit('gameEnded', gameEndedPayload);

    // Save match to DB - to enable once queries.js is connected to DB
    // try {
    //   const match_id = await saveMatch({
    //     roomCode: code,
    //     hostUserId: rooms[code].hostUserId,
    //     startedAt: rooms[code].startedAt,
    //     result: result,
    //   });
    //   await saveMatchPlayers(
    //     perPlayerAccuracyArray.map((p) => ({
    //       match_id: match_id,
    //       user_id: p.userId,
    //       accuracy: p.accuracy,
    //     }))
    //   );
    // } catch (err) {
    //   console.error('Failed to save match to DB', { code, result, err });
    // }

    setTimeout(() => {
      delete rooms[code];
    }, 180000); // 3 min delay before deleting the room to allow for stuff to happen if it needs to
  }

  // 2) NEXT MONSTER FLOW
  else if (rooms[code].monsterHp === 0) {
    rooms[code].currentStage++;

    // load new monster
    rooms[code].monster = await getMonsterForStage(rooms[code].currentStage);
    rooms[code].monsterHp = rooms[code].monster.max_hp;

    // Load new questions in memory
    const newDifficulty = DIFFICULTY_MAP[rooms[code].currentStage - 1];
    const monsterQuestions = await getRandomQuestions(QUESTIONS_PER_MONSTER, newDifficulty);
    rooms[code].questions = monsterQuestions;
    rooms[code].questionIds = monsterQuestions.map((question) => question.question_id);

    // new stage resets
    rooms[code].currentQuestionIndex = -1; // // it's startNextRound()'s task to increment this index to 0
    rooms[code].currentQuestionId = null;
    rooms[code].answers = {};

    const roundResultNextStagePayload = {
      ...baseResultPayload,
      isNextStage: true,
      nextMonster: rooms[code].monster,
      nextStage: rooms[code].currentStage,
    };

    io.to(code).emit('roundResult', roundResultNextStagePayload);

    startNextRound(io, code);
  }

  // 3)  NEXT ROUND FLOW
  else {
    rooms[code].answers = {};
    io.to(code).emit('roundResult', baseResultPayload);
    startNextRound(io, code);
  }
}
