import { createAction, props } from "@ngrx/store";
import { CharacterPage } from "../../core/models/characters/character-page.model";
import { Character } from "../../core/models/characters/character.model";

export const loadCharactersPage = createAction('[Character Component] Load Characters Page');

export const loadCharactersNextPage = createAction('[Character Component] Load Next Page Characters Page');

export const loadedCharacters = createAction('[Character Component] Loaded Characters');

export const setStateCharacters = createAction('[Character Component] Set Characters Page', props<{ charactersPage: CharacterPage }>());

export const addCharacters = createAction('[Character Component] Set Characters', props<{ charactersPage: CharacterPage }>());

export const searchCharactersName = createAction('[Character Component] Search Characters Name', props<{ name: string }>());

export const toggleFavoriteStatus = createAction('[Character Component] Toggle Favorite Status', props<{ characterId: number }>());

export const setCharacterLoader = createAction('[Character Component] Set Character Loader', props<{ isLoading: boolean }>());

export const setCharacterLoadingMore = createAction('[Character Component] Set Character Loading more', props<{ isLoading: boolean }>());

export const initializeFavorites = createAction('[Characters Component] Initialize Favorites');

export const setFavorites = createAction('[Characters Component] Set initial Favorites', props<{ favorites: Character[] }>());