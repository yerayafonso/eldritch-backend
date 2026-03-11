import { rooms } from '../rooms.js';
import { calculateAccuracy } from '../utils/calculateAccuracy.js';
// import { saveMatch, saveMatchPlayers } from '../db/queries.js';

export async function handleDisconnect(io, socket) {
  const code = socket.data.roomCode;
  // const name = socket.data.name;
  const userId = socket.data.userId;

  // GUARDS
  if (!code) {
    return;
  }

  if (!rooms[code]) {
    return;
  }

  if (rooms[code].roomStatus === 'ended') {
    return;
  }

  // CLEAR player (but saves snaposhots of players for stats)
  const allPlayersSnapshot = [...rooms[code].players];
  rooms[code].players = rooms[code].players.filter((player) => player.userId !== userId);

  if (rooms[code].players.length === 0) {
    delete rooms[code];
    return;
  }

  // IN-GAME INTERRUPTION FLOW
  if (rooms[code].roomStatus === 'in-game') {
    const perPlayerAccuracy = calculateAccuracy(allPlayersSnapshot);

    clearTimeout(rooms[code].timerId);
    rooms[code].roomStatus = 'ended';

    const gameEndedPayload = {
      result: 'abandoned',
      reason: 'player_disconnected',
      monsterId: rooms[code].monster.monster_id,
      teamHpFinal: rooms[code].teamHp,
      monsterHpFinal: rooms[code].monsterHp,
      perPlayerAccuracy: perPlayerAccuracy,
    };

    io.to(code).emit('gameEnded', gameEndedPayload);

    // SAVE RESULTS TO DB - commented out until DB is operational
    // try {
    //   const match_id = await saveMatch({
    //     roomCode: code,
    //     hostUserId: rooms[code].hostUserId,
    //     startedAt: rooms[code].startedAt,
    //     result: 'abandoned',
    //   });
    //   await saveMatchPlayers(
    //     perPlayerAccuracy.map((p) => ({
    //       match_id: match_id,
    //       user_id: p.userId,
    //       accuracy: p.accuracy,
    //     }))
    //   );
    // } catch (err) {
    //   console.error('Failed to save match to DB after player disconnect', { code, userId, err });
    // }

    setTimeout(() => {
      delete rooms[code];
    }, 180000); // 3 min delay before deleting the room to allow for stuff to happen if it needs to
  }

  // LOBBY DISCONNECTION FLOW

  if (rooms[code].roomStatus === 'lobby') {
    if (rooms[code].hostUserId === userId) {
      rooms[code].hostUserId = rooms[code].players[0].userId;
    }

    const publicPlayers = rooms[code].players.map((player) => ({
      userId: player.userId,
      name: player.name,
      character: player.character,
    }));

    const lobbyUpdatedPayload = {
      roomCode: code,
      hostUserId: rooms[code].hostUserId,
      players: publicPlayers,
      roomStatus: 'lobby',
    };

    io.to(code).emit('lobbyUpdated', lobbyUpdatedPayload);
  }
}
