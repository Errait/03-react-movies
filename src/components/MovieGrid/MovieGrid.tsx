import { type Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (film: Movie) => void;
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  const handleItemClick = (film: Movie) => {
    onSelect(film);
  };
  return (
    <ul className={css.grid}>
      {movies &&
        movies.map((film: Movie) => (
          <li key={film.id} onClick={() => handleItemClick(film)}>
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                alt={film.title}
                loading="lazy"
              />
              <h2 className={css.title}>{film.title}</h2>
            </div>
          </li>
        ))}
    </ul>
  );
}
