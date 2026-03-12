import { fetchAllCharacters } from './characters.model.js';

export function getAllCharactersService() {
  return fetchAllCharacters().then((characters) => {
    return characters;
  });
}
