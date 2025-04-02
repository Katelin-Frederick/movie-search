import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

interface TMDBMovie {
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

interface TrendingMoviesResponse {
  total_results: number
  results: TMDBMovie[]
  total_pages: number
  page: number
}

export const movieRouter = createTRPCRouter({
  getTrending: publicProcedure.query<TrendingMoviesResponse>(async () => {
    const trendingMovies = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}&include_adult=false`
    )
      .then((response) => response.json())
      .then((data) => data as TrendingMoviesResponse)

    return trendingMovies
  }),
})
