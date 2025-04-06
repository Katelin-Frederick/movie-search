'use client'


import 'swiper/css/navigation'

import type { TMDBPerson, } from 'types/person'

import Carousel from '~/components/Carousel/Carousel'
import { rockSalt, } from '~/fonts'
import { cn, } from '~/lib/utils'

const TrendingPeople = ({ trendingPeople, }: { trendingPeople: TMDBPerson[] }) => (
  <>
    <h2
      className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
    >
      Trending People
    </h2>

    <Carousel type='people' data={trendingPeople} />
  </>
)

export default TrendingPeople
