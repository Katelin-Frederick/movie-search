'use client'

import { useRouter, } from 'next/navigation'
import { ImageOff, } from 'lucide-react'
import { useState, } from 'react'
import Image from 'next/image'

import type { CastMember, } from '~/types/credits'

import Button from '~/components/Button/Button'

const Cast = ({ castMember, }: { castMember: CastMember }) => {
  const router = useRouter()
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <div className='flex flex-col h-full w-full max-w-xs bg-gray-800 rounded-lg overflow-hidden'>
      <div className='relative w-full aspect-[2/3] bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-800'>
        {hasImageError || !castMember.profile_path ? (
          <div className='absolute inset-0 flex items-center justify-center text-gray-300 text-sm px-2 text-center bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-800'>
            <div className='flex flex-col items-center'>
              <ImageOff className='w-10 h-10 mb-2 text-gray-500' />
              <span className='text-lg text-gray-800'>{`No image available for ${castMember.name}`}</span>
            </div>
          </div>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
            alt={castMember.name}
            fill
            className='object-cover'
            onError={() => setHasImageError(true)}
          />
        )}
      </div>

      <div className='flex flex-col flex-grow p-4 border-t-5 border-gray-100'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-xl font-semibold text-center'>{castMember.name}</h3>
          <p className='text-center'>{castMember.character}</p>
        </div>

        <div className='mt-auto p-4 flex justify-center'>
          <Button onClick={() => router.push(`/person/${castMember.id}`)}>View Details</Button>
        </div>
      </div>
    </div>
  )
}

export default Cast



// import 'swiper/css/navigation'
// import { useRouter, } from 'next/navigation'

// import type { CastMember, } from '~/types/credits'

// import Button from '~/components/Button/Button'
// import Poster from '~/components/Poster/Poster'
// import { cn, } from '~/lib/utils'

// const Cast = ({ castMember, }: { castMember: CastMember }) => {
//   const router = useRouter()

//   return (
//     <div className='h-full flex flex-col'>
//       <div className={cn('relative w-[270] h-[300] md:w-[300] md:h-[330] xl:w-[280] xl:h-[310] border-b-5 border-yellow-500 flex-none')}>
//         <Poster
//           src={`https://image.tmdb.org/t/p/w185/${castMember.profile_path}`}
//           alt={castMember.name}
//           fallbackMessage={`No Poster for ${castMember.name}`}
//           fill
//           className='rounded-t-sm'
//         />
//       </div>

//       <div className='bg-gray-800 border-3 border-gray-100 border-t-0 px-3 py-4 flex justify-center items-center flex-col w-[270] md:w-[300] xl:w-[280] rounded-b-sm grow h-full shadow-lg shadow-yellow-500'>
//         <p className='text-2xl font-bold'>{castMember.name}</p>

//         <p>{castMember.character}</p>

//         <Button className='mt-4' onClick={() => router.push(`/person/${castMember.id}`)}>View Details</Button>
//       </div>
//     </div>
//   )
// }

// export default Cast