import axios, { AxiosError, } from 'axios'
import { z, } from 'zod'

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
          throw new Error('Unexpected response format: Expected an array of release dates in `results`')
        }

        // Find the US release date
        const usRelease = response.data.results.find((item) => item.iso_3166_1 === 'US')
        if (!usRelease) {
          throw new Error('US release date not found')
        }

        // Find the valid certification for the US release
        const usRating = usRelease.release_dates.find((item) => item.note === '')
        if (!usRating) {
          throw new Error('No valid certification found for the US release')
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
    .input(z.object({ id: z.string(), }))  // Input validation for movie ID
    .query<CreditsResponse>(async (opts) => {  // Return type is CreditsResponse
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

        // Return the credits response
        return response.data
      } catch (error) {
        throw new Error('Error fetching movie details from TMDB')
      }
    }),
})
