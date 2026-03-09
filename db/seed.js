const db = require('../connection');
// const format = require('pg-format');

async function seed() {
  await db.query(`DROP TABLE IF EXISTS match_players`);
  await db.query(`DROP TABLE IF EXISTS matches`);
  await db.query(`DROP TABLE IF EXISTS rooms`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS characters`);
  await db.query(`DROP TABLE IF EXISTS monsters`);
  await db.query(`DROP TABLE IF EXISTS questions`);
  await db.query(`DROP TABLE IF EXISTS items`);

  await db.query(`
        CREATE TABLE items (
        item_id SERIAL PRIMARY KEY,
        item_name TEXT NOT NULL,
        description TEXT,
        item_img_url TEXT,
        type TEXT NOT NULL,
        boost_attack INT DEFAULT 0,
        boost_defence INT DEFAULT 0,
        boost_sanity INT DEFAULT 0
        )`);

  await db.query(`
        CREATE TABLE questions (
        question_id SERIAL PRIMARY KEY,
        question_prompt TEXT NOT NULL,
        option_a TEXT NOT NULL
        option_b TEXT NOT NULL
        option_c TEXT NOT NULL
        option_d TEXT NOT NULL
        correect_option TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        category TEXT NOT NULL
        )`);

  await db.query(`
        CREATE TABLE monsters (
        monster_id SERIAL PRIMARY KEY,
        monster_name TEXT NOT NULL,
        max_hp INT NOT NULL,
        attack_damage INT NOT NULL,
        monster_img_url TEXT
        )`);

  await db.query(`
        CREATE TABLE characters (
        character_id SERIAL PRIMARY KEY,
        char_name TEXT NOT NULL,
        char_img TEXT,
        age INT NOT NULL,
        origin TEXT NOT NULL,
        race TEXT NOT NULL,
        backstory TEXT,
        base_hp INT NOT NULL,
        base_attack INT NOT NULL,
        base_sanity INT NOT NULL

        )`);

  await db.query(`
        CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        display_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        )`);

  await db.query(`
        CREATE TABLE rooms (
        room_code TEXT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

  await db.query(`
        CREATE TABLE matches (
        match_id SERIAL PRIMARY KEY,
        room_code TEXT NOT NULL REFERENCES rooms(room_code)
        host_user_id INT REFERENCES users(user_id) 
        monster_id INT REFERENCES monsters (monster_id)
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        result TEXT
        )`);

  await db.query(`
        CREATE TABLE match_players (
        match_id SERIAL PRIMARY KEY REFERENCES matches(match_id)
        user_id INT REFERENCES users(user_id)
        accuracy INT 
        )`);
}

module.exports = seed;
