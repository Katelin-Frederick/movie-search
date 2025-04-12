'use client'

import { AccordionTab, Accordion, } from 'primereact/accordion'
import { TabPanel, TabView, } from 'primereact/tabview'
import { ImageOff, } from 'lucide-react'
import { useState, } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { formatRuntime, getSubtitle, formatDate, } from '~/lib/utils'
import Button from '~/components/Button/Button'
import { api, } from '~/trpc/react'

const Spinner = () => (
  <div className='w-full h-full flex flex-col items-center justify-center space-y-4 min-h-screen'>
    <div className='w-8 h-8 border-4 border-t-yellow-500 border-gray-200 rounded-full animate-spin' />
    <span className='text-lg text-gray-600'>Loading...</span>
  </div>
)

const SeasonsDetails = ({ seriesID, }: { seriesID: string }) => {
  const [hasError, setHasError] = useState(false)

  const {
    data: seriesDetails,
    isLoading,
    error: seriesDetailsError,
  } = api.series.getDetails.useQuery(
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

  const seasonNumberList = seriesDetails?.seasons.map((season) => season.season_number)

  const {
    data: seasonDetails,
    isLoading: isSeasonDetailsLoading,
    error: seasonDetailsError,
  } = api.series.getSeasonDetails.useQuery(
    { seriesId: seriesID, seasonNumbers: seasonNumberList ?? [], },
    { enabled: !!seriesID, }
  )

  const isAnyLoading = isLoading || isRatingLoading || isSeasonDetailsLoading

  if (isAnyLoading) {
    return <Spinner />
  }

  if (seriesDetailsError) {
    return <div>Error loading series details: {seriesDetailsError.message}</div>
  }

  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-3 text-center md:text-left font-bold'>
        {seriesDetails?.name}
      </h1>
      <p className='mb-3 text-center md:text-left'>{getSubtitle('series', rating ?? 'N/A')}</p>

      <h2 className='text-3xl mb-8 text-center md:text-left font-bold'>Seasons</h2>

      <TabView scrollable>
        {seasonDetails?.map((season) => (
          <TabPanel key={season.id} header={season.name} className='text-white'>
            <div className='flex flex-col md:flex-row'>
              <div className='order-1 md:order-2 md:ml-6'>
                <h3 className='text-3xl font-bold mb-4'>{season.name}</h3>

                <p><span className='font-bold'>Air Date:</span> {formatDate(season?.air_date ?? '')}</p>
                <p><span className='font-bold'>Episodes:</span> {season?.episodes.length ? season?.episodes.length : 'N/A'}</p>

                <h3 className='text-3xl text-white mt-6'>Overview:</h3>
                <p>{season.overview ? season.overview : 'No Season Overview Available'}</p>
              </div>

              <div className='max-w-[300px] w-full relative'>
                {!hasError ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185/${season?.poster_path}`}
                    alt={season?.name ?? 'Profile image'}
                    width={300}
                    height={450}
                    className='rounded-sm object-cover'
                    priority
                    onError={() => setHasError(true)}
                  />
                ) : (
                  <div className='w-[300px] min-h-[450px] flex items-center justify-center bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-800 text-gray-900 text-sm text-center px-2 rounded-sm'>
                    <div className='flex flex-col items-center justify-center'>
                      <ImageOff className='w-8 h-8 mb-2 text-gray-200' />
                      <span className='text-lg font-medium'>
                        No Poster available
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Accordion className='seriesAccordion mt-12' multiple activeIndex={0}>
              {season?.episodes?.map((episode) => (
                <AccordionTab key={episode.id} header={`S${episode.season_number} E${episode.episode_number} - ${episode.name}`}>
                  <div className='flex flex-col md:flex-row h-[auto]'>
                    <div className='relative max-w-[280px] self-start mb-4 md:mb-0 rounded-sm overflow-hidden'>
                      {episode?.still_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w342/${episode?.still_path}`}
                          alt={episode?.name ?? 'Episode Poster'}
                          width={280}
                          height={420}
                          className='rounded-sm object-contain'
                          loading='lazy'
                        />
                      ) : (
                        <div className='w-[280px] min-h-[280px] flex items-center justify-center bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-800 text-gray-900 text-sm text-center px-2 rounded-sm'>
                          <div className='flex flex-col items-center justify-center'>
                            <ImageOff className='w-8 h-8 mb-2 text-gray-200' />
                            <span className='text-sm font-medium'>
                              No Poster available for {episode?.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='ml-0 md:ml-6 grow'>
                      <Link
                        href={`/series/${seriesID}/seasons/${episode.season_number}/episode/${episode.episode_number}`}
                        className='text-2xl hover:underline hover:text-gray-100'
                      >
                        <h3>
                          <span className='font-bold'>{`S${episode.season_number} E${episode.episode_number}`}</span>{` - ${episode.name}`}
                        </h3>
                      </Link>

                      <p className='m-0'><span className='font-bold'>Air Date:</span> {formatDate(episode.air_date ?? '')}</p>
                      <p className='m-0'><span className='font-bold'>Runtime:</span> {formatRuntime(episode.runtime)}</p>

                      <h3 className='font-bold mt-4'>Overview:</h3>
                      <p className='m-0'>{episode.overview ? episode.overview : 'No Episode Overview Available'}</p>
                    </div>
                  </div>
                </AccordionTab>
              ))}
            </Accordion>
          </TabPanel>
        ))}
      </TabView>

      <div>
        <Link href='/'>
          <Button variant='secondary' className='mt-8 mr-4'>Back to Search</Button>
        </Link>

        <Link href={`/series/${seriesID}`}>
          <Button className='mt-8'>Back to Series Details</Button>
        </Link>
      </div>
    </div>
  )
}

export default SeasonsDetails
