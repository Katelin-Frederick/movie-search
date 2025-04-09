import type { ProductionCompany, ProductionCountry, SpokenLanguage, Genre, } from './types'
import type { CastMember, CrewMember, } from './credits'

export interface TMDBSeries {
  original_language: string
  origin_country: string[]
  first_air_date: string
  original_name: string
  backdrop_path: string
  vote_average: number
  poster_path: string
  genre_ids: number[]
  popularity: number
  vote_count: number
  media_type: 'tv'
  overview: string
  adult: boolean
  name: string
  id: number
}

export interface TrendingSeriesResponse {
  total_results: number
  results: TMDBSeries[]
  total_pages: number
  page: number
}

export interface Season {
  episode_count: number
  season_number: number
  vote_average: number
  poster_path: string
  air_date: string
  overview: string
  name: string
  id: number
}

export interface Episode {
  production_code: string
  episode_number: number
  season_number: number
  vote_average: number
  episode_type: string
  vote_count: number
  still_path: string
  overview: string
  air_date: string
  runtime: number
  show_id: number
  name: string
  id: number
}

export interface TMDBSeriesDetails extends TMDBSeries {
  created_by: [
    {
      id: number
      credit_id: string
      name: string
      original_name: string
      gender: number
      profile_path: string
    }
  ]
  networks: [
    {
      id: number
      logo_path: string
      name: string
      origin_country: string
    }
  ]
  production_countries: ProductionCountry[]
  production_companies: ProductionCompany[]
  spoken_languages: SpokenLanguage[]
  origin_country: [
    string
  ]
  next_episode_to_air: null | string
  languages: [
    string
  ]
  last_episode_to_air: Episode
  episode_run_time: [string]
  number_of_episodes: number
  original_language: string
  number_of_seasons: number
  first_air_date: string
  in_production: boolean
  original_name: string
  last_air_date: string
  backdrop_path: string
  vote_average: number
  poster_path: string
  popularity: number
  vote_count: number
  seasons: Season[]
  overview: string
  homepage: string
  genres: Genre[]
  tagline: string
  status: string
  adult: boolean
  type: string
  name: string
  id: number
}

export interface Certification {
  iso_3166_1: string
  rating: string
}

export interface ContentRatingsResponse {
  results: Certification[]
}

export interface SeasonDetail {
  poster_path: string | null
  air_date: string | null
  season_number: number
  episodes: Episode[]
  overview: string
  name: string
  id: number
}

export interface EpisodeDetails {
  guest_stars: CastMember[]
  production_code: string
  episode_number: number
  season_number: number
  vote_average: number
  crew: CrewMember[]
  still_path: string
  vote_count: number
  overview: string
  air_date: string
  runtime: number
  name: string
  id: number
}

export interface EpisodeCreditsResponse {
  guest_stars: CastMember[]
  cast: CastMember[]
  crew: CrewMember[]
}