import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CharacterPage } from "../../core/models/characters/character-page.model";

export const selectInitialCharacterPage = createFeatureSelector<CharacterPage>('charactersPage');

export const selectCharactersPage = createSelector(
    selectInitialCharacterPage,
    (characterPage) => characterPage
)

export const selectLoader = createSelector(
    selectCharactersPage,
    (characterPage) => characterPage.isLoading
)

export const selectLoadingMore = createSelector(
    selectCharactersPage,
    (characterPage) => characterPage.isLoadingMore
)

export const selectCharacters = createSelector(
    selectCharactersPage,
    (characterPage) => characterPage.results
)

export const selectFavoriteCharacters = createSelector(
    selectCharactersPage,
    (characterPage) => characterPage.favorites.map((fav) => ({
        ...fav,
        isFavorite: true
    }))
)

export const selectFavoriteCharactersLenght = createSelector(
    selectFavoriteCharacters,
    (characterPage) => characterPage.length
)
