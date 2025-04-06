'use client'

import 'swiper/css/navigation'
import { useRouter, } from 'next/navigation'

import type { TMDBMovie, } from '~/types/movies'

import Button from '~/components/Button/Button'
import Poster from '~/components/Poster/Poster'

const Movie = ({ movie, }: { movie: TMDBMovie }) => {
  const router = useRouter()

  return (
    <div className='h-full flex flex-col'>
      <div className='relative w-[270] h-[300] md:w-[300] md:h-[330] xl:w-[280] xl:h-[310] border-b-5 border-yellow-500 flex-none'>
        <Poster
          src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          alt={movie.title}
          fallbackMessage={`No Poster for ${movie.title}`}
          fill
          className='rounded-t-sm'
        />
      </div>

      <div className='bg-gray-800 border-3 border-gray-100 border-t-0 px-3 py-4 flex justify-center items-center flex-col w-[270] md:w-[300] xl:w-[280] rounded-b-sm grow h-full shadow-lg shadow-yellow-500'>
        <p className='text-2xl font-bold'>{movie.title}</p>

        <Button className='mt-4' onClick={() => router.push(`/movie/${movie.id}`)}>View Details</Button>
      </div>
    </div>
  )
}

export default Movie
