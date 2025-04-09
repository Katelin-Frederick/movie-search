'use client'

import Link from 'next/link'

import { getSubtitle, formatDate, cn, } from '~/lib/utils'
import Carousel from '~/components/Carousel/Carousel'
import Poster from '~/components/Poster/Poster'
import Button from '~/components/Button/Button'
import { api, } from '~/trpc/react'
import { rockSalt, } from '~/fonts'

const SeriesDetails = ({ seriesID, }: { seriesID: string }) => {
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

  const getCreatedBy = () => seriesDetails?.created_by.map((item) => item.name).join(', ')
  const getLanguages = () => seriesDetails?.spoken_languages.map((language) => language.name).join(', ')
  const getNetworks = () => seriesDetails?.networks.map((network) => network.name).join(', ')
  const getProductionCompanies = () => seriesDetails?.production_companies.map((company) => company.name).join(', ')
  const getProductionCountries = () => seriesDetails?.production_countries.map((country) => country.name).join(', ')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (seriesDetailsError) {
    return <div>Error loading movie details: {seriesDetailsError.message}</div>
  }

  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-3 text-center md:text-left font-bold'>{seriesDetails?.name}</h1>
      <p className='mb-3 text-center md:text-left'>{getSubtitle('series', rating ?? 'N/A')}</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        <div className='flex justify-start items-center md:items-start flex-col'>
          <div className='max-w-[350px] w-full relative'>
            <Poster
              src={`https://image.tmdb.org/t/p/w185/${seriesDetails?.poster_path}`}
              alt={seriesDetails?.name ?? ''}
              fallbackMessage={`No Poster for ${seriesDetails?.name}`}
              width={300}
              height={300}
              className='rounded-sm'
            />
          </div>

          <Button className='my-3'>
            <Link
              href={`/series/${seriesID}/seasons`}
            >
              View Seasons
            </Link>
          </Button>
        </div>

        <div className='flex justify-center lg:justify-start items-start my-12 md:my-0'>
          <ul>
            <li
              className='bg-gray-800 border-2 border-gray-100 p-4 rounded-t-md'
            >
              <span className='font-bold'>First Air Date:</span> {formatDate(seriesDetails?.first_air_date ?? '')}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Last Air Date:</span> {formatDate(seriesDetails?.last_air_date ?? '')}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Created By:</span> {getCreatedBy()}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Languages:</span> {getLanguages()}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Seasons:</span> {seriesDetails?.number_of_seasons}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Episodes:</span> {seriesDetails?.number_of_episodes}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Networks:</span> {getNetworks()}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>In Production:</span> {seriesDetails?.in_production ? 'Yes' : 'No'}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4 rounded-b-md'
            >
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
      <p className='my-3'><span className='font-bold'>Production Companies:</span> {getProductionCompanies()}</p>
      <p className='my-3'><span className='font-bold'>Production Countries:</span> {getProductionCountries()}</p>

      <div className='mt-12'>
        <h2
          className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
        >
          Cast
        </h2>
        <Carousel type='people' data={aggregateCredits?.cast.slice(0, 20) ?? []} />
      </div>

      {similar?.results && similar.results.length > 0 && (
        <div className='mt-12'>
          <h2
            className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
          >
            Similar
          </h2>

          <Carousel type='series' data={similar?.results ?? []} />
        </div>
      )}

      {recommended?.results && recommended.results.length > 0 && (
        <div className='mt-12'>
          <h2
            className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
          >
            Recommended
          </h2>

          <Carousel type='series' data={recommended?.results ?? []} />
        </div>
      )}

      <Link
        href='/'
      >
        <Button variant='secondary' className='mt-8'>Back to Search</Button>
      </Link>
    </div>
  )
}

export default SeriesDetails