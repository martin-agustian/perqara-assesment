// ** Types
import type { OptionsDT } from "./types";

const sortOptions: OptionsDT[] = [
  {
    label: 'Popularity Ascending',
    value: 'popularity.asc'
  },
  {
    label: 'Popularity Descending',
    value: 'popularity.desc'
  },
  {
    label: 'Rating Ascending',
    value: 'vote_average.asc'
  },
  {
    label: 'Rating Descending',
    value: 'vote_average.desc'
  },
];

export const sortMovieOptions: OptionsDT[] = [
  ...sortOptions.slice(0, 2),
  {
    label: 'Release Date Ascending',
    value: 'primary_release_date.asc'
  },
  {
    label: 'Release Date Descending',
    value: 'primary_release_date.desc'
  },
  ...sortOptions.slice(2, 4),
];

export const sortTvShowOptions: OptionsDT[] = [
  ...sortOptions.slice(0, 2),
  {
    label: 'Release Date Ascending',
    value: 'first_air_date.asc'
  },
  {
    label: 'Release Date Descending',
    value: 'first_air_date.desc'
  },
  ...sortOptions.slice(2, 4),
];

export const genreOptions: OptionsDT[] = [
  {
    label: 'Action',
    value: '28'
  },
  {
    label: 'Adventure',
    value: '12'
  },
  {
    label: 'Animation',
    value: '16'
  },
  {
    label: 'Comedy',
    value: '35'
  },
  {
    label: 'Crime',
    value: '80'
  },
  {
    label: 'Documentary',
    value: '99'
  },
  {
    label: 'Drama',
    value: '18'
  },
  {
    label: 'Family',
    value: '10751'
  },
  {
    label: 'Fantasy',
    value: '14'
  },
  {
    label: 'History',
    value: '36'
  },
  {
    label: 'Horror',
    value: '27'
  },
];