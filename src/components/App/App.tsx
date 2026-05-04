import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import './App.module.css';
import css from '../ErrorMessage/ErrorMessage.module.css';

import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

import { type Movie } from '../../types/movie';

export default function App() {
  const [searchWord, setSearchWord] = useState<string>('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!searchWord) return;

    async function getMovieList() {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchMovies(searchWord);

        if (data.length === 0) {
          setMovieList([]);
        } else {
          setMovieList(data);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieList();
  }, [searchWord]);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <SearchBar onSubmit={setSearchWord} />

      {isError && <ErrorMessage />}

      {!isLoading && movieList.length > 0 && (
        <MovieGrid onSelect={handleSelectMovie} movies={movieList} />
      )}

      {!isLoading && !isError && searchWord && movieList.length === 0 && (
        <p className={css.text}>No movies found for your request.</p>
      )}

      {isLoading && <Loader />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}
