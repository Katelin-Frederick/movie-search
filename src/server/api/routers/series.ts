import type { TrendingSeriesResponse, } from 'types/series'

import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

export const seriesRouter = createTRPCRouter({
  getTrending: publicProcedure.query<TrendingSeriesResponse>(async () => {
    const trendingSeries = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_KEY}&include_adult=false`
    )
      .then((response) => response.json())
      .then((data) => data as TrendingSeriesResponse)

    return trendingSeries
  }),
})
