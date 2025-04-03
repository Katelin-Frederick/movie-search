export interface TMDBPerson {
  known_for_department: string,
  original_name: string,
  profile_path: string,
  media_type: 'person',
  popularity: number,
  gender: number,
  name: string,
  adult: false,
  id: number,
}

export interface TrendingPeopleResponse {
  results: TMDBPerson[]
  total_results: number
  total_pages: number
  page: number
}