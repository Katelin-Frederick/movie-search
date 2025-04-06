import MovieDetails from './MovieDetails'

const MovieDetailsPage = async ({ params, }: {
  params: Promise<{ movieID: string, }>
}) => {
  const { movieID, } = await params

  console.log('movieID', movieID)

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='container py-14'>
        <MovieDetails movieID={movieID} />
      </div>
    </div>
  )
}

export default MovieDetailsPage
