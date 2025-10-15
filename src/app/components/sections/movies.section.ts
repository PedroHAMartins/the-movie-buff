import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MovieCard, SimpleSkeletonComponent } from '../ui';
import { GetPopularMoviesResponseDto } from '../../../server-actions';

@Component({
  selector: 'movies-section',
  standalone: true,
  imports: [MovieCard, SimpleSkeletonComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      @if (isLoading()) { @for (item of [1,2,3,4,5,6,7,8,9,10,11,12]; track item) {
      <simple-skeleton width="294px" height="476px" className="rounded-lg"></simple-skeleton>
      } } @else { @for (movie of movies(); track movie.id) {
      <movie-card
        [title]="movie.title"
        [image]="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
      />
      } }
    </div>
  `,
})
export class MoviesSection implements OnInit {
  movies = signal<GetPopularMoviesResponseDto['results']>([]);
  isLoading = signal(true);
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
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
