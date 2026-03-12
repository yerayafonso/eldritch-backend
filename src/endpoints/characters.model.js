import { db } from '../db/connection.js';

export function fetchAllCharacters() {
  return db.query(`SELECT * FROM characters`).then(({ rows }) => {
    return rows;
  });
}
