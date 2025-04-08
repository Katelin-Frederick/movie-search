import EpisodeDetails from './EpisodeDetails'

const EpisodeDetailsPage = async ({ params, }: {
  params: Promise<{ seriesID: string, seasonNumber: string, episodeNumber: string }>
}) => {
  const { seriesID, seasonNumber, episodeNumber, } = await params

  console.log('seriesID', seriesID)

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='container py-14'>
        <EpisodeDetails
          seriesID={seriesID}
          seasonNumber={seasonNumber}
          episodeNumber={episodeNumber}
        />
      </div>
    </div>
  )
}

export default EpisodeDetailsPage
