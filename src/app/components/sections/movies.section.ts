import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MovieCard, SimpleSkeletonComponent } from '../ui';
import { GetPopularMoviesResponseDto } from 'src/server-actions';

@Component({
  selector: 'movies-section',
  standalone: true,
  imports: [MovieCard, SimpleSkeletonComponent, MatPaginatorModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      @if (isLoading()) { @for (item of [1,2,3,4,5,6,7,8,9,10,11,12]; track item) {
      <simple-skeleton width="294px" height="476px" className="rounded-lg"></simple-skeleton>
      } } @else { @for (movie of movies(); track movie.id) {
      <movie-card
        [title]="movie.title"
        [image]="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        [movie]="movie"
      />
      } }
      <mat-paginator
        [length]="totalResults()"
        [pageSize]="20"
        [pageIndex]="currentPage()"
        (page)="onPageChange($event)"
        [hidePageSize]="true"
        [disabled]="isLoading()"
      >
      </mat-paginator>
    </div>
  `,
})
export class MoviesSection implements OnInit {
  movies = signal<GetPopularMoviesResponseDto['results']>([]);
  totalPages = signal<GetPopularMoviesResponseDto['total_pages']>(0);
  totalResults = signal<GetPopularMoviesResponseDto['total_results']>(0);
  currentPage = signal(0);
  isLoading = signal(true);
  private platformId = inject(PLATFORM_ID);

  async ngOnInit() {
    await this.loadMovies(1);
  }

  async loadMovies(page: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoading.set(true);
      try {
        const response = await fetch(`/api/movies?page=${page}`);
        const data: GetPopularMoviesResponseDto = await response.json();

        if (data) {
          this.movies.set(data.results);
          this.totalPages.set(data.total_pages);
          this.totalResults.set(data.total_results);
          this.currentPage.set(page - 1);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  onPageChange(event: PageEvent) {
    const newPage = event.pageIndex + 1;
    this.loadMovies(newPage);
  }
}
