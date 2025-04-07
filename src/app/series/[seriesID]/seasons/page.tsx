import SeasonsDetails from './SeasonsDetails'

const SeasonsDetailsPage = async ({ params, }: {
  params: Promise<{ seriesID: string, }>
}) => {
  const { seriesID, } = await params

  console.log('seriesID', seriesID)

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='container py-14'>
        <SeasonsDetails seriesID={seriesID} />
      </div>
    </div>
  )
}

export default SeasonsDetailsPage
