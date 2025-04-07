export interface Video {
  iso_3166_1: string;
  name: string;
  site: string;
  type: string;
  key: string;
}

// Define the response structure from the API
export interface VideosResponse {
  results: Video[];
}