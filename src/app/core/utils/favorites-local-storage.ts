import { Character } from "../models/characters/character.model";

const FAVORITES_KEY = 'rick-and-morty-favorites';

export const saveFavorites = (favorites: Character[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export const getFavorites = (): Character[] => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}