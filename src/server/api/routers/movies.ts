import type { TrendingMoviesResponse, } from 'types/movies'

import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

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
