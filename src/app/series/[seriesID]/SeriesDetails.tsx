'use client'

import { api, } from '~/trpc/react'

const SeriesDetails = ({ seriesID, }: { seriesID: string }) => {
  const { data: seriesDetails, isLoading, error, } = api.series.getDetails.useQuery(
    { id: seriesID, },
    { enabled: !!seriesID, }
  )

  console.log('seriesDetails', seriesDetails)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading movie details: {error.message}</div>
  }

  return (
    <div>
      <h1>Title: {seriesDetails?.title}</h1>
      <p>Overview: {seriesDetails?.overview}</p>
      <div>
        <strong>Genres:</strong>
        <ul>
          {seriesDetails?.genres.map((genre) => (
            <li key={genre.id}>Genre Name: {genre.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Runtime:</strong> {seriesDetails?.runtime} minutes
      </div>
    </div>
  )
}

export default SeriesDetails