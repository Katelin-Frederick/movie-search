'use client'

import React, { useState, } from 'react'
import Image from 'next/image'

import { cn, } from '~/lib/utils'


type PosterProps = {
  src: string,
  alt: string,
  fallbackMessage?: string,
  width?: number,
  height?: number,
  className?: string
  fill?: boolean
}

const Poster = ({
  src,
  alt,
  fallbackMessage = 'No Image',
  width = 0,
  height = 0,
  className,
  fill = false,
}: PosterProps) => {
  const [error, setError] = useState(false)

  return (
    <>
      {error ? (
        <div className='bg-gray-100 w-full h-full flex justify-center items-center rounded-t-sm'>
          {fallbackMessage}
        </div>
      ) : (
        <>
          {fill ? (
            <Image
              src={src}
              alt={alt}
              className={cn(className)}
              fill
              onError={() => setError(true)}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              className={cn(className)}
              width={width} // Set original width
              height={height} // Set original height
              style={{
                width: '100%',
                height: 'auto', // Height adjusts automatically to maintain aspect ratio
              }}
              onError={() => setError(true)}
            />
          )}
        </>
      )}
    </>
  )
}

export default Poster