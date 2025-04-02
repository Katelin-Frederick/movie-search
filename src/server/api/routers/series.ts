import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

interface TMDBSeries {
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

interface TrendingSeriesResponse {
  total_results: number
  results: TMDBSeries[]
  total_pages: number
  page: number
}

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
