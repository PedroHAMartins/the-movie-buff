import { Routes } from '@angular/router';
import { HomePage } from './components/pages/home.page';
import { FavoritesPage } from './components/pages/favorites.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'favorites', component: FavoritesPage },
  { path: '**', redirectTo: '' },
];
