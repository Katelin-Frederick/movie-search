'use client'

import 'swiper/css/navigation'
import { Mousewheel, Navigation, Pagination, Autoplay, Keyboard, Virtual, A11y, } from 'swiper/modules'
import { SwiperSlide, Swiper, } from 'swiper/react'

import type { SeriesCredit as SeriesCreditType, MovieCredit as MovieCreditType, CastMember, } from '~/types/credits'
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
  data: TMDBMovie[] | TMDBSeries[] | TMDBPerson[] | CastMember[] | MovieCreditType[] | SeriesCreditType[]
  type?: 'movies' | 'series' | 'people' | 'cast' | 'movieCredit' | 'seriesCredit'
}

const Carousel = ({ type = 'movies', data, }: CarouselProps) => (
  <Swiper
    modules={[Navigation, Pagination, A11y, Virtual, Keyboard, Mousewheel, Autoplay]}
    slidesPerView={1}
    effect='coverflow'
    coverflowEffect={{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    }}
    breakpoints={{
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
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
  >
    {type === 'movies' && (
      <>
        {data.map((movie, index) => (
          <SwiperSlide key={`${movie.id}-${index}`}>
            <Movie movie={movie as TMDBMovie} />
          </SwiperSlide>
        ))}
      </>
    )}

    {type === 'series' && (
      <>
        {data.map((series, index) => (
          <SwiperSlide key={`${series.id}-${index}`}>
            <Series series={series as TMDBSeries} />
          </SwiperSlide>
        ))}
      </>
    )}

    {type === 'people' && (
      <>
        {data.map((person) => (
          <SwiperSlide key={person.id}>
            <Person person={person as TMDBPerson} />
          </SwiperSlide>
        ))}
      </>
    )}

    {type === 'cast' && (
      <>
        {data.map((castMember) => (
          <SwiperSlide key={castMember.id}>
            <Cast castMember={castMember as CastMember} />
          </SwiperSlide>
        ))}
      </>
    )}

    {type === 'movieCredit' && (
      <>
        {data.map((credit) => (
          <SwiperSlide key={credit.id}>
            <MovieCredit credit={credit as MovieCreditType} />
          </SwiperSlide>
        ))}
      </>
    )}

    {type === 'seriesCredit' && (
      <>
        {data.map((credit) => (
          <SwiperSlide key={credit.id}>
            <SeriesCredit credit={credit as SeriesCreditType} />
          </SwiperSlide>
        ))}
      </>
    )}
  </Swiper>
)

export default Carousel