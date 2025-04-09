'use client'

import Link from 'next/link'

import Carousel from '~/components/Carousel/Carousel'
import Button from '~/components/Button/Button'
import Poster from '~/components/Poster/Poster'
import { formatDate, cn, } from '~/lib/utils'
import { api, } from '~/trpc/react'
import { rockSalt, } from '~/fonts'

const PersonDetails = ({ personID, }: { personID: string }) => {
  const {
    data: personDetails,
    isLoading: isPersonDetailsLoading,
    error: personDetailsError,
  } = api.people.getDetails.useQuery(
    { id: personID, },
    { enabled: !!personID, }
  )

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
  } = api.people.getTVCredits.useQuery(
    { id: personID, },
    { enabled: !!personID, }
  )

  console.log('movieCredits', movieCredits)
  console.log('tvCredits', tvCredits)

  if (isPersonDetailsLoading) {
    return <div>Loading...</div>
  }

  if (personDetailsError) {
    return <div>Error loading movie details: {personDetailsError.message}</div>
  }

  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-3 text-center md:text-left font-bold'>{personDetails?.name}</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        <div className='flex justify-start items-center md:items-start flex-col'>
          <div className='max-w-[350px] w-full relative'>
            <Poster
              src={`https://image.tmdb.org/t/p/w185/${personDetails?.profile_path}`}
              alt={personDetails?.name ?? ''}
              fallbackMessage={`No Poster for ${personDetails?.name}`}
              width={300}
              height={200}
              className='rounded-sm'
            />
          </div>
        </div>

        <div className='flex justify-start items-center my-12 md:my-0 flex-col'>
          <ul>
            <li
              className='bg-gray-800 border-2 border-gray-100 p-4 rounded-t-md'
            >
              <span className='font-bold'>Birthday:</span> {formatDate(personDetails?.birthday ?? '')}
            </li>

            {personDetails?.deathday && (
              <li
                className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
              >
                <span className='font-bold'>Deathday:</span> {formatDate(personDetails?.deathday ?? '')}
              </li>
            )}

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4 rounded-b-md'
            >
              <span className='font-bold'>Place of Birth:</span> {personDetails?.place_of_birth}
            </li>
          </ul>

          {personDetails?.homepage !== '' && personDetails?.homepage !== null && (
            <>
              <h2 className='text-3xl mt-5'>Website:</h2>

              <a
                href={personDetails?.homepage ?? ''}
                target='_blank'
                rel='noopener noreferrer'
                className='text-yellow-500 underline'
              >
                {personDetails?.homepage}
              </a>
            </>
          )}

          <a
            href={`http://imdb.com/name/${personDetails?.imdb_id}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button className='mt-8'>View on IMDB</Button>
          </a>
        </div>

        <div className='md:col-span-2 lg:col-span-1'>
          <h2 className='text-3xl'>Biography:</h2>
          <p>{personDetails?.biography}</p>
        </div>
      </div>

      <div className='mt-12'>
        <h2
          className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
        >
          Movie Credits
        </h2>
        <Carousel type='movieCredit' data={movieCredits?.cast ?? []} />
      </div>

      <div className='mt-12'>
        <h2
          className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
        >
          TV Credits
        </h2>
        <Carousel type='seriesCredit' data={tvCredits?.cast ?? []} />
      </div>

      <Link
        href='/'
      >
        <Button variant='secondary' className='mt-8 mr-4'>Back to Search</Button>
      </Link>
    </div>
  )
}

export default PersonDetails