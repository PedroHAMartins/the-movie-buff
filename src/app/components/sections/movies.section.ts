import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MovieCard } from '../ui';
import { GetPopularMoviesResponseDto } from '../../../server-actions';

@Component({
  selector: 'movies-section',
  standalone: true,
  imports: [MovieCard],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      @if (movies().length === 0) {
      <div class="col-span-full text-center py-8">
        <p class="text-gray-600">Loading movies...</p>
      </div>
      } @for (movie of movies(); track movie.id) {
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
  movies = signal<GetPopularMoviesResponseDto['results']>([]);
  private platformId = inject(PLATFORM_ID);

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const response = await fetch('/api/movies');
        const data: GetPopularMoviesResponseDto = await response.json();

        if (data?.results) {
          this.movies.set(data.results);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  }
}
