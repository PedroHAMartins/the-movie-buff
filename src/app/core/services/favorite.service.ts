import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Movie } from '@/domain';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoritesKey = 'favorites';
  private platformId = inject(PLATFORM_ID);

  favorites = signal<Movie[]>([]);

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    if (isPlatformBrowser(this.platformId)) {
      const favoriteList = localStorage.getItem(this.favoritesKey);
      const favorites = favoriteList ? JSON.parse(favoriteList) : [];
      this.favorites.set(favorites);
    }
  }

  getFavorites(): Movie[] {
    return this.favorites();
  }

  private saveFavorites(favorites: Movie[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
      this.favorites.set(favorites);
    }
  }

  addFavorite(movie: Movie): void {
    const currentFavorites = this.favorites();
    if (!currentFavorites.find((f) => f.id === movie.id)) {
      const newFavorites = [...currentFavorites, movie];
      this.saveFavorites(newFavorites);
    }
  }

  removeFromFavorites(id: number): void {
    const currentFavorites = this.favorites();
    const newFavorites = currentFavorites.filter((f) => f.id !== id);
    this.saveFavorites(newFavorites);
  }

  updateFavorite(movie: Movie): void {
    const currentFavorites = this.favorites();
    const newFavorites = currentFavorites.map((f) => (f.id === movie.id ? movie : f));
    this.saveFavorites(newFavorites);
  }

  isFavorite(id: number): boolean {
    return this.favorites().some((f) => f.id === id);
  }

  toggleFavorite(movie: Movie): void {
    if (this.isFavorite(movie.id)) {
      this.removeFromFavorites(movie.id);
    } else {
      this.addFavorite(movie);
    }
  }

  clearAllFavorites(): void {
    this.saveFavorites([]);
  }

  getFavoriteCount(): number {
    return this.favorites().length;
  }
}
