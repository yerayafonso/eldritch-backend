import express from 'express';
import { getAllCharacters } from './characters.controller.js';

const charactersRouter = express.Router();

charactersRouter.route('/').get(getAllCharacters);

export default charactersRouter;
