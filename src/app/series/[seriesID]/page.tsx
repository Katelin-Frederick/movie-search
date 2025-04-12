import SeriesDetails from './SeriesDetails'

const SeriesDetailsPage = async ({ params, }: {
  params: Promise<{ seriesID: string, }>
}) => {
  const { seriesID, } = await params

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='container py-14'>
        <SeriesDetails seriesID={seriesID} />
      </div>
    </div>
  )
}

export default SeriesDetailsPage
