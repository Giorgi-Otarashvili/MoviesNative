import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieAPI } from '../services/api/movies';

export const usePopularMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam = 1 }) => movieAPI.getPopularMovies(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined; 
    },
    initialPageParam: 1,
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => movieAPI.searchMovies(query, page),
    enabled: query.length > 0,
  });
};
export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', 'details', movieId],
    queryFn: () => movieAPI.getMovieDetails(movieId),
    enabled: !!movieId,
  });
};