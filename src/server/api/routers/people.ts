import type { TrendingPeopleResponse, } from 'types/person'

import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

export const peopleRouter = createTRPCRouter({
  getTrending: publicProcedure.query<TrendingPeopleResponse>(async () => {
    const trendingPeople = await fetch(
      `https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.TMDB_KEY}&include_adult=false`
    )
      .then((response) => response.json())
      .then((data) => data as TrendingPeopleResponse)

    return trendingPeople
  }),
})
