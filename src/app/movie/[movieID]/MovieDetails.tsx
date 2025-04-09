'use client'

import Link from 'next/link'

import { getSubtitle, formatMoney, getDirector, formatDate, cn, } from '~/lib/utils'
import Carousel from '~/components/Carousel/Carousel'
import Button from '~/components/Button/Button'
import Poster from '~/components/Poster/Poster'
import { api, } from '~/trpc/react'
import { rockSalt, } from '~/fonts'

const MovieDetails = ({ movieID, }: { movieID: string }) => {
  const {
    data: movieDetails,
    isLoading: isMovieDetailsLoading,
    error: movieDetailsError,
  } = api.movies.getDetails.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  const {
    data: rating,
    isLoading: isRatingLoading,
    error: ratingError,
  } = api.movies.getRating.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  const {
    data: credits,
    isLoading: isCreditsLoading,
    error: creditsError,
  } = api.movies.getCredits.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  const {
    data: providers,
    isLoading: isProvidersLoading,
    error: providersError,
  } = api.movies.getProviders.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  const {
    data: collection,
    isLoading: isCollectionLoading,
    error: collectionError,
  } = api.movies.getCollection.useQuery(
    { collectionId: movieDetails?.belongs_to_collection?.id ?? null, },
    { enabled: !!movieID, }
  )

  const {
    data: similar,
    isLoading: isSimilarLoading,
    error: SimilarError,
  } = api.movies.getSimilar.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  const {
    data: recommended,
    isLoading: isRecommendedLoading,
    error: RecommendedError,
  } = api.movies.getRecommended.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  if (isMovieDetailsLoading
    || isRatingLoading
    || isCreditsLoading
    || isProvidersLoading
    || isCollectionLoading
    || isRecommendedLoading
  ) {
    return <div>Loading...</div>
  }

  if (movieDetailsError) {
    return <div>Error loading movie details: {movieDetailsError.message}</div>
  }

  const getWriter = () => credits?.crew.filter((person) => person.job === 'Writer' || person.job === 'Story' || person.job === 'Screenplay').map((person) => person.name).join(', ')
  const getProducers = () => credits?.crew.filter((person) => person.job === 'Executive Producer' || person.job === 'Producer').map((person) => person.name).join(', ')
  const getLanguages = () => movieDetails?.spoken_languages.map((language) => language.name).join(', ')
  const getProductionCompanies = () => movieDetails?.production_companies.map((company) => company.name).join(', ')
  const getProductionCountries = () => movieDetails?.production_countries.map((country) => country.name).join(', ')

  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-3 text-center md:text-left font-bold'>{movieDetails?.title}</h1>
      <p className='mb-3 text-center md:text-left'>{getSubtitle('movie', rating ?? 'N/A')}</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        <div className='flex justify-start items-center md:items-start flex-col'>
          <div className='max-w-[350px] w-full relative'>
            <Poster
              src={`https://image.tmdb.org/t/p/w185/${movieDetails?.poster_path}`}
              alt={movieDetails?.title ?? ''}
              fallbackMessage={`No Poster for ${movieDetails?.title}`}
              width={300}
              height={200}
              className='rounded-sm'
            />
          </div>
        </div>

        <div className='flex justify-center items-start my-12 md:my-0'>
          <ul>
            <li
              className='bg-gray-800 border-2 border-gray-100 p-4 rounded-t-md'
            >
              <span className='font-bold'>Released:</span> {formatDate(movieDetails?.release_date ?? '')}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Director:</span> {getDirector(credits?.crew ?? [])}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Writen By:</span> {getWriter() === '' ? 'N/A' : getWriter()}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Languages:</span> {getLanguages()}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Budget:</span> {formatMoney(movieDetails?.budget ?? 0)}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Revenue:</span> {formatMoney(movieDetails?.revenue ?? 0)}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4 rounded-b-md'
            >
              <span className='font-bold'>Status:</span> {movieDetails?.status}
            </li>
          </ul>
        </div>

        <div className='md:col-span-2 lg:col-span-1'>
          <div className='flex flex-wrap max-w-[350px] justify-center items-center mb-4 w-full'>
            {movieDetails?.genres.map((genre) => (
              <div
                key={genre.id}
                className='py-1 px-1.5 my-1.5 bg-gray-800 rounded-xl mx-1 flex justify-center items-center text-sm font-bold text-yellow-500 border border-yellow-500'
              >
                {genre.name}
              </div>
            ))}
          </div>

          <h2 className='text-3xl'>Plot:</h2>
          <p>{movieDetails?.overview}</p>

          <h2 className='text-3xl mt-5'>Tagline:</h2>
          <p>{movieDetails?.tagline}</p>

          {movieDetails?.homepage !== '' && (
            <>
              <h2 className='text-3xl mt-5'>Website:</h2>

              <a
                href={movieDetails?.homepage}
                target='_blank'
                rel='noopener noreferrer'
                className='text-yellow-500 underline'
              >
                {movieDetails?.homepage}
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
              href={`http://imdb.com/title/${movieDetails?.imdb_id}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button className='mt-8'>View on IMDB</Button>
            </a>
          </div>
        </div>
      </div>

      <h2 className='text-3xl'>Production Information:</h2>
      <p className='my-3'><span className='font-bold'>Producers:</span> {getProducers()}</p>
      <p className='my-3'><span className='font-bold'>Production Companies:</span> {getProductionCompanies()}</p>
      <p className='my-3'><span className='font-bold'>Production Countries:</span> {getProductionCountries()}</p>

      <div className='mt-12'>
        <h2
          className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
        >
          Cast
        </h2>
        <Carousel type='cast' data={credits?.cast ?? []} />
      </div>

      {collection !== null && (
        <div className='mt-12'>
          <h2
            className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
          >
            {collection?.name}
          </h2>

          <p className='mb-4'>{collection?.overview}</p>

          <Carousel data={collection?.parts ?? []} />
        </div>
      )}

      {similar?.results && similar.results.length > 0 && (
        <div className='mt-12'>
          <h2
            className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
          >
            Similar
          </h2>

          <Carousel data={similar?.results ?? []} />
        </div>
      )}

      {recommended?.results && recommended.results.length > 0 && (
        <div className='mt-12'>
          <h2
            className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}
          >
            Recommended
          </h2>

          <Carousel data={recommended?.results ?? []} />
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

export default MovieDetails