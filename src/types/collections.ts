import type { TMDBMovie, } from './movies'

export interface CollectionResponse {
  backdrop_path: string | null
  poster_path: string | null
  parts: TMDBMovie[]
  overview: string
  name: string
  id: number
}