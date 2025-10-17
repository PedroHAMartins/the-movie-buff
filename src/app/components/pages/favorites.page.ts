import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, Icon, MovieCard } from '../ui';
import { FavoriteService } from '../../core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'favorites-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MovieCard,
    Icon,
    LucideAngularModule,
  ],
  template: `
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Favorite Movies</h2>
      @if (favoriteService.getFavoriteCount() > 0) {
      <div class="mr-2 cursor-pointer" (click)="handleDialog(true)">
        <lucide-icon name="trash2" [size]="24"></lucide-icon>
      </div>
      }
    </div>
    <p class="text-gray-600 mb-6">
      You have {{ favoriteService.getFavoriteCount() }} favorite movies
    </p>

    @if (favoriteService.getFavoriteCount() === 0) {
    <div class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No favorite movies yet</h3>
      <p class="text-gray-500 mb-6">
        Start adding movies to your favorites by clicking the heart icon on movie cards.
      </p>
      <button mat-raised-button color="primary" routerLink="/" class="!bg-blue-600 !text-white">
        Browse Popular Movies
      </button>
    </div>
    } @else {
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      @for (movie of favoriteService.getFavorites(); track movie.id) {
      <movie-card
        [title]="movie.title"
        [image]="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        [movie]="movie"
      />
      }
    </div>
    }
  `,
})
export class FavoritesPage {
  favoriteService = inject(FavoriteService);
  dialog = inject(MatDialog);

  constructor() {}

  handleDialog(open: boolean) {
    if (open) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          header: 'Confirmar exclusão',
          label: 'Deseja excluir todos os favoritos?',
          confirmText: 'Confirmar',
          cancelText: 'Cancelar',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.handleDelete();
        }
      });
    }
  }

  handleDelete() {
    this.favoriteService.clearAllFavorites();
  }
}
