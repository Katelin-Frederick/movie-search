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