export async function saveUser({ id: _id, name: _name }) {
  // to be filled in
  // datta format: { id: uuid, name: string }
}

export async function getMonster(_id) {
  // for now it returns a hardcoded monster, to update to query DB
  return { id: 1, name: 'TestUser', max_hp: 100, attack_damage: 20, image_url: '' };
}

export async function getRandomQuestions(_n) {
  // Return mock questions for now
  return [
    {
      id: 1,
      prompt: 'What is 2+2?',
      option_a: '3',
      option_b: '4',
      option_c: '5',
      option_d: '6',
      correct_option: 'b',
      difficulty: '1',
      category: 'math',
    },
  ];
}

export async function saveMatch(_data) {
  // to be filled in
  // data format { roomCode, hostUserId, monsterId, startedAt, endedAt, result }
  // called at: gameEnded, once per match
  // must return { id } — the new match id, needed by saveMatchPlayers
}
export async function saveMatchPlayers(_data) {
  // to be filled in
  // data format [{ matchId, userId, accuracy }, ...]
  // called at: gameEnded, once per match, after saveMatch
}

// functions needed for room table

export async function createRoomRecord(_roomCode) {
  // to be filled in
  // insert new row into ROOMS table with code = roomCode and created_at = current timestamp
  // called at: joinRoom
}

export async function updateRoomEnded(_roomCode) {
  // to be filled in
  // action: update existing row in ROOMS table where code = roomCode, set ended_at = current timestamp
  // called at: gameEnded
}
