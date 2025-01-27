import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/characters-list/characters-list.component').then(m => m.CharactersListComponent) },
    { path: 'favorites', loadComponent: () => import('./pages/favorite-list/favorite-list.component').then(m => m.FavoriteListComponent) },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
