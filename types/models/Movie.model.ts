export type MovieDT = {
  id: number
  genre_ids: number[]
  title: string
  backdrop_path: string
  budget: number
  production_companies: {
    id: number
    name: string
  }[]
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  status: string
}