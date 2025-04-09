import type { TMDBSeries, } from './series'
import type { TMDBMovie, } from './movies'

export interface SimilarSeriesResponse {
  total_results: number
  results: TMDBSeries[]
  total_pages: number
  page: number
}

export interface SimilarMoviesResponse {
  total_results: number
  results: TMDBMovie[]
  total_pages: number
  page: number
}