import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CharactersEffects } from './store/characters/characters.effects';
import { reducerCharacter } from './store/characters/characters.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(), provideRouter(routes), provideAnimationsAsync(), provideStore({ charactersPage: reducerCharacter }), provideEffects(CharactersEffects)]
};
