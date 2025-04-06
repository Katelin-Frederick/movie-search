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

export interface TMDBSeriesDetails extends TMDBSeries {
  last_episode_to_air: {
    id: number,
    name: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    air_date: string,
    episode_number: number,
    episode_type: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string
  },
  seasons: [
    {
      air_date: string,
      episode_count: number,
      id: number,
      name: string,
      overview: string,
      poster_path: string,
      season_number: number,
      vote_average: number
    }
  ],
  created_by: [
    {
      id: number,
      credit_id: string,
      name: string,
      original_name: string,
      gender: number,
      profile_path: string
    }
  ],
  production_companies: [
    {
      id: number,
      logo_path: null | string,
      name: string,
      origin_country: string
    }
  ],
  networks: [
    {
      id: number,
      logo_path: string,
      name: string,
      origin_country: string
    }
  ],
  spoken_languages: [
    {
      english_name: string,
      iso_639_1: string,
      name: string
    }
  ],
  production_countries: [
    {
      iso_3166_1: string,
      name: string
    }
  ],
  genres: [
    {
      id: number,
      name: string
    }
  ],
  origin_country: [
    string
  ],
  next_episode_to_air: null | string,
  languages: [
    string
  ],
  episode_run_time: [string],
  number_of_episodes: number,
  original_language: string,
  number_of_seasons: number,
  first_air_date: string,
  in_production: boolean,
  original_name: string,
  last_air_date: string,
  backdrop_path: string,
  vote_average: number,
  poster_path: string,
  popularity: number,
  vote_count: number
  overview: string,
  homepage: string,
  tagline: string,
  status: string,
  adult: boolean,
  type: string,
  name: string,
  id: number,
}