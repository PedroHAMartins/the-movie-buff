import { Movie } from '@/domain';

export class HandleFavorite {
  private favoritesKey = 'favorites';

  constructor() {}

  getFavorites(): Movie[] {
    const favoriteList = localStorage.getItem(this.favoritesKey);
    return favoriteList ? JSON.parse(favoriteList) : [];
  }

  saveFavorites(favorites: Movie[]): void {
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  addFavorite(movie: Movie) {
    const favorites = this.getFavorites();
    if (!favorites.find((f) => f.id === movie.id)) {
      favorites.push(movie);
      this.saveFavorites(favorites);
    }
  }

  removeFromFavorites(id: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter((f) => f.id !== id);
    this.saveFavorites(favorites);
  }

  updateFavorite(movie: Movie): void {
    let favorites = this.getFavorites();
    favorites = favorites.map((f) => (f.id === movie.id ? movie : f));
    this.saveFavorites(favorites);
  }
}
