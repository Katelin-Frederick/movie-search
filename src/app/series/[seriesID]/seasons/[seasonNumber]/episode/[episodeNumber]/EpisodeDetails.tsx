'use client'

import { addDays, format, } from 'date-fns'

import Carousel from '~/components/Carousel/Carousel'
import Poster from '~/components/Poster/Poster'
import { api, } from '~/trpc/react'
import { rockSalt, } from '~/fonts'
import { cn, } from '~/lib/utils'

const EpisodeDetails = ({
  seriesID,
  seasonNumber,
  episodeNumber,
}: { seriesID: string, seasonNumber: string, episodeNumber: string }) => {
  console.log('seriesID', seriesID)
  console.log('seasonNumber', seasonNumber)
  console.log('episodeNumber', episodeNumber)

  const { data: seriesDetails, isLoading, error: seriesDetailsError, } = api.series.getDetails.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const { data: episodeDetails, isLoading: isEpisodeDetailsLoading, error: episodeDetailsError, } = api.series.getEpisodeDetails.useQuery(
    { seriesId: seriesID, seasonNumber, episodeNumber, },
    { enabled: !!seriesID, }
  )

  const { data: episodeCredits, isLoading: isEpisodeCreditsLoading, error: episodeCreditsError, } = api.series.getEpisodeCredits.useQuery(
    { seriesId: seriesID, seasonNumber, episodeNumber, },
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

  const {
    data: aggregateCredits,
    isLoading: isAggregateCreditsLoading,
    error: aggregateCreditsError,
  } = api.series.getAggregateCredits.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const {
    data: recommendations,
    isLoading: isRecommendationsLoading,
    error: recommendationsError,
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

  const {
    data: videos,
    isLoading: isVideosLoading,
    error: videosError,
  } = api.series.getVideos.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  const seasonNumberList = seriesDetails?.seasons.map((season) => season.season_number)

  const { data: seasonDetails, isLoading: isSeasonDetailsLoading, error: seasonDetailsError, } = api.series.getSeasonDetails.useQuery(
    { seriesId: seriesID, seasonNumbers: seasonNumberList ?? [], },
    { enabled: !!seriesID, }
  )

  console.log('episodeCredits', episodeCredits)

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

    const newDate = new Date(addDays(new Date(date ?? ''), 1))

    const formattedDate = format(newDate, 'MMMM dd, yyyy')

    return formattedDate
  }

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor((runtime ?? 0) / 60)
    const remainingMinutes = (runtime ?? 0) % 60

    if (hours !== 0) {
      return `${hours}h ${remainingMinutes}m`
    }

    return `${remainingMinutes}m`
  }

  const getDirector = () => episodeDetails?.crew.filter((person) => person.job === 'Director').map((person) => person.name).join(', ')
  const getWriter = () => episodeDetails?.crew.filter((person) => person.job === 'Writer' || person.job === 'Story' || person.job === 'Screenplay').map((person) => person.name).join(', ')

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
      <p className='mb-3 text-center md:text-left'>{getSubtitle()}</p>

      <h2 className='text-3xl mb-8 text-center md:text-left font-bold'>Episode</h2>

      <div className='flex flex-col md:flex-row'>
        <div className='w-[300px] h-auto relative self-center md:self-start md:justify-start mb-8 md:mb-0 shrink-0'>
          <Poster
            src={`https://image.tmdb.org/t/p/w185/${episodeDetails?.still_path}`}
            alt={episodeDetails?.name ?? ''}
            fallbackMessage={`No Poster for ${seriesDetails?.name}`}
            width={300}
            height={300}
            className='rounded-sm'
          />
        </div>

        <div className='md:ml-6'>
          <h3 className='text-3xl font-bold mb-4'>{`S${episodeDetails?.season_number} E${episodeDetails?.episode_number} - ${episodeDetails?.name}`}</h3>

          <p><span className='font-bold'>Air Date:</span> {formatDate(episodeDetails?.air_date ?? '')}</p>
          <p className='m-0'><span className='font-bold'>Runtime:</span> {formatRuntime(episodeDetails?.runtime ?? 0)}</p>
          <p className='m-0'><span className='font-bold'>Directed By:</span> {getDirector()}</p>
          <p className='m-0'><span className='font-bold'>Written By:</span> {getWriter()}</p>

          <h3 className='text-3xl text-white mt-6'>Overview:</h3>
          <p>{episodeDetails?.overview ?? 'No Episode Overview Available'}</p>
        </div>
      </div>

      <div className='mt-12'>
        <h2
          className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
        >
          Cast
        </h2>
        <Carousel type='cast' data={[...episodeCredits?.cast ?? [], ...episodeCredits?.guest_stars ?? []]} />
      </div>
    </div>
  )
}

export default EpisodeDetails