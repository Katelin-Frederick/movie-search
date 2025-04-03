import React from 'react'

import { api, } from '~/trpc/server'
import { rockSalt, } from '~/fonts'
import { cn, } from '~/lib/utils'

import TrendingMovies from './movies'
import TrendingSeries from './series'
import TrendingPeople from './people'


const Trending = async () => {
  const trendingMovies = await api.movies.getTrending()
  const trendingSeries = await api.series.getTrending()
  const trendingPeople = await api.people.getTrending()

  console.log('trendingMovies', trendingMovies)
  console.log('trendingSeries', trendingSeries)
  console.log('trendingPeople', trendingPeople)

  return (
    <>
      <h1
        className={cn('text-3xl md:text-[40px] text-yellow-500 mb-18 text-center', rockSalt.className)}
      >
        Screen Scout
      </h1>

      <div className='mb-16'>
        <TrendingMovies trendingMovies={trendingMovies} />
      </div>

      <div className='mb-16'>
        <TrendingSeries trendingSeries={trendingSeries} />
      </div>

      <div className='mb-16'>
        <TrendingPeople trendingPeople={trendingPeople} />
      </div>
    </>
  )
}

export default Trending