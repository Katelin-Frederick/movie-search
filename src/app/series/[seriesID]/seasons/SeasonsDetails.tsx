'use client'

import { AccordionTab, Accordion, } from 'primereact/accordion'
import { TabPanel, TabView, } from 'primereact/tabview'
import Link from 'next/link'

import { formatRuntime, getSubtitle, formatDate, } from '~/lib/utils'
import Poster from '~/components/Poster/Poster'
import Button from '~/components/Button/Button'
import { api, } from '~/trpc/react'

const SeasonsDetails = ({ seriesID, }: { seriesID: string }) => {
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

              <div className='w-[200px] h-auto relative self-center md:self-start md:justify-start mt-8 md:mt-0 order-2 md:order-1 shrink-0'>
                <Poster
                  src={`https://image.tmdb.org/t/p/w185/${season?.poster_path}`}
                  alt={seriesDetails?.name ?? ''}
                  fallbackMessage={`No Poster for ${season?.name}`}
                  width={200}
                  height={300}
                  className='rounded-sm'
                />
              </div>
            </div>

            <Accordion className='seriesAccordion mt-12' multiple activeIndex={0}>
              {season?.episodes?.map((episode) => (
                <AccordionTab key={episode.id} header={`S${episode.season_number} E${episode.episode_number} - ${episode.name}`}>
                  <div className='flex flex-col md:flex-row h-[auto]'>
                    <div
                      className='relative self-center md:self-start mb-4 md:mb-0 min-w-[270]'
                    >
                      <Poster
                        src={`https://image.tmdb.org/t/p/w185/${episode?.still_path}`}
                        alt={episode?.name ?? ''}
                        fallbackMessage={`No Poster for ${episode?.name}`}
                        width={270}
                        height={300}
                        cover
                      />
                    </div>

                    <div className=' ml-0 md:ml-6 grow'>
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
        <Link
          href='/'
        >
          <Button variant='secondary' className='mt-8 mr-4'>Back to Search</Button>
        </Link>

        <Link
          href={`/series/${seriesID}`}
        >
          <Button className='mt-8'>Back to Series Details</Button>
        </Link>
      </div>
    </div>
  )
}

export default SeasonsDetails