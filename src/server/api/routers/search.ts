import axios, { type AxiosResponse, } from 'axios'
import { z, } from 'zod'

import type { TMDBSearchResult, } from '~/types/search'

import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export const searchRouter = createTRPCRouter({
  getSearchResults: publicProcedure
    .input(
      z.object({
        searchType: z.union([z.literal('movie'), z.literal('tv'), z.literal('person'), z.literal('multi')]),
        searchValue: z.string(),
        year: z.number().optional(),
      })
    )
    .mutation(async (opts) => {
      const { searchType, searchValue, year, } = opts.input

      try {
        const params: Record<string, unknown> = {
          api_key: process.env.TMDB_KEY,
          language: 'en-US',
          include_adult: false,
          query: searchValue,
        }

        if (year) {
          params.year = year
        }

        const response: AxiosResponse<TMDBSearchResult> = await axios.get(
          `${TMDB_API_URL}/search/${searchType}`,
          { params, }
        )

        const data = response.data

        return data
      } catch (error) {
        throw new Error('Error fetching series details from TMDB')
      }
    }),
})