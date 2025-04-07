export interface CastMember {
  profile_path: string | null
  character: string
  cast_id: number
  order: number
  name: string
  id: number
}

export interface CrewMember {
  profile_path: string | null
  department: string
  credit_id: string
  name: string
  job: string
  id: number
}

export interface CreditsResponse {
  cast: CastMember[]  // Array of cast members
  crew: CrewMember[]  // Array of crew members
}

export interface AggregateCreditsResponse {
  cast: { id: number; name: string; character: string }[];
  crew: { id: number; name: string; job: string }[];
  // Add other fields based on the TMDB response data.
}