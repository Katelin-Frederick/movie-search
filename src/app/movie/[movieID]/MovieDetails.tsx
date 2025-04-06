'use client'

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

  const getGenres = () => movieDetails?.genres?.map((genre) => genre.name).join(', ')
  const getDirector = () => credits?.crew.filter((person) => person.job === 'Director').map((person) => person.name).join(', ')
  const getWriter = () => credits?.crew.filter((person) => person.job === 'Writer').map((person) => person.name).join(', ')
  const getLanguages = () => movieDetails?.spoken_languages.map((language) => language.name).join(', ')
  const getProductionCompanies = () => movieDetails?.production_companies.map((company) => company.name).join(', ')
  const getProductionCountries = () => movieDetails?.production_countries.map((country) => country.name).join(', ')

  return (
    <div>
      <h1 className='text-3xl'>{movieDetails?.title}</h1>

      <ul>
        <li><span className='font-bold'>Released:</span> {movieDetails?.release_date}</li>
        <li><span className='font-bold'>Runtime:</span> {movieDetails?.runtime}</li>
        <li><span className='font-bold'>Rated:</span> {rating}</li>
        <li><span className='font-bold'>Genres:</span> {getGenres()}</li>
        <li><span className='font-bold'>Director:</span> {getDirector()}</li>
        <li><span className='font-bold'>Writer:</span> {getWriter()}</li>
        <li><span className='font-bold'>Languages:</span> {getLanguages()}</li>
        <li><span className='font-bold'>Budget:</span> {movieDetails?.budget}</li>
        <li><span className='font-bold'>Revenue:</span> {movieDetails?.revenue}</li>
        <li><span className='font-bold'>Production Companies:</span> {getProductionCompanies()}</li>
        <li><span className='font-bold'>Production Countries:</span> {getProductionCountries()}</li>
      </ul>

      <h2 className='text-2xl'>Plot:</h2>
      <p>{movieDetails?.overview}</p>

      <h2 className='text-2xl'>Tagline:</h2>
      <p>{movieDetails?.tagline}</p>
    </div>
  )
}

export default MovieDetails