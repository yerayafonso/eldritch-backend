export function calculateAccuracy(playersArray) {
  return playersArray.map((player) => {
    const accuracyPercentage =
      player.totalQuestions > 0 ? (player.correctAnswers * 100) / player.totalQuestions : 0;

    return {
      userId: player.userId,
      name: player.name,
      accuracy: accuracyPercentage,
      correctAnswers: player.correctAnswers,
      totalQuestions: player.totalQuestions,
    };
  });
}
