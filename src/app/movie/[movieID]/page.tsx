import MovieDetails from './MovieDetails'

const MovieDetailsPage = async ({ params, }: {
  params: Promise<{ movieID: string, }>
}) => {
  const { movieID, } = await params

  console.log('movieID', movieID)

  return (
    <>
      <MovieDetails movieID={movieID} />
    </>
  )
}

export default MovieDetailsPage
