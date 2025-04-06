'use client'

import type { TMDBMovie, } from 'types/movies'

import 'swiper/css/navigation'

import Carousel from '~/components/Carousel/Carousel'
import { rockSalt, } from '~/fonts'
import { cn, } from '~/lib/utils'

const TrendingMovies = ({ trendingMovies, }: { trendingMovies: TMDBMovie[] }) => {
  console.log('trendingMovies', trendingMovies)

  return (
    <>
      <h2
        className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
      >
        Trending Movies
      </h2>

      <Carousel data={trendingMovies} />
    </>
  )
}

export default TrendingMovies
