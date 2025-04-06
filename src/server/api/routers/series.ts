import axios from 'axios'
import { z, } from 'zod'

import type { TrendingSeriesResponse, ContentRatingsResponse, TMDBSeriesDetails, TMDBSeries, } from '~/types/series'
import type { ExternalIdsResponse, } from '~/types/externalIds'
import type { ProvidersResponse, } from '~/types/providers'

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

  getRating: publicProcedure
    .input(z.object({ id: z.string(), })) // TV Series ID as string
    .query<string>(async (opts) => {
      const { id, } = opts.input

      try {
        // Make the API request to fetch the content ratings for the given TV series
        const response = await axios.get<ContentRatingsResponse>(
          `https://api.themoviedb.org/3/tv/${id}/content_ratings`,
          { params: { api_key: process.env.TMDB_KEY, }, }
        )

        // Log the response to help debug the structure
        console.log('Response data results:', response.data.results)

        // Check if `results` is valid and is an array
        if (!response.data.results || !Array.isArray(response.data.results)) {
          return 'N/A'
        }

        // Find the US release information
        const usRelease = response.data.results.find((item) => item.iso_3166_1 === 'US')
        if (!usRelease) {
          return 'N/A'
        }

        console.log('usRelease: ', usRelease)

        // Return the certification (string)
        return usRelease.rating || 'N/A' // Ensure it defaults to 'N/A' if `rating` is undefined
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching TV series certifications from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching TV series certifications from TMDB')
        }
      }
    }),

  getExternalIds: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<ExternalIdsResponse | null>(async (opts) => {
      const { id, } = opts.input
      try {
        // Make the API request to get external IDs
        const response = await axios.get<ExternalIdsResponse>(
          `${TMDB_API_URL}/tv/${id}/external_ids`,
          { params: { api_key: process.env.TMDB_KEY, }, }
        )

        // Return the data (response from TMDB)
        return response.data
      } catch (error) {
        // Error handling, throwing a more descriptive error message
        if (error instanceof Error) {
          throw new Error(`Error fetching series details from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching series details from TMDB')
        }
      }
    }),

  getProviders: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<string | null>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<ProvidersResponse>(
          `${TMDB_API_URL}/tv/${id}/watch/providers`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              include_adult: false,
            },
          }
        )

        // Extract the provider link for the "US" region, or return null if it's not available
        const providerLink = response.data.results.US?.link ?? null

        return providerLink
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching movie details from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching movie details from TMDB')
        }
      }
    }),
})
