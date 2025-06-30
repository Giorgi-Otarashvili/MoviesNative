import axios from 'axios';
import { Movie,MovieDetails, MoviesResponse } from '../../types/movies';

const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDRiYzgyYzdjY2YxZTdiODgxMzIwNmEyYzQ4M2MzOSIsIm5iZiI6MTc1MTIyNTA0NC4zNjksInN1YiI6IjY4NjE5MmQ0NmU3YzI5NDM2N2ZkY2JhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mN_KM1gxyh7V0iWgK_bsz6ML0ZNjhUk5M_DiY5flEvg';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export const movieAPI = {
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/movie/popular', {
      params: { 
        language: 'en-US', 
        page 
      }
    });
    return response.data;
  },

  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await api.get<MoviesResponse>('/search/movie', {
      params: { 
        query, 
        language: 'en-US', 
        page 
      }
    });
    return response.data;
  },
getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${movieId}`, {
    params: { 
      language: 'en-US'
    }
  });
  return response.data;
},
};

export const getImageUrl = (path: string | null): string | null => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/w500${path}`;
};