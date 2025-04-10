'use client'

import { api, } from '~/trpc/react'

import TrendingMovies from './movies'
import TrendingPeople from './people'
import TrendingSeries from './series'

const Trending = () => {

  const {
    data: trendingMovies,
    isLoading: isLoadingTrendingMovies,
    error: trendingMoviesError,
  } = api.movies.getTrending.useQuery()

  const {
    data: trendingSeries,
    isLoading: isLoadingTrendingSeries,
    error: trendingSeriesError,
  } = api.series.getTrending.useQuery()

  const {
    data: trendingPeople,
    isLoading: isLoadingTrendingPeople,
    error: trendingPeopleError,
  } = api.people.getTrending.useQuery()

  if (isLoadingTrendingMovies || isLoadingTrendingSeries || isLoadingTrendingPeople) return <div>Loading...</div>
  if (trendingMoviesError) return <div>Error: {trendingMoviesError.message} </div>

  return (
    <>
      <div className='mb-16'>
        <TrendingMovies trendingMovies={trendingMovies!} />
      </div>

      <div className='mb-16'>
        <TrendingSeries trendingSeries={trendingSeries!} />
      </div>

      <div className='mb-16'>
        <TrendingPeople trendingPeople={trendingPeople!} />
      </div>
    </>
  )
}

export default Trending
