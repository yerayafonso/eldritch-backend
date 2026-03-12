import { getAllCharactersService } from './characters.service.js';

export function getAllCharacters(req, res, next) {
  getAllCharactersService()
    .then((characters) => {
      res.status(200).send(characters);
    })
    .catch((err) => {
      next(err);
    });
}
