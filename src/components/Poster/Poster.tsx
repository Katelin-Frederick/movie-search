'use client'

import React, { useState, } from 'react'
import Image from 'next/image'

const Poster = ({ src, alt, fallbackMessage = 'No Image', }: { src: string, alt: string, fallbackMessage?: string }) => {
  const [error, setError] = useState(false)

  return (
    <>
      {error ? (
        <div className='bg-gray-100 w-full h-full flex justify-center items-center rounded-t-sm'>
          {fallbackMessage}
        </div>
      ) : (
        <Image
          src={src}
          fill
          alt={alt}
          className='rounded-t-sm'
          onError={() => setError(true)}
        />
      )}
    </>
  )
}

export default Poster