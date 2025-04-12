'use client'

import React from 'react'

import { getPaginatedRange, cn, } from '~/lib/utils'

const Pagination = ({
  loading,
  page,
  setPage,
  totalPages,
}: {
  loading: boolean
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth', })
  }

  return (
    <div className='flex flex-wrap justify-center items-center gap-2 mt-10'>
      <button
        onClick={() => {
          if (page < totalPages && !loading) {
            setPage(prev => prev + 1)
            scrollToTop()
          }
        }}
        disabled={page === totalPages || loading}
        className={cn(
          'px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-100',
          {
            'opacity-50 cursor-not-allowed': page === totalPages || loading,
            'hover:bg-gray-600': !(page === totalPages || loading),
          }
        )}
      >
        Next
      </button>

      {getPaginatedRange(page, totalPages).map((item, idx) => item === 'dots' ? (
        <span key={`dots-${idx}`} className='px-2 text-yellow-400 font-bold'>
          ...
        </span>
      ) : (
        <button
          key={item}
          onClick={() => {
            setPage(item)
            scrollToTop()
          }}
          className={cn('px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-100', { 'bg-yellow-500 text-black': page === item, })}
        >
          {item}
        </button>
      ))}

      <button
        onClick={() => {
          if (page > 1 && !loading) {
            setPage(prev => prev - 1)
            scrollToTop()
          }
        }}
        disabled={page === 1 || loading}
        className={cn(
          'px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-100',
          {
            'opacity-50 cursor-not-allowed': page === 1 || loading,
            'hover:bg-gray-600': !(page === 1 || loading),
          }
        )}
      >
        Prev
      </button>
    </div>
  )
}

export default Pagination