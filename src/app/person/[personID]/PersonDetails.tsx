'use client'

import { useEffect, useState, } from 'react'
import { ImageOff, } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Carousel from '~/components/Carousel/Carousel'
import Button from '~/components/Button/Button'
import { formatDate, cn, } from '~/lib/utils'
import { api, } from '~/trpc/react'
import { rockSalt, } from '~/fonts'

const Spinner = () => (
  <div className='w-full h-full flex flex-col items-center justify-center space-y-4 min-h-screen'>
    <div className='w-8 h-8 border-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin'></div>
    <span className='text-lg'>Loading...</span>
  </div>
)

const PersonDetails = ({ personID, }: { personID: string }) => {
  const [imgError, setImgError] = useState(false)
  const [imgLoading, setImgLoading] = useState(true)
  const [isImageFullyLoaded, setIsImageFullyLoaded] = useState(false)

  const {
    data: personDetails,
    isLoading: isPersonDetailsLoading,
    error: personDetailsError,
  } = api.people.getDetails.useQuery({ id: personID, }, { enabled: !!personID, })

  const {
    data: movieCredits,
    isLoading: isMovieCreditsLoading,
    error: movieCreditsError,
  } = api.people.getMovieCredits.useQuery(
    { id: personID, },
    { enabled: !!personID, }
  )

  const {
    data: tvCredits,
    isLoading: isTvCreditsLoading,
    error: tvCreditsError,
  } = api.people.getTVCredits.useQuery({ id: personID, }, { enabled: !!personID, })

  useEffect(() => {
    if (imgLoading && !isImageFullyLoaded) {
      const timer = setTimeout(() => setIsImageFullyLoaded(true), 500)
      return () => clearTimeout(timer)
    }
  }, [imgLoading, isImageFullyLoaded])

  const isAnyLoading = isPersonDetailsLoading || isMovieCreditsLoading || isTvCreditsLoading

  if (isAnyLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center min-h-screen'>
        <Spinner />
      </div>
    )
  }

  if (personDetailsError) {
    return <div>Error loading person details: {personDetailsError.message}</div>
  }

  if (movieCreditsError) {
    return <div>Error loading movie credits: {movieCreditsError.message}</div>
  }

  if (tvCreditsError) {
    return <div>Error loading series credits: {tvCreditsError.message}</div>
  }

  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-6 text-center md:text-left font-bold'>
        {personDetails?.name}
      </h1>

      <div className='grid grid-cols-[300px_1fr] gap-6 mb-12'>
        <div className='flex flex-col items-center md:items-start'>
          <div className='w-full relative aspect-[2/3]'>
            {imgLoading && !isImageFullyLoaded && <Spinner />}
            {!imgError ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300${personDetails?.profile_path}`}
                alt={personDetails?.name ?? 'Profile image'}
                fill
                className='rounded-sm object-cover'
                onError={() => setImgError(true)}
                onLoadingComplete={() => setImgLoading(false)}
                priority
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-800 text-gray-900 text-sm text-center px-2 rounded-sm'>
                <div className='flex flex-col items-center justify-center'>
                  <ImageOff className='w-8 h-8 mb-2 text-gray-200' />
                  <span className='text-lg font-medium'>
                    No Poster available for {personDetails?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col justify-start space-y-4 max-w-2xl'>
          <ul className='w-full'>
            <li className='bg-gray-800 border-2 border-gray-100 p-4 rounded-t-md'>
              <span className='font-bold'>Birthday:</span> {formatDate(personDetails?.birthday ?? '')}
            </li>

            {personDetails?.deathday && (
              <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
                <span className='font-bold'>Deathday:</span> {formatDate(personDetails?.deathday ?? '')}
              </li>
            )}

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Place of Birth:</span> {personDetails?.place_of_birth}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4 rounded-b-md'>
              <span className='font-bold'>Known For:</span> {personDetails?.known_for_department}
            </li>
          </ul>

          {personDetails?.homepage && (
            <>
              <h2 className='text-xl font-semibold mt-2'>Website:</h2>
              <a
                href={personDetails.homepage}
                target='_blank'
                rel='noopener noreferrer'
                className='text-yellow-500 underline break-words'
              >
                {personDetails.homepage}
              </a>
            </>
          )}

          <a href={`http://imdb.com/name/${personDetails?.imdb_id}`} target='_blank' rel='noopener noreferrer'>
            <Button className='mt-4'>View on IMDB</Button>
          </a>
        </div>
      </div>

      <div className='mb-12'>
        <h2 className='text-3xl mb-4'>Biography</h2>
        <p>{personDetails?.biography}</p>
      </div>

      <div className='mt-12'>
        <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>
          Movie Credits
        </h2>
        <Carousel type='movieCredit' data={movieCredits?.cast ?? []} />
      </div>

      <div className='mt-12'>
        <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>
          TV Credits
        </h2>
        <Carousel type='seriesCredit' data={tvCredits?.cast ?? []} />
      </div>

      <Link href='/'>
        <Button variant='secondary' className='mt-8 mr-4'>
          Back to Search
        </Button>
      </Link>
    </div>
  )
}

export default PersonDetails
