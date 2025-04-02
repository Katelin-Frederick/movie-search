import { createTRPCRouter, publicProcedure, } from '~/server/api/trpc'

interface TMDBPerson {
  known_for_department: string,
  original_name: string,
  profile_path: string,
  media_type: 'person',
  popularity: number,
  gender: number,
  name: string,
  adult: false,
  id: number,
}

interface TrendingPeopleResponse {
  results: TMDBPerson[]
  total_results: number
  total_pages: number
  page: number
}

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
