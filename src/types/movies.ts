import type { ProductionCompany, ProductionCountry, SpokenLanguage, Genre, } from './types'

export interface TMDBMovie {
  original_language: string
  original_title: string
  backdrop_path: string
  release_date: string
  vote_average: number
  poster_path: string
  genre_ids: number[]
  media_type: 'movie'
  popularity: number
  vote_count: number
  overview: string
  adult: boolean
  video: boolean
  title: string
  id: number
}

export interface TrendingMoviesResponse {
  total_results: number
  results: TMDBMovie[]
  total_pages: number
  page: number
}

export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: null | {
    backdrop_path: string
    id: number
    name: string
    poster_path: string
  }
  production_countries: ProductionCountry[]
  production_companies: ProductionCompany[]
  spoken_languages: SpokenLanguage[]
  origin_country: [
    string
  ]
  original_language: string
  original_title: string
  backdrop_path: string
  release_date: string
  vote_average: number
  poster_path: string
  popularity: number
  vote_count: number
  homepage: string
  overview: string
  genres: Genre[]
  tagline: string
  imdb_id: string
  runtime: number
  revenue: number
  status: string
  adult: boolean
  budget: number
  video: boolean
  title: string
  id: number
}

export interface ReleaseDate {
  release_dates: Array<{
    note: string
    certification: string
  }>
  iso_3166_1: string
}

export interface ReleaseDateResponse {
  results: ReleaseDate[]
}