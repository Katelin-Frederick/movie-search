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

export interface RecommendedSeries {
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  name: string;
  id: number;
  // Add other fields from the TMDB API response that you need
}

export interface RecommendedSeriesResponse {
  results: RecommendedSeries[];
  total_results: number;
  total_pages: number;
  page: number;
}