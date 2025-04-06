interface CastMember {
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