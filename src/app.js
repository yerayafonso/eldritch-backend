import express from 'express';
import charactersRouter from './endpoints/characters.routes.js';
import leaderboardRouter from './endpoints/leaderboard.routes.js';
const app = express();

// placeholder for routes for API endpoints if we add them later down the line

app.use(`/api/characters`, charactersRouter);

app.use(`/api/leaderboard`, leaderboardRouter);

export { app };
