import SeriesDetails from './SeriesDetails'

const SeriesDetailsPage = async ({ params, }: {
  params: Promise<{ seriesID: string, }>
}) => {
  const { seriesID, } = await params

  console.log('seriesID', seriesID)

  return (
    <div>
      <p>details</p>

      <SeriesDetails seriesID={seriesID} />
    </div>
  )
}

export default SeriesDetailsPage
