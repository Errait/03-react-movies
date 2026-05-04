import axios from 'axios';
import { type Movie } from '../types/movie';

interface MoviesHttpResponse {
  results: Movie[];
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (searchword: string):
  Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query: searchword,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    } 
  );
  return response.data.results
}
