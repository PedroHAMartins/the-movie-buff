import { requestHandler } from '@/core';
import { GetPopularMoviesResponseDto } from './dtos';
import { ApiResponse } from '@/domain';

export async function getPopularMovies(
  page: number = 1
): Promise<ApiResponse<GetPopularMoviesResponseDto>> {
  const response = await requestHandler({
    path: '/movie/popular',
    queryParams: { page },
  });

  if (!response) {
    throw new Error(`Failed to fetch movies: ${response}`);
  }

  return response as ApiResponse<GetPopularMoviesResponseDto>;
}
