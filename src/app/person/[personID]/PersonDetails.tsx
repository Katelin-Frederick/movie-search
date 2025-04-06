'use client'

import { api, } from '~/trpc/react'

const PersonDetails = ({ personID, }: { personID: string }) => {
  const { data: personDetails, isLoading, error, } = api.people.getDetails.useQuery(
    { id: personID, },
    { enabled: !!personID, }
  )

  console.log('personDetails', personDetails)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading movie details: {error.message}</div>
  }

  return (
    <div>
      <h1>Name: {personDetails?.name}</h1>
      <p>Overview: {personDetails?.biography}</p>
      <div>
        <strong>Also Known As:</strong>
        <ul>
          {personDetails?.also_known_as.map((aka, index) => (
            <li key={index}>{aka}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Department:</strong> {personDetails?.known_for_department}
      </div>
    </div >
  )
}

export default PersonDetails