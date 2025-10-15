import { Movie } from '@/domain';

export interface GetPopularMoviesResponseDto {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
