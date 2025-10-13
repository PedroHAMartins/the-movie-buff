import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MovieCard } from '../ui';
import { getMovies, GetPopularMoviesResponseDto } from '../../../server-actions';

@Component({
  selector: 'movies-section',
  standalone: true,
  imports: [MovieCard],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      @for (movie of movies(); track movie.id) {
      <movie-card
        [title]="movie.title"
        [description]="movie.overview"
        [image]="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      />
      }
    </div>
  `,
})
export class MoviesSection implements OnInit {
  private platformId = inject(PLATFORM_ID);
  movies = signal<GetPopularMoviesResponseDto['results']>([]);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMovies();
    }
  }

  async loadMovies() {
    try {
      const response = await getMovies();
      this.movies.set(response.data.results || []);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  }
}
