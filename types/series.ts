export interface TMDBSeries {
  original_language: string,
  origin_country: string[]
  first_air_date: string,
  original_name: string,
  backdrop_path: string,
  vote_average: number,
  poster_path: string,
  genre_ids: number[],
  popularity: number,
  vote_count: number,
  media_type: 'tv',
  overview: string,
  adult: boolean,
  name: string,
  id: number,
}

export interface TrendingSeriesResponse {
  total_results: number
  results: TMDBSeries[]
  total_pages: number
  page: number
}