import React from 'react'

import type { TMDBSearchItem, DisplayType, } from '~/types/search'
import type { TMDBPerson, } from '~/types/person'
import type { TMDBSeries, } from '~/types/series'
import type { TMDBMovie, } from '~/types/movies'

import Person from '~/components/Carousel/CarouselCards/Person'
import Series from '~/components/Carousel/CarouselCards/Series'
import Movie from '~/components/Carousel/CarouselCards/Movie'

const CardDisplay = ({ displayType, displayData, page, }: { displayType: DisplayType, displayData: TMDBSearchItem[], page: number }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12'>
    {displayType === 'multi' && displayData?.map((item, index) => {
      const key = `${item.media_type}-${item.id}-page-${page}-${index}`

      return (
        <React.Fragment key={key}>
          {item.media_type === 'movie' && (
            <div className='relative'>
              <div className='absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded z-10 shadow'>
                Movie
              </div>
              <Movie movie={item as TMDBMovie} />
            </div>
          )}

          {item.media_type === 'tv' && (
            <div className='relative'>
              <div className='absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow'>
                TV Show
              </div>
              <Series series={item as TMDBSeries} />
            </div>
          )}

          {item.media_type === 'person' && (
            <div className='relative'>
              <div className='absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow'>
                Person
              </div>
              <Person person={item as unknown as TMDBPerson} />
            </div>
          )}
        </React.Fragment>
      )
    })}

    {displayType === 'movie' && displayData?.map((movie) => (
      <Movie key={movie.id} movie={movie as TMDBMovie} />
    ))}

    {displayType === 'tv' && displayData?.map((series) => (
      <Series key={series.id} series={series as TMDBSeries} />
    ))}

    {displayType === 'person' && displayData?.map((person) => (
      <Person key={person.id} person={person as unknown as TMDBPerson} />
    ))}
  </div>
)

export default CardDisplay