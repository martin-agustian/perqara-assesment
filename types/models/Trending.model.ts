export type TrendingDT = {
  id: number
  genre_ids: number[]
  name: string
  title: string
  media_type: 'tv' | 'movie'
  poster_path: string
  overview: string
  first_air_date: string
  release_date: string
  vote_average: number
}