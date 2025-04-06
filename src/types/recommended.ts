export interface RecommendedMovie {
  poster_path: string | null
  release_date: string
  title: string
  id: number
}

// Define the structure of the full response from the TMDB API
export interface RecommendedMoviesResponse {
  results: RecommendedMovie[]
  total_results: number
  total_pages: number
  page: number
}