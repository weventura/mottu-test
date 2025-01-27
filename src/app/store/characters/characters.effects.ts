import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { loadCharactersPage, loadedCharacters, setStateCharacters, searchCharactersName, setCharacterLoader, loadCharactersNextPage, setCharacterLoadingMore, initializeFavorites, setFavorites } from "./characters.actions";
import { selectCharactersPage, selectFavoriteCharacters } from "./characters.selectors";
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { CharacterPage } from "../../core/models/characters/character-page.model";
import { BaseService } from "../../core/services/base.service";
import { Character } from "../../core/models/characters/character.model";
import { Info } from "../../core/models/characters/info.model";
import { getFavorites } from "../../core/utils/favorites-local-storage";

@Injectable({
  providedIn: 'root'
})
export class CharactersEffects {

  private readonly actions$ = inject(Actions);
  private readonly baseService = inject(BaseService);
  private readonly store = inject(Store<{ characters: CharacterPage }>);

  loadCharacters = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharactersPage),
      withLatestFrom(
        this.store.select(selectCharactersPage),
        this.store.select(selectFavoriteCharacters)
      ),
      switchMap(([_, characters, favorites]) => {
        if (characters.results.length > 0) {
          return of(loadedCharacters());
        }
  
        this.startLoading();
  
        const endpoint = this.getEndpoint(characters, false);
        return this.baseService.onGet<CharacterPage>(endpoint).pipe(
          map((data) => {
            const updatedResults = this.updateResults(data.results, [], favorites, false);
            return setStateCharacters({
              charactersPage: this.createUpdatedState(data, updatedResults),
            });
          }),
          tap(() => this.stopLoading()),
          catchError(() => {
            this.stopLoading();
            return of(loadedCharacters());
          })
        );
      })
    )
  );

  loadMoreCharacters = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCharactersNextPage),
      withLatestFrom(
        this.store.select(selectCharactersPage),
        this.store.select(selectFavoriteCharacters)
      ),
      switchMap(([_, characters, favorites]) => {  
        
        if (!this.shouldLoadMore(characters)) {
          return of(loadedCharacters());
        }
  
        this.startLoadingMore();
  
        const endpoint = this.getEndpoint(characters, true);
        return this.baseService.onGet<CharacterPage>(endpoint).pipe(
          map((data) => {
            const updatedResults = this.updateResults(
              data.results,
              characters.results,
              favorites,
              true
            );
            return setStateCharacters({
              charactersPage: this.createUpdatedState(data, updatedResults),
            });
          }),
          tap(() => this.stopLoadingMore()),
          catchError(() => {
            this.stopLoadingMore();
            return of(loadedCharacters());
          })
        );
      })
    )
  );

  searchNamePageCharacter = createEffect(() =>
    this.actions$.pipe(
      ofType(searchCharactersName),
      withLatestFrom(this.store.select(selectFavoriteCharacters)),
      switchMap(([props, favorites]) => {
        const params = this.createSearchParams(props);
  
        this.startLoading();
  
        return this.baseService
          .onGet<CharacterPage>(`character?${params.toString()}`)
          .pipe(
            map((data: CharacterPage) => {
              const updatedResults = this.updateSearchResults(data.results, favorites);
  
              return setStateCharacters({
                charactersPage: { ...data, results: updatedResults },
              });
            }),
            tap(() => this.stopLoading()),
            catchError(() => {
              this.stopLoading();
              return of(
                setStateCharacters({
                  charactersPage: this.createEmptySearchState(favorites),
                })
              );
            })
          );
      })
    )
  );

  initializeFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initializeFavorites),
      map(() => {
        const favorites = getFavorites();
        return setFavorites({ favorites });
      })
    )
  );

  private shouldLoadMore(characters: CharacterPage): boolean {
    return !!characters.info?.next;
  }

  private getEndpoint(characters: CharacterPage, loadMore: boolean): string {
    if (loadMore && this.shouldLoadMore(characters)) {
      const nextUrl = new URL(characters.info.next || '');
      return nextUrl.pathname.replace('/api/', '') + nextUrl.search;
    }
    return 'character';
  }

  private updateResults(
    newResults: Character[],
    existingResults: Character[],
    favorites: Character[],
    append: boolean
  ): Character[] {
    const updatedNewResults = newResults.map((character) => ({
      ...character,
      isFavorite: favorites.some((fav) => fav.id === character.id),
    }));
    return append ? [...existingResults, ...updatedNewResults] : updatedNewResults;
  }

  private createUpdatedState(
    data: CharacterPage,
    updatedResults: Character[]
  ): CharacterPage {
    return {
      ...data,
      results: updatedResults,
    };
  }

  private startLoading(): void {
    this.store.dispatch(setCharacterLoader({ isLoading: true }));
  }

  private stopLoading(): void {
    this.store.dispatch(setCharacterLoader({ isLoading: false }));
  }

  private startLoadingMore(): void {
    this.store.dispatch(setCharacterLoadingMore({ isLoading: true }));
  }

  private stopLoadingMore(): void {
    this.store.dispatch(setCharacterLoadingMore({ isLoading: false }));
  }

  private createSearchParams(props: { name: string }): HttpParams {
    return new HttpParams().set('name', props.name || '');
  }

  private updateSearchResults(
    newResults: Character[],
    favorites: Character[]
  ): Character[] {
    return newResults.map((character) => ({
      ...character,
      isFavorite: favorites.some((fav) => fav.id === character.id),
    }));
  }

  private createEmptySearchState(favorites: Character[]): CharacterPage {
    return {
      info: {} as Info,
      results: [],
      favorites: [...favorites],
      isLoading: false,
      isLoadingMore: false
    };
  }
}