import { createReducer, on } from "@ngrx/store";
import { setCharacterLoader, setCharacterLoadingMore, setFavorites, setStateCharacters, toggleFavoriteStatus } from "./characters.actions";
import { Info } from "../../core/models/characters/info.model";
import { CharacterPage } from "../../core/models/characters/character-page.model";
import { saveFavorites } from "../../core/utils/favorites-local-storage";

export const initialCharacter: CharacterPage = {
    info: {} as Info,
    results: [],
    favorites: [],
    isLoading: true,
    isLoadingMore: false
};

export const reducerCharacter = createReducer(
    initialCharacter,
    on(setStateCharacters, (state, { charactersPage }) => {
        const updatedResults = charactersPage.results.map((character) => ({
          ...character,
          isFavorite: state.favorites.some((fav) => fav.id === character.id),
        }));
      
        return {
          ...state,
          ...charactersPage,
          results: updatedResults
        };
    }),
    on(toggleFavoriteStatus, (state, { characterId }) => {
        const isAlreadyFavorite = state.favorites.some((fav) => fav.id === characterId);
      
        const updatedResults = state.results.map(character =>
            character.id === characterId
              ? { ...character, isFavorite: !character.isFavorite }
              : character
        );
        
        const updatedFavorites = isAlreadyFavorite
          ? state.favorites.filter((fav) => fav.id !== characterId)
          : [...state.favorites, state.results.find((char) => char.id === characterId)!];

        saveFavorites(updatedFavorites);
      
        return {
          ...state,
          results: updatedResults,
          favorites: updatedFavorites,
        };
    }),
    on(setCharacterLoader, (state, { isLoading }) => ({
        ...state,
        isLoading: isLoading
      })
    ),
    on(setCharacterLoadingMore, (state, { isLoading }) => ({
        ...state,
        isLoadingMore: isLoading
      })
    ),
    on(setFavorites, (state, { favorites }) => ({
      ...state,
      favorites,
    })),
)