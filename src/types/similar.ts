export interface SimilarSeries {
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  name: string;
  id: number;
}

export interface SimilarSeriesResponse {
  results: SimilarSeries[];
  total_results: number;
  total_pages: number;
  page: number;
}