'use client'

import 'swiper/css/navigation'

import type { TMDBPerson, } from 'types/person'

import { useRouter, } from 'next/navigation'

import Button from '~/components/Button/Button'
import Poster from '~/components/Poster/Poster'
import { cn, } from '~/lib/utils'

const Person = ({ person, }: { person: TMDBPerson }) => {
  const router = useRouter()

  return (
    <div className='h-full flex flex-col'>
      <div className={cn('relative w-[270] h-[270] md:w-[300] md:h-[300] xl:w-[280] xl:h-[280] border-b-5 border-yellow-500 flex-none')}>
        <Poster
          src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}
          alt={person.name}
          fallbackMessage={`No Poster for ${person.name}`}
        />
      </div>

      <div className='bg-gray-800 border-3 border-gray-100 border-t-0 px-3 py-4 flex justify-center items-center flex-col w-[270] md:w-[300] xl:w-[280] rounded-b-sm grow h-full shadow-lg shadow-yellow-500'>
        <p>{person.name}</p>

        <Button className='mt-4' onClick={() => router.push(`/person/${person.id}`)}>View Details</Button>
      </div>
    </div>
  )
}

export default Person