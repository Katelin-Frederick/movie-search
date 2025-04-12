'use client'

import { ImageOff, } from 'lucide-react'
import { useState, } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { formatRuntime, getSubtitle, getDirector, formatDate, getWriter, cn, } from '~/lib/utils'
import Carousel from '~/components/Carousel/Carousel'
import Spinner from '~/components/Spinner/Spinner'
import Button from '~/components/Button/Button'
import { api, } from '~/trpc/react'
import { rockSalt, } from '~/fonts'

const EpisodeDetails = ({
  seriesID,
  seasonNumber,
  episodeNumber,
}: { seriesID: string, seasonNumber: string, episodeNumber: string }) => {
  const {
    data: seriesDetails,
    isLoading: isSeriesDetailsLoading,
    error: seriesDetailsError,
  } = api.series.getDetails.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const {
    data: episodeDetails,
    isLoading: isEpisodeDetailsLoading,
    error: episodeDetailsError,
  } = api.series.getEpisodeDetails.useQuery(
    { seriesId: seriesID, seasonNumber, episodeNumber, },
    { enabled: !!seriesID, }
  )

  const {
    data: episodeCredits,
    isLoading: isEpisodeCreditsLoading,
    error: episodeCreditsError,
  } = api.series.getEpisodeCredits.useQuery(
    { seriesId: seriesID, seasonNumber, episodeNumber, },
    { enabled: !!seriesID, }
  )

  const {
    data: rating,
    isLoading: isRatingLoading,
    error: ratingError,
  } = api.series.getRating.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const [episodeImageError, setEpisodeImageError] = useState<boolean>(false)

  const isAnyLoading = isSeriesDetailsLoading || isEpisodeDetailsLoading || isEpisodeCreditsLoading || isRatingLoading

  if (isAnyLoading) {
    return <Spinner />
  }

  if (seriesDetailsError) {
    return <div>Error loading series details: {seriesDetailsError.message}</div>
  }

  if (episodeDetailsError) {
    return <div>Error loading episode details: {episodeDetailsError.message}</div>
  }

  if (episodeCreditsError) {
    return <div>Error loading episode credits: {episodeCreditsError.message}</div>
  }

  if (ratingError) {
    return <div>Error loading series rating: {ratingError.message}</div>
  }

  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-3 text-center md:text-left font-bold'>{seriesDetails?.name}</h1>
      <p className='mb-3 text-center md:text-left'>{getSubtitle('series', rating ?? 'N/A')}</p>

      <h2 className='text-3xl mb-8 text-center md:text-left font-bold'>Episode</h2>

      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-[450px] h-auto relative self-center md:self-start md:justify-start mb-8 md:mb-0 shrink-0'>
          {episodeImageError || !episodeDetails?.still_path ? (
            <div className='absolute inset-0 flex items-center justify-center text-gray-300 text-sm px-2 text-center bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-800'>
              <div className='flex flex-col items-center'>
                <ImageOff className='w-8 h-8 mb-2 text-gray-500' />
                <span className='text-lg text-gray-800'>
                  No Poster available for {episodeDetails?.name}
                </span>
              </div>
            </div>
          ) : (
            <Image
              src={`https://image.tmdb.org/t/p/w500${episodeDetails?.still_path}`}
              alt={episodeDetails?.name ?? 'Episode Poster'}
              width={500}
              height={750}
              className='object-cover rounded-sm'
              onError={() => setEpisodeImageError(true)}
              loading='lazy'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px'
            />
          )}
        </div>

        <div className='md:ml-6'>
          <h3 className='text-3xl font-bold mb-4'>{`S${episodeDetails?.season_number} E${episodeDetails?.episode_number} - ${episodeDetails?.name}`}</h3>

          <p><span className='font-bold'>Air Date:</span> {formatDate(episodeDetails?.air_date ?? '')}</p>
          <p className='m-0'><span className='font-bold'>Runtime:</span> {formatRuntime(episodeDetails?.runtime ?? 0)}</p>
          <p className='m-0'><span className='font-bold'>Directed By:</span> {getDirector(episodeCredits?.crew ?? [])}</p>
          <p className='m-0'><span className='font-bold'>Written By:</span> {getWriter(episodeDetails?.crew ?? [])}</p>

          <h3 className='text-3xl text-white mt-6'>Overview:</h3>
          <p>{episodeDetails?.overview ?? 'No Episode Overview Available'}</p>
        </div>
      </div>

      <div className='mt-12'>
        <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>
          Cast
        </h2>
        <Carousel type='cast' data={[...episodeCredits?.cast ?? [], ...episodeCredits?.guest_stars ?? []]} />
      </div>

      <div className='flex flex-col md:flex-row'>
        <Link href='/'>
          <Button variant='secondary' className='mt-8 mr-4'>Back to Search</Button>
        </Link>

        <Link href={`/series/${seriesID}/seasons`}>
          <Button className='mt-8'>Back to Season Details</Button>
        </Link>
      </div>
    </div>
  )
}

export default EpisodeDetails
