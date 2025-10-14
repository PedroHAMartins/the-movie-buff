import { Component, signal, OnInit, PLATFORM_ID, inject, effect } from '@angular/core';
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
export class MoviesSection {
  movies = signal<GetPopularMoviesResponseDto['results']>([]);

  constructor() {
    effect(async () => {
      const data = await getMovies();
      if (data) {
        this.movies.set(data.data.results);
      }
    });
  }
}
