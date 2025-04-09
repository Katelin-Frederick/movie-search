export interface TMDBPerson {
  known_for_department: string
  original_name: string
  profile_path: string
  media_type: 'person'
  popularity: number
  gender: number
  adult: boolean
  name: string
  id: number
}

export interface TrendingPeopleResponse {
  results: TMDBPerson[]
  total_results: number
  total_pages: number
  page: number
}

export interface TMDBPersonDetails extends TMDBPerson {
  also_known_as: [
    string
  ]
  known_for_department: string
  birthday: null | string
  deathday: null | string
  homepage: null | string
  place_of_birth: string
  imdb_id: null | string
  profile_path: string
  popularity: number
  biography: string
  adult: boolean
  gender: number
  name: string
  id: number
}