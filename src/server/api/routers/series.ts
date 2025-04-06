import axios from 'axios'
import { z, } from 'zod'

import type { TrendingSeriesResponse, TMDBSeriesDetails, TMDBSeries, } from '~/types/series'

import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export const seriesRouter = createTRPCRouter({
  getTrending: publicProcedure.query<TMDBSeries[]>(async () => {
    try {
      const response = await axios.get<TrendingSeriesResponse>(
        `${TMDB_API_URL}/trending/tv/day`,
        {
          params: {
            api_key: process.env.TMDB_KEY,
            include_adult: false,
          },
        }
      )

      return response.data.results
    } catch (error) {
      throw new Error('Error fetching trending series from TMDB')
    }
  }),

  getDetails: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<TMDBSeriesDetails>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<TMDBSeriesDetails>(
          `${TMDB_API_URL}/tv/${id}`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              language: 'en-US',
            },
          }
        )

        return response.data
      } catch (error) {
        throw new Error('Error fetching series details from TMDB')
      }
    }),
})
