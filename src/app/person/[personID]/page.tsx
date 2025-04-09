import PersonDeatils from './PersonDetails'

const PersonDeatilsPage = async ({ params, }: {
  params: Promise<{ personID: string, }>
}) => {
  const { personID, } = await params

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='container py-14'>
        <PersonDeatils personID={personID} />
      </div>
    </div>
  )
}

export default PersonDeatilsPage
