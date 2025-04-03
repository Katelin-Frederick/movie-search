'use client'


import 'swiper/css/navigation'

import type { TMDBSeries, } from 'types/series'
import type { TMDBPerson, } from 'types/person'
import type { TMDBMovie, } from 'types/movies'

import { Mousewheel, Navigation, Pagination, Autoplay, Keyboard, Virtual, A11y, } from 'swiper/modules'
import { SwiperSlide, Swiper, } from 'swiper/react'

import Series from './CarouselCards/Series'
import Person from './CarouselCards/Person'
import Movie from './CarouselCards/Movie'

interface CarouselProps {
  data: TMDBMovie[] | TMDBSeries[] | TMDBPerson[]
  type?: 'movies' | 'series' | 'people'
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
        {data.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Movie movie={movie as TMDBMovie} />
          </SwiperSlide>
        ))}
      </>
    )}

    {type === 'series' && (
      <>
        {data.map((series) => (
          <SwiperSlide key={series.id}>
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
  </Swiper>
)

export default Carousel