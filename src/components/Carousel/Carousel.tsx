'use client'

import 'swiper/css/navigation'
import {
  Mousewheel,
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Virtual,
  A11y,
} from 'swiper/modules'
import { SwiperSlide, Swiper, } from 'swiper/react'

import type {
  SeriesCredit as SeriesCreditType,
  MovieCredit as MovieCreditType,
  CastMember,
} from '~/types/credits'
import type { TMDBSeries, } from '~/types/series'
import type { TMDBPerson, } from '~/types/person'
import type { TMDBMovie, } from '~/types/movies'

import SeriesCredit from './CarouselCards/SeriesCredit'
import MovieCredit from './CarouselCards/MovieCredit'
import Series from './CarouselCards/Series'
import Person from './CarouselCards/Person'
import Movie from './CarouselCards/Movie'
import Cast from './CarouselCards/Cast'

interface CarouselProps {
  data:
  | TMDBMovie[]
  | TMDBSeries[]
  | TMDBPerson[]
  | CastMember[]
  | MovieCreditType[]
  | SeriesCreditType[]
  type?:
  | 'movies'
  | 'series'
  | 'people'
  | 'cast'
  | 'movieCredit'
  | 'seriesCredit'
}

const Carousel = ({ type = 'movies', data, }: CarouselProps) => (
  <div className='w-full'>
    <Swiper
      modules={[
        Navigation,
        Pagination,
        A11y,
        Virtual,
        Keyboard,
        Mousewheel,
        Autoplay
      ]}
      slidesPerView={1}
      spaceBetween={20}
      breakpoints={{
        768: { slidesPerView: 2, },
        1024: { slidesPerView: 3, },
        1280: { slidesPerView: 4, },
      }}
      navigation
      pagination={{
        clickable: true,
        type: 'progressbar',
      }}
      rewind
      mousewheel
      keyboard={{ enabled: true, }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      className='w-full'
    >
      {data.map((item, index) => {
        const key = `${item.id}-${index}`

        return (
          <SwiperSlide key={key} className='!h-auto flex items-stretch'>
            <div className='flex justify-center w-full h-full'>
              {type === 'movies' && <Movie movie={item as TMDBMovie} />}
              {type === 'series' && <Series series={item as TMDBSeries} />}
              {type === 'cast' && <Cast castMember={item as CastMember} />}
              {type === 'people' && <Person person={item as TMDBPerson} />}
              {type === 'movieCredit' && <MovieCredit credit={item as MovieCreditType} />}
              {type === 'seriesCredit' && <SeriesCredit credit={item as SeriesCreditType} />}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  </div>
)

export default Carousel
