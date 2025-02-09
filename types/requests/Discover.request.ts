export type DiscoverMovieRequestDT = {
  include_adult?: boolean
  with_genres?: string
  primary_release_year?: number
  sort_by?: string
  page?: number
};

export type DiscoverTVRequestDT = {
  with_genres?: string
  sort_by?: string
  page?: number
};