import axios from 'axios'
import { z, } from 'zod'

import type { TrendingSeriesResponse, ContentRatingsResponse, TMDBSeriesDetails, SeasonDetail, TMDBSeries, } from '~/types/series'
import type { RecommendedSeriesResponse, } from '~/types/recommended'
import type { AggregateCreditsResponse, } from '~/types/credits'
import type { ExternalIdsResponse, } from '~/types/externalIds'
import type { SimilarSeriesResponse, } from '~/types/similar'
import type { VideosResponse, Video, } from '~/types/videos'
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

  getSeasonDetails: publicProcedure
    .input(
      z.object({
        seriesId: z.string(), // Series ID as a string
        seasonNumbers: z.array(z.number()), // Array of season numbers
      })
    )
    .query<SeasonDetail[]>(async (opts) => {
      const { seriesId, seasonNumbers, } = opts.input

      try {
        const seasonDetails: SeasonDetail[] = []

        // Fetch season details for each season number
        for (const seasonNumber of seasonNumbers) {
          // Explicitly typing the response as `SeasonDetail`
          const response = await axios.get<SeasonDetail>(
            `${TMDB_API_URL}/tv/${seriesId}/season/${seasonNumber}`,
            {
              params: {
                api_key: process.env.TMDB_KEY,
                language: 'en-US',
              },
            }
          )

          seasonDetails.push(response.data) // `response.data` is now typed as `SeasonDetail`
        }

        return seasonDetails
      } catch (error) {
        // Error handling
        throw new Error('Error fetching series details from TMDB')
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

  getAggregateCredits: publicProcedure
    .input(z.object({ id: z.string(), })) // TV series ID as a string
    .query<AggregateCreditsResponse>(async (opts) => {
      const { id, } = opts.input

      try {
        const response = await axios.get<AggregateCreditsResponse>(
          `${TMDB_API_URL}/tv/${id}/aggregate_credits`,
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

  getRecommended: publicProcedure
    .input(z.object({ id: z.string(), }))  // Input is the TV series ID (string)
    .query<RecommendedSeriesResponse>(async (opts) => {  // Output is the RecommendedSeriesResponse
      const { id, } = opts.input

      try {
        const response = await axios.get<RecommendedSeriesResponse>(
          `${TMDB_API_URL}/tv/${id}/recommendations`,
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

  getSimilar: publicProcedure
    .input(z.object({ id: z.string(), }))  // Input is the TV series ID (string)
    .query<SimilarSeriesResponse>(async (opts) => {  // Output is the SimilarSeriesResponse
      const { id, } = opts.input

      try {
        const response = await axios.get<SimilarSeriesResponse>(
          `${TMDB_API_URL}/tv/${id}/similar`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              include_adult: false,
              language: 'en-US',
            },
          }
        )

        return response.data  // Return the full response (including pagination and similar shows)
      } catch (error) {
        // Error handling: type check to ensure proper error message
        if (error instanceof Error) {
          throw new Error(`Error fetching similar shows from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching similar shows from TMDB')
        }
      }
    }),

  getVideos: publicProcedure
    .input(z.object({ id: z.string(), })) // Input: TV Series ID as a string
    .query<Video[] | []>(async (opts) => { // Output: An array of Video objects or empty array
      const { id, } = opts.input

      try {
        const response = await axios.get<VideosResponse>(
          `${TMDB_API_URL}/tv/${id}/videos`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              include_adult: false,
              language: 'en-US',
            },
          }
        )

        // Filter all videos with a US release
        const usReleases = response.data.results.filter(
          (item) => item.iso_3166_1 === 'US'
        )

        // If no US releases found, return an empty array
        if (usReleases.length === 0) {
          return []
        }

        console.log('US Release Videos: ', usReleases)

        // Return all found US releases
        return usReleases

      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching videos from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching videos from TMDB')
        }
      }
    }),
})
