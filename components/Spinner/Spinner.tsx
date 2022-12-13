import React from 'react'

const Spinner = () => (
  <div className="relative flex flex-col">
    <div className="loader mt-12">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
    <h3 className="text-yellow-500 text-2xl absolute bottom-[-50px] self-center">Loading...</h3>
  </div>
)

export default Spinner
