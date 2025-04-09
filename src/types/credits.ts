export interface CastMember {
  known_for_department: string
  original_name: string
  profile_path: string
  popularity: number
  character: string
  credit_id: string
  adult: boolean
  gender: number
  order: number
  name: string
  id: number
}

export interface MovieCredit {
  original_language: string
  original_title: string
  backdrop_path: string
  release_date: string
  vote_average: number
  poster_path: string
  genre_ids: number[]
  popularity: number
  vote_count: number
  character: string
  credit_id: string
  overview: string
  adult: boolean
  video: boolean
  order: number
  title: string
  id: number
}

export interface SeriesCredit {
  original_language: string
  original_title: string
  backdrop_path: string
  release_date: string
  vote_average: number
  poster_path: string
  genre_ids: number[]
  popularity: number
  vote_count: number
  character: string
  credit_id: string
  overview: string
  adult: boolean
  video: boolean
  order: number
  name: string
  id: number
}

export interface MovieCastMember extends CastMember {
  cast_id: number
}

export interface CrewMember {
  known_for_department: string
  original_name: string
  profile_path: string
  department: string
  popularity: number
  credit_id: string
  adult: boolean
  gender: number
  name: string
  job: string
  id: number
}

export interface CreditsResponse {
  cast: MovieCastMember[]
  crew: CrewMember[]
}

export interface AggregateCreditsResponse {
  cast: CastMember[]
  crew: CrewMember[]
}