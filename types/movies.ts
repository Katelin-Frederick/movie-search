export interface TMDBMovie {
  original_language: string,
  original_title: string,
  backdrop_path: string,
  release_date: string,
  vote_average: number,
  poster_path: string,
  genre_ids: number[],
  media_type: 'movie',
  popularity: number,
  vote_count: number
  overview: string,
  adult: boolean,
  video: boolean,
  title: string,
  id: number,
}

export interface TrendingMoviesResponse {
  total_results: number
  results: TMDBMovie[]
  total_pages: number
  page: number
}