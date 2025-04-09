import axios from 'axios'
import { z, } from 'zod'

import type { TrendingPeopleResponse, TMDBPersonDetails, TMDBPerson, } from '~/types/person'
import type { AggregateCreditsResponse, CreditsResponse, } from '~/types/credits'

import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export const peopleRouter = createTRPCRouter({
  getTrending: publicProcedure.query<TMDBPerson[]>(async () => {
    try {
      const response = await axios.get<TrendingPeopleResponse>(
        `${TMDB_API_URL}/trending/person/day`,
        {
          params: {
            api_key: process.env.TMDB_KEY,
            include_adult: false,
          },
        }
      )

      return response.data.results
    } catch (error) {
      throw new Error('Error fetching trending people from TMDB')
    }
  }),

  getDetails: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<TMDBPersonDetails>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<TMDBPersonDetails>(
          `${TMDB_API_URL}/person/${id}`,
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

  getMovieCredits: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<CreditsResponse>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<CreditsResponse>(
          `${TMDB_API_URL}/person/${id}/movie_credits`,
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

  getTVCredits: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<AggregateCreditsResponse>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<AggregateCreditsResponse>(
          `${TMDB_API_URL}/person/${id}/tv_credits`,
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
