'use client'

import 'swiper/css/navigation'
import type { TMDBSeries, } from 'types/series'

import Carousel from '~/components/Carousel/Carousel'
import { rockSalt, } from '~/fonts'
import { cn, } from '~/lib/utils'

const TrendingSeries = ({ trendingSeries, }: { trendingSeries: TMDBSeries[] }) => (
  <>
    <h2
      className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
    >
      Trending Series
    </h2>

    <Carousel type='series' data={trendingSeries} />
  </>
)

export default TrendingSeries
