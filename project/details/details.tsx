import React from 'react'

const details = ({ details }) => {
  console.log('details', details)

  return (
    <div>
      {details.Title}
    </div>
  )
}

export default details