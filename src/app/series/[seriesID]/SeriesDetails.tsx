'use client'

import { format, } from 'date-fns'

import Poster from '~/components/Poster/Poster'
import Button from '~/components/Button/Button'
import { api, } from '~/trpc/react'
import { cn, } from '~/lib/utils'

const SeriesDetails = ({ seriesID, }: { seriesID: string }) => {
  const { data: seriesDetails, isLoading, error: seriesDetailsError, } = api.series.getDetails.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const { data: externalIds, isLoading: isExternalIdsLoading, error: externalIdsError, } = api.series.getExternalIds.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const { data: providers, isLoading: isProvidersLoading, error: providersError, } = api.series.getProviders.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const { data: rating, isLoading: isRatingLoading, error: ratingError, } = api.series.getRating.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const getSubtitle = () => {
    let subtitle = 'TV Series'

    if (rating) {
      subtitle = `${subtitle} | ${rating}`
    }

    return subtitle
  }

  const formatDate = (date: string) => {
    if (date === '') {
      return 'N/A'
    }

    const newDate = new Date(date ?? '')

    const formattedDate = format(newDate, 'MMMM dd, yyyy')

    return formattedDate
  }

  const getCreatedBy = () => seriesDetails?.created_by.map((item) => item.name).join(', ')
  const getLanguages = () => seriesDetails?.spoken_languages.map((language) => language.name).join(', ')
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
      <p className='mb-3 text-center md:text-left'>{getSubtitle()}</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        <div className='flex justify-start items-center md:items-start flex-col'>
          <div className='max-w-[350px] w-full relative'>
            <Poster
              src={`https://image.tmdb.org/t/p/w185/${seriesDetails?.poster_path}`}
              alt={seriesDetails?.name ?? ''}
              fallbackMessage={`No Poster for ${seriesDetails?.name}`}
              width={300}
              height={200}
              className='rounded-sm'
            />
          </div>

          <div className='flex flex-wrap max-w-[350px] justify-center items-center mt-4 w-full'>
            {seriesDetails?.genres.map((genre) => (
              <div
                key={genre.id}
                className='py-1 px-1.5 my-1.5 bg-gray-800 rounded-xl mx-1 flex justify-center items-center text-sm font-bold text-yellow-500 border border-yellow-500'
              >
                {genre.name}
              </div>
            ))}
          </div>
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
    </div>
  )
}

export default SeriesDetails