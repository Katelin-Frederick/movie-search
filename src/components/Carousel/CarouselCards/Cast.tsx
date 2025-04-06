'use client'

import 'swiper/css/navigation'
import { useRouter, } from 'next/navigation'

import type { CastMember, } from '~/types/credits'

import Button from '~/components/Button/Button'
import Poster from '~/components/Poster/Poster'
import { cn, } from '~/lib/utils'

const Cast = ({ castMember, }: { castMember: CastMember }) => {
  const router = useRouter()

  return (
    <div className='h-full flex flex-col'>
      <div className={cn('relative w-[270] h-[300] md:w-[300] md:h-[330] xl:w-[280] xl:h-[310] border-b-5 border-yellow-500 flex-none')}>
        <Poster
          src={`https://image.tmdb.org/t/p/w185/${castMember.profile_path}`}
          alt={castMember.name}
          fallbackMessage={`No Poster for ${castMember.name}`}
          fill
          className='rounded-t-sm'
        />
      </div>

      <div className='bg-gray-800 border-3 border-gray-100 border-t-0 px-3 py-4 flex justify-center items-center flex-col w-[270] md:w-[300] xl:w-[280] rounded-b-sm grow h-full shadow-lg shadow-yellow-500'>
        <p className='text-2xl font-bold'>{castMember.name}</p>

        <p>{castMember.character}</p>

        <Button className='mt-4' onClick={() => router.push(`/person/${castMember.id}`)}>View Details</Button>
      </div>
    </div>
  )
}

export default Cast