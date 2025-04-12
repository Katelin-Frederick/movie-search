'use client'

import { api, } from '~/trpc/react'

import TrendingMovies from './movies'
import TrendingPeople from './people'
import TrendingSeries from './series'

const Trending = () => {
  const LoadingSpinner = ({ text, }: { text?: string }) => (
    <div className='flex flex-col justify-center items-center mt-4'>
      <div className='w-8 h-8 border-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin' />
      {text && <span className='mt-2'>{text}</span>}
    </div>
  )

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

  if (isLoadingTrendingMovies || isLoadingTrendingSeries || isLoadingTrendingPeople) return (
    <LoadingSpinner text='Loading...' />
  )

  if (trendingMoviesError) return <div>Error: {trendingMoviesError.message} </div>

  if (trendingSeriesError) return <div>Error: {trendingSeriesError.message} </div>

  if (trendingPeopleError) return <div>Error: {trendingPeopleError.message} </div>

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
