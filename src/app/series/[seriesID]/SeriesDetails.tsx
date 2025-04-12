'use client'

import { ImageOff, } from 'lucide-react'
import { useState, } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  getProductionCompanies,
  getProductionCountries,
  getLanguages,
  getSubtitle,
  formatDate,
  cn,
} from '~/lib/utils'
import Carousel from '~/components/Carousel/Carousel'
import Button from '~/components/Button/Button'
import { api, } from '~/trpc/react'
import { rockSalt, } from '~/fonts'

const Spinner = () => (
  <div className='w-full h-full flex flex-col items-center justify-center space-y-4 min-h-screen'>
    <div className='w-8 h-8 border-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin' />
    <span className='text-lg text-gray-600'>Loading...</span>
  </div>
)

const SeriesDetails = ({ seriesID, }: { seriesID: string }) => {
  const [hasImageError, setHasImageError] = useState(false)

  const {
    data: seriesDetails,
    isLoading,
    error: seriesDetailsError,
  } = api.series.getDetails.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const {
    data: externalIds,
    isLoading: isExternalIdsLoading,
    error: externalIdsError,
  } = api.series.getExternalIds.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const {
    data: providers,
    isLoading: isProvidersLoading,
    error: providersError,
  } = api.series.getProviders.useQuery(
    { id: seriesID, },
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

  const {
    data: aggregateCredits,
    isLoading: isAggregateCreditsLoading,
    error: aggregateCreditsError,
  } = api.series.getAggregateCredits.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const {
    data: recommended,
    isLoading: isRecommendedLoading,
    error: recommendedError,
  } = api.series.getRecommended.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const {
    data: similar,
    isLoading: isSimilarLoading,
    error: similarError,
  } = api.series.getSimilar.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const isAnyLoading
    = isLoading
    || isExternalIdsLoading
    || isProvidersLoading
    || isRatingLoading
    || isAggregateCreditsLoading
    || isRecommendedLoading
    || isSimilarLoading

  if (isAnyLoading) {
    return <Spinner />
  }

  if (seriesDetailsError) {
    return <div>Error loading series details: {seriesDetailsError.message}</div>
  }

  const getCreatedBy = () => seriesDetails?.created_by.map((item) => item.name).join(', ')
  const getNetworks = () => seriesDetails?.networks.map((network) => network.name).join(', ')

  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-3 text-center md:text-left font-bold'>
        {seriesDetails?.name}
      </h1>
      <p className='mb-3 text-center md:text-left'>{getSubtitle('series', rating ?? 'N/A')}</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        <div className='flex justify-start items-center md:items-start flex-col'>
          <div className='relative w-full max-w-[350px] aspect-[2/3] bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-800 rounded-sm overflow-hidden'>
            {hasImageError || !seriesDetails?.poster_path ? (
              <div className='absolute inset-0 flex items-center justify-center text-gray-300 text-sm px-2 text-center'>
                <div className='flex flex-col items-center'>
                  <ImageOff className='w-10 h-10 mb-2 text-gray-500' />
                  <span className='text-lg text-gray-800'>
                    No poster available for {seriesDetails?.name}
                  </span>
                </div>
              </div>
            ) : (
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${seriesDetails.poster_path}`}
                  alt={seriesDetails.name ?? ''}
                  fill
                  className='object-cover'
                  onError={() => setHasImageError(true)}
                  loading='lazy'
                  priority={false}
                />
              </div>
            )}
          </div>

          <Button className='my-3'>
            <Link href={`/series/${seriesID}/seasons`}>
              View Seasons
            </Link>
          </Button>
        </div>

        <div className='flex justify-center lg:justify-start items-start my-12 md:my-0'>
          <ul>
            <li className='bg-gray-800 border-2 border-gray-100 p-4 rounded-t-md'>
              <span className='font-bold'>First Air Date:</span> {formatDate(seriesDetails?.first_air_date ?? '')}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Last Air Date:</span> {formatDate(seriesDetails?.last_air_date ?? '')}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Created By:</span> {getCreatedBy()}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Languages:</span> {getLanguages(seriesDetails?.spoken_languages ?? [])}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Seasons:</span> {seriesDetails?.number_of_seasons}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Episodes:</span> {seriesDetails?.number_of_episodes}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Networks:</span> {getNetworks()}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>In Production:</span> {seriesDetails?.in_production ? 'Yes' : 'No'}
            </li>

            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4 rounded-b-md'>
              <span className='font-bold'>Status:</span> {seriesDetails?.status}
            </li>
          </ul>
        </div>

        <div className='md:col-span-2 lg:col-span-1'>
          <div className='flex flex-wrap justify-start lg:justify-center items-center mb-4 w-full'>
            {seriesDetails?.genres.map((genre) => (
              <div
                key={genre.id}
                className='py-1 px-1.5 my-1.5 bg-gray-800 rounded-xl mx-1 flex justify-center items-center text-sm font-bold text-yellow-500 border border-yellow-500'
              >
                {genre.name}
              </div>
            ))}
          </div>

          <h2 className='text-3xl'>Plot:</h2>
          <p>{seriesDetails?.overview}</p>

          <h2 className='text-3xl mt-5'>Tagline:</h2>
          <p>{seriesDetails?.tagline}</p>

          {seriesDetails?.homepage !== '' && (
            <>
              <h2 className='text-3xl mt-5'>Website:</h2>

              <a
                href={seriesDetails?.homepage}
                target='_blank'
                rel='noopener noreferrer'
                className='text-yellow-500 underline'
              >
                {seriesDetails?.homepage}
              </a>
            </>
          )}

          <div className={cn(providers && 'flex flex-wrap')}>
            {providers && (
              <a
                href={providers}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button className='mt-8 mr-4'>Where to Watch</Button>
              </a>
            )}

            <a
              href={`http://imdb.com/title/${externalIds?.imdb_id}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button className='mt-8'>View on IMDB</Button>
            </a>
          </div>
        </div>
      </div>

      <h2 className='text-3xl'>Production Information:</h2>
      <p className='my-3'>
        <span className='font-bold'>Production Companies:</span> {getProductionCompanies(seriesDetails?.production_companies ?? [])}
      </p>
      <p className='my-3'>
        <span className='font-bold'>Production Countries:</span> {getProductionCountries(seriesDetails?.production_countries ?? [])}
      </p>

      <div className='mt-12'>
        <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>
          Cast
        </h2>
        <Carousel type='people' data={aggregateCredits?.cast.slice(0, 20) ?? []} />
      </div>

      {similar?.results && similar.results.length > 0 && (
        <div className='mt-12'>
          <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>
            Similar
          </h2>

          <Carousel type='series' data={similar?.results ?? []} />
        </div>
      )}

      {recommended?.results && recommended.results.length > 0 && (
        <div className='mt-12'>
          <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>
            Recommended
          </h2>

          <Carousel type='series' data={recommended?.results ?? []} />
        </div>
      )}

      <Link href='/'>
        <Button variant='secondary' className='mt-8'>Back to Search</Button>
      </Link>
    </div>
  )
}

export default SeriesDetails
