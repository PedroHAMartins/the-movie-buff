import { requestHandler } from '@/core';
import { GetPopularMoviesResponseDto } from './dtos';
import { ApiResponse } from '@/domain';

export async function getMovies(): Promise<ApiResponse<GetPopularMoviesResponseDto>> {
  const response = await requestHandler({
    path: '/movie/popular',
  });

  if (!response) {
    throw new Error(`Failed to fetch movies: ${response}`);
  }

  return response as ApiResponse<GetPopularMoviesResponseDto>;
}
