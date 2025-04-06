import PersonDeatils from './PersonDetails'

const PersonDeatilsPage = async ({ params, }: {
  params: Promise<{ personID: string, }>
}) => {
  const { personID, } = await params

  console.log('personID', personID)

  return (
    <div>
      <p>details</p>

      <PersonDeatils personID={personID} />
    </div>
  )
}

export default PersonDeatilsPage
