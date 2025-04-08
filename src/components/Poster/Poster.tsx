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
  className?: string,
  fill?: boolean,
  cover?: boolean,
}

const Poster = ({
  src,
  alt,
  fallbackMessage = 'No Image',
  width,
  height,
  className,
  fill = false,
  cover = false,
}: PosterProps) => {
  const [error, setError] = useState(false)

  return (
    <>
      {error ? (
        <div
          className={cn('bg-gray-100 text-white flex justify-center items-center rounded-t-sm text-center p-6 shrink-0', height ? `h-[${height}]` : 'h-full', width ? `w-[${width}]` : 'w-full')}
        >
          <p>{fallbackMessage}</p>
        </div>
      ) : (
        <>
          {!fill && !cover && (
            <Image
              src={src}
              alt={alt}
              className={cn(className)}
              width={width}
              height={height}
              style={{
                width: '100%',
                height: 'auto',
              }}
              onError={() => setError(true)}
            />
          )}

          {cover && (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              objectFit='cover'
              onError={() => setError(true)}
            />
          )}

          {fill && (
            <Image
              src={src}
              alt={alt}
              className={cn(className)}
              fill
              onError={() => setError(true)}
            />
          )}
        </>
      )}
    </>
  )
}

export default Poster