'use client'

import { format, } from 'date-fns'

import Button from '~/components/Button/Button'
import Poster from '~/components/Poster/Poster'
import { api, } from '~/trpc/react'

const MovieDetails = ({ movieID, }: { movieID: string }) => {
  const { data: movieDetails, isLoading: isMovieDetailsLoading, error: movieDetailsError, } = api.movies.getDetails.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  const { data: rating, isLoading: isRatingLoading, error: ratingError, } = api.movies.getRating.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  const { data: credits, isLoading: isCreditsLoading, error: creditsError, } = api.movies.getCredits.useQuery(
    { id: movieID, },
    { enabled: !!movieID, }
  )

  if (isMovieDetailsLoading || isRatingLoading || isCreditsLoading) {
    return <div>Loading...</div>
  }

  if (movieDetailsError) {
    return <div>Error loading movie details: {movieDetailsError.message}</div>
  }

  const formatReleasedDate = () => {
    const releaseDate = new Date(movieDetails?.release_date ?? '')

    const formattedReleaseDate = format(releaseDate, 'MMMM dd, yyyy')

    return formattedReleaseDate
  }

  const formatRuntime = () => {
    const hours = Math.floor((movieDetails?.runtime ?? 0) / 60)
    const remainingMinutes = (movieDetails?.runtime ?? 0) % 60

    return `${hours}h ${remainingMinutes}m`
  }

  const formatMoney = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  const getDirector = () => credits?.crew.filter((person) => person.job === 'Director').map((person) => person.name).join(', ')
  const getWriter = () => credits?.crew.filter((person) => person.job === 'Writer' || person.job === 'Story' || person.job === 'Screenplay').map((person) => person.name).join(', ')
  const getProducers = () => credits?.crew.filter((person) => person.job === 'Executive Producer' || person.job === 'Producer').map((person) => person.name).join(', ')
  const getLanguages = () => movieDetails?.spoken_languages.map((language) => language.name).join(', ')
  const getProductionCompanies = () => movieDetails?.production_companies.map((company) => company.name).join(', ')
  const getProductionCountries = () => movieDetails?.production_countries.map((country) => country.name).join(', ')

  return (
    <div>
      <h1 className='text-5xl mb-8 text-center lg:text-left font-bold'>{movieDetails?.title}</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        <div className='flex justify-start items-center flex-col'>
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

          <div className='flex flex-wrap justify-center items-center mt-4'>
            {movieDetails?.genres.map((genre) => (
              <div
                key={genre.id}
                className='py-1 px-1.5 bg-gray-800 rounded-4xl mx-1 flex justify-center items-center text-sm font-bold text-yellow-500 border border-yellow-500'
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-center items-start my-12 md:my-0'>
          <ul>
            <li
              className='bg-gray-800 border-2 border-gray-100 p-4 rounded-t-md'
            >
              <span className='font-bold'>Released:</span> {formatReleasedDate()}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Runtime:</span> {formatRuntime()}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Rated:</span> {rating === '' ? 'N/A' : rating}
            </li>

            <li
              className='bg-gray-800 border-2 border-t-0 border-gray-100 p-4'
            >
              <span className='font-bold'>Director:</span> {getDirector() === '' ? 'N/A' : getDirector()}
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

          <a
            href={`http://imdb.com/title/${movieDetails?.imdb_id}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button className='mt-8 block'>View on IMDB</Button>
          </a>
        </div>
      </div>

      <h2 className='text-3xl'>Production Information:</h2>
      <p className='my-3'><span className='font-bold'>Producers:</span> {getProducers()}</p>
      <p className='my-3'><span className='font-bold'>Production Companies:</span> {getProductionCompanies()}</p>
      <p className='my-3'><span className='font-bold'>Production Countries:</span> {getProductionCountries()}</p>
    </div>
  )
}

export default MovieDetails