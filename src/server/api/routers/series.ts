import axios, { type AxiosResponse, } from 'axios'
import { z, } from 'zod'

import type { TrendingSeriesResponse, ContentRatingsResponse, EpisodeCreditsResponse, TMDBSeriesDetails, EpisodeDetails, SeasonDetail, TMDBSeries, } from '~/types/series'
import type { RecommendedSeriesResponse, } from '~/types/recommended'
import type { AggregateCreditsResponse, } from '~/types/credits'
import type { ExternalIdsResponse, } from '~/types/externalIds'
import type { SimilarSeriesResponse, } from '~/types/similar'
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
    .input(z.object({ id: z.string(), }))
    .query<string>(async (opts) => {
      const { id, } = opts.input

      try {
        const response = await axios.get<ContentRatingsResponse>(
          `https://api.themoviedb.org/3/tv/${id}/content_ratings`,
          { params: { api_key: process.env.TMDB_KEY, }, }
        )

        if (!response.data.results || !Array.isArray(response.data.results)) {
          return 'N/A'
        }

        const usRelease = response.data.results.find((item) => item.iso_3166_1 === 'US')
        if (!usRelease) {
          return 'N/A'
        }

        return usRelease.rating || 'N/A'
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
        const response = await axios.get<ExternalIdsResponse>(
          `${TMDB_API_URL}/tv/${id}/external_ids`,
          { params: { api_key: process.env.TMDB_KEY, }, }
        )

        return response.data
      } catch (error) {
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
        seriesId: z.string(),
        seasonNumbers: z.array(z.number()),
      })
    )
    .query<SeasonDetail[]>(async (opts) => {
      const { seriesId, seasonNumbers, } = opts.input

      try {
        const seasonDetails: SeasonDetail[] = []

        for (const seasonNumber of seasonNumbers) {
          const response = await axios.get<SeasonDetail>(
            `${TMDB_API_URL}/tv/${seriesId}/season/${seasonNumber}`,
            {
              params: {
                api_key: process.env.TMDB_KEY,
                language: 'en-US',
              },
            }
          )

          seasonDetails.push(response.data)
        }

        return seasonDetails
      } catch (error) {
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
    .input(z.object({ id: z.string(), }))
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
    .input(z.object({ id: z.string(), }))
    .query<RecommendedSeriesResponse>(async (opts) => {
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

        return response.data
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching recommended movies from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching recommended movies from TMDB')
        }
      }
    }),

  getSimilar: publicProcedure
    .input(z.object({ id: z.string(), }))
    .query<SimilarSeriesResponse>(async (opts) => {
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

        return response.data
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching similar shows from TMDB: ${error.message}`)
        } else {
          throw new Error('Error fetching similar shows from TMDB')
        }
      }
    }),

  getEpisodeDetails: publicProcedure
    .input(
      z.object({
        seriesId: z.string(),
        seasonNumber: z.string(),
        episodeNumber: z.string(),
      })
    )
    .query(async (opts) => {
      const { seriesId, seasonNumber, episodeNumber, } = opts.input

      try {
        const response: AxiosResponse<EpisodeDetails> = await axios.get(
          `${TMDB_API_URL}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
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

  getEpisodeCredits: publicProcedure
    .input(
      z.object({
        seriesId: z.string(),
        seasonNumber: z.string(),
        episodeNumber: z.string(),
      })
    )
    .query(async (opts) => {
      const { seriesId, seasonNumber, episodeNumber, } = opts.input

      try {
        const response: AxiosResponse<EpisodeCreditsResponse> = await axios.get(
          `${TMDB_API_URL}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits`,
          {
            params: {
              api_key: process.env.TMDB_KEY,
              language: 'en-US',
            },
          }
        )

        return response.data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw new Error(`Error fetching episode credits from TMDB: ${errorMessage}`)
      }
    }),
})
