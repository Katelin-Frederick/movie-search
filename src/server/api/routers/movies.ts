import axios, { AxiosError, } from 'axios'
import { z, } from 'zod'

import type { RecommendedMoviesResponse, } from '~/types/recommended'
import type { CollectionResponse, } from '~/types/collections'
import type { ProvidersResponse, } from '~/types/providers'
import type { CreditsResponse, } from '~/types/credits'

import { type TrendingMoviesResponse, type ReleaseDateResponse, type TMDBMovieDetails, type TMDBMovie, } from '~/types/movies'
import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export const movieRouter = createTRPCRouter({
  getTrending: publicProcedure.query<TMDBMovie[]>(async () => {
    try {
      const response = await axios.get<TrendingMoviesResponse>(
        `${TMDB_API_URL}/trending/movie/day`,
        {
          params: {
            api_key: process.env.TMDB_KEY,
            include_adult: false,
          },
        }
      )

      return response.data.results
    } catch (error) {
      throw new Error('Error fetching trending movies from TMDB')
    }
  }),

  getDetails: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<TMDBMovieDetails>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<TMDBMovieDetails>(
          `${TMDB_API_URL}/movie/${id}`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              language: 'en-US',
              include_adult: false,
            },
          }
        )

        return response.data
      } catch (error) {
        throw new Error('Error fetching movie details from TMDB')
      }
    }),

  getRating: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<string>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<ReleaseDateResponse>(
          `${TMDB_API_URL}/movie/${id}/release_dates`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              language: 'en-US',
              include_adult: false,
            },
          }
        )

        if (!response.data.results || !Array.isArray(response.data.results)) {
          return 'N/A'
        }

        // Find the US release date
        const usRelease = response.data.results.find((item) => item.iso_3166_1 === 'US')
        if (!usRelease) {
          return 'N/A'
        }

        // Find the valid certification for the US release
        const usRating = usRelease.release_dates.find((item) => item.note === '')
        if (!usRating) {
          return 'N/A'
        }

        return usRating.certification  // Return the certification (string)
      } catch (error) {
        if (error instanceof AxiosError) {
          // Handle Axios-specific error
          throw new Error(`Error fetching movie rating from TMDB: ${error.message}`)
        } else if (error instanceof Error) {
          // Handle general error
          throw new Error('Error fetching movie rating from TMDB: ' + error.message)
        } else {
          // In case of an unknown error, handle accordingly
          throw new Error('An unexpected error occurred.')
        }
      }
    }),

  getCredits: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<CreditsResponse>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<CreditsResponse>(
          `${TMDB_API_URL}/movie/${id}/credits`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              language: 'en-US',
              include_adult: false,
            },
          }
        )

        return response.data
      } catch (error) {
        throw new Error('Error fetching movie details from TMDB')
      }
    }),

  getProviders: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<string | null>(async (opts) => {
      const { id, } = opts.input
      try {
        const response = await axios.get<ProvidersResponse>(
          `${TMDB_API_URL}/movie/${id}/watch/providers`,
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

  getCollection: publicProcedure
    .input(z.object({ collectionId: z.union([z.number(), z.null()]), }))
    .query<CollectionResponse | null>(async (opts) => {
      const { collectionId, } = opts.input
      try {
        if (collectionId === null) {
          return null // Return null if collectionId is null
        }

        const response = await axios.get<CollectionResponse>(
          `${TMDB_API_URL}/collection/${collectionId}`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              include_adult: false,
            },
          }
        )

        return response.data
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching collection details from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching collection details from TMDB')
        }
      }
    }),

  getRecommended: publicProcedure
    .input(z.object({ id: z.string(), }))  // Input is the movie ID (string)
    .query<RecommendedMoviesResponse>(async (opts) => {  // Output is the RecommendedMoviesResponse
      const { id, } = opts.input
      try {
        const response = await axios.get<RecommendedMoviesResponse>(
          `${TMDB_API_URL}/movie/${id}/recommendations`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              include_adult: false,
              language: 'en-US',
            },
          }
        )

        return response.data  // Return the full response (including pagination and recommended movies)
      } catch (error) {
        // Error handling: type check to ensure proper error message
        if (error instanceof Error) {
          throw new Error(`Error fetching recommended movies from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching recommended movies from TMDB')
        }
      }
    }),
})
