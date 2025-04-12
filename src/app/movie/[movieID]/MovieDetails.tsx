'use client'

import { ImageOff, } from 'lucide-react'
import { useState, } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import {
  getProductionCompanies,
  getProductionCountries,
  formatRuntime,
  getLanguages,
  getSubtitle,
  formatMoney,
  getDirector,
  getProducer,
  formatDate,
  getWriter,
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

const MovieDetails = ({ movieID, }: { movieID: string }) => {
  const [hasImageError, setHasImageError] = useState(false)

  const {
    data: movieDetails,
    isLoading: isMovieDetailsLoading,
    error: movieDetailsError,
  } = api.movies.getDetails.useQuery({ id: movieID, }, { enabled: !!movieID, })

  const {
    data: rating,
    isLoading: isRatingLoading,
    error: ratingError,
  } = api.movies.getRating.useQuery({ id: movieID, }, { enabled: !!movieID, })

  const {
    data: credits,
    isLoading: isCreditsLoading,
    error: creditsError,
  } = api.movies.getCredits.useQuery({ id: movieID, }, { enabled: !!movieID, })

  const {
    data: providers,
    isLoading: isProvidersLoading,
    error: providersError,
  } = api.movies.getProviders.useQuery({ id: movieID, }, { enabled: !!movieID, })

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
    error: similarError,
  } = api.movies.getSimilar.useQuery({ id: movieID, }, { enabled: !!movieID, })

  const {
    data: recommended,
    isLoading: isRecommendedLoading,
    error: recommendedError,
  } = api.movies.getRecommended.useQuery({ id: movieID, }, { enabled: !!movieID, })

  const isAnyLoading
    = isMovieDetailsLoading
    || isRatingLoading
    || isCreditsLoading
    || isProvidersLoading
    || isCollectionLoading
    || isRecommendedLoading
    || isSimilarLoading

  if (isAnyLoading) {
    return <Spinner />
  }

  if (movieDetailsError) {
    return <div>Error loading movie details: {movieDetailsError.message}</div>
  }

  if (ratingError) {
    return <div>Error loading movie rating: {ratingError.message}</div>
  }

  if (creditsError) {
    return <div>Error loading movie credits: {creditsError.message}</div>
  }

  if (providersError) {
    return <div>Error loading providers: {providersError.message}</div>
  }

  if (collectionError) {
    return <div>Error loading movie collections: {collectionError.message}</div>
  }

  if (similarError) {
    return <div>Error loading similar movies: {similarError.message}</div>
  }

  if (recommendedError) {
    return <div>Error loading recommended movies: {recommendedError.message}</div>
  }

  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl mb-3 text-center md:text-left font-bold'>
        {movieDetails?.title}
      </h1>
      <p className='mb-3 text-center md:text-left'>
        {getSubtitle('movie', rating ?? 'N/A')}
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        <div className='flex justify-start items-center md:items-start flex-col'>
          <div className='relative w-full max-w-[350px] aspect-[2/3] bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-800 rounded-sm overflow-hidden'>
            {hasImageError || !movieDetails?.poster_path ? (
              <div className='absolute inset-0 flex items-center justify-center text-gray-300 text-sm px-2 text-center'>
                <div className='flex flex-col items-center'>
                  <ImageOff className='w-10 h-10 mb-2 text-gray-500' />
                  <span className='text-lg text-gray-800'>
                    No image available for {movieDetails?.title}
                  </span>
                </div>
              </div>
            ) : (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title ?? ''}
                fill
                className='object-cover transition-opacity duration-500'
                onError={() => setHasImageError(true)}
              />
            )}
          </div>
        </div>

        <div className='flex justify-center items-start my-12 md:my-0'>
          <ul>
            <li className='bg-gray-800 border-2 border-gray-100 p-4 rounded-t-md'>
              <span className='font-bold'>Released:</span>{' '}
              {formatDate(movieDetails?.release_date ?? '')}
            </li>
            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Runtime:</span>{' '}
              {formatRuntime(movieDetails?.runtime ?? 0)}
            </li>
            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Director:</span>{' '}
              {getDirector(credits?.crew ?? [])}
            </li>
            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Written By:</span>{' '}
              {getWriter(credits?.crew ?? [])}
            </li>
            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Languages:</span>{' '}
              {getLanguages(movieDetails?.spoken_languages ?? [])}
            </li>
            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Budget:</span>{' '}
              {formatMoney(movieDetails?.budget ?? 0)}
            </li>
            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'>
              <span className='font-bold'>Revenue:</span>{' '}
              {formatMoney(movieDetails?.revenue ?? 0)}
            </li>
            <li className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4 rounded-b-md'>
              <span className='font-bold'>Status:</span>{' '}
              {movieDetails?.status}
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

          {movieDetails?.homepage && (
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
              <a href={providers} target='_blank' rel='noopener noreferrer'>
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
      <p className='my-3'>
        <span className='font-bold'>Producers:</span>{' '}
        {getProducer(credits?.crew ?? [])}
      </p>
      <p className='my-3'>
        <span className='font-bold'>Production Companies:</span>{' '}
        {getProductionCompanies(movieDetails?.production_companies ?? [])}
      </p>
      <p className='my-3'>
        <span className='font-bold'>Production Countries:</span>{' '}
        {getProductionCountries(movieDetails?.production_countries ?? [])}
      </p>

      <div className='mt-12'>
        <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>Cast</h2>
        <Carousel type='cast' data={credits?.cast ?? []} />
      </div>

      {collection && (
        <div className='mt-12'>
          <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>
            {collection.name}
          </h2>
          <p className='mb-4'>{collection.overview}</p>
          <Carousel data={collection.parts ?? []} />
        </div>
      )}

      {(similar?.results?.length ?? 0) > 0 && (
        <div className='mt-12'>
          <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>Similar</h2>
          <Carousel data={similar?.results ?? []} />
        </div>
      )}

      {(recommended?.results?.length ?? 0) > 0 && (
        <div className='mt-12'>
          <h2 className={cn('text-2xl text-yellow-500 mb-5', rockSalt.className)}>
            Recommended
          </h2>
          <Carousel data={recommended?.results ?? []} />
        </div>
      )}

      <Link href='/'>
        <Button variant='secondary' className='mt-8'>
          Back to Search
        </Button>
      </Link>
    </div>
  )
}

export default MovieDetails
