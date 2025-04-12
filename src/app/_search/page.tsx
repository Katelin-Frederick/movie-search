'use client'

import { type FormikHelpers, type FormikProps, ErrorMessage, Formik, Field, Form, } from 'formik'
import { useEffect, useState, useRef, } from 'react'
import React from 'react'

import type { TMDBSearchItem, SearchValues, } from '~/types/search'
import type { TMDBSeries, } from '~/types/series'
import type { TMDBPerson, } from '~/types/person'
import type { TMDBMovie, } from '~/types/movies'

import Series from '~/components/Carousel/CarouselCards/Series'
import Person from '~/components/Carousel/CarouselCards/Person'
import Movie from '~/components/Carousel/CarouselCards/Movie'
import { getPaginatedRange, cn, } from '~/lib/utils'
import Button from '~/components/Button/Button'
import { rockSalt, } from '~/fonts'
import { api, } from '~/trpc/react'

import { validationSchema, } from './validationSchema'

const Search = () => {
  const formikRef = useRef<FormikProps<SearchValues>>(null)
  const [loading, setLoading] = useState(false)
  const [displayType, setDisplayType] = useState<'movie' | 'tv' | 'person' | 'multi'>('multi')
  const [displayData, setDisplayData] = useState<TMDBSearchItem[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const prevPageRef = useRef<number>(page)
  const allFetchedIdsRef = useRef<Set<number>>(new Set())

  const searchMutation = api.search.getSearchResults.useMutation({
    onMutate: () => setLoading(true),
    onSuccess: () => setLoading(false),
    onError: () => {
      setLoading(false)
    },
  })

  const initialValues: SearchValues = {
    searchValue: '',
    searchType: 'multi',
    year: '',
  }

  const handleSubmit = async (
    values: SearchValues,
    { setSubmitting, }: FormikHelpers<SearchValues>
  ) => {
    try {
      const { searchType, searchValue, year, } = values
      const payload = {
        searchType,
        searchValue,
        year: year ? Number(year) : undefined,
        page,
      }

      const searchResults = await searchMutation.mutateAsync(payload)

      setDisplayType(searchType)
      setDisplayData(searchResults.results)
      setTotalPages(searchResults.total_pages)
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const values = formikRef.current?.values
        if (values) {
          const { searchType, searchValue, year, } = values
          const payload = {
            searchType,
            searchValue,
            year: year ? Number(year) : undefined,
            page,
          }

          if (page !== prevPageRef.current) {
            const searchResults = await searchMutation.mutateAsync(payload)

            const filteredResults = searchResults.results.filter(
              (item) => !allFetchedIdsRef.current.has(item.id)
            )

            if (filteredResults.length > 0) {
              filteredResults.forEach((item) => {
                allFetchedIdsRef.current.add(item.id)
              })

              setDisplayData(() => {
                const newData = [...filteredResults]

                const uniqueData = Array.from(new Set(newData.map((item) => item.id)))
                  .map((id) => newData.find((item) => item.id === id))
                  .filter((item): item is TMDBSearchItem => item !== undefined)

                return uniqueData
              })
            }

            setTotalPages(searchResults.total_pages)

            prevPageRef.current = page
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData().catch((err) => {
      console.error('Error handling async in useEffect:', err)
    })
  }, [page, displayType])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth', })
  }

  return (
    <div className='mb-14 flex justify-center items-center flex-col'>
      <h1 className={cn('text-3xl md:text-[40px] text-yellow-500 mb-5 text-center', rockSalt.className)}>
        ReelSearch
      </h1>

      <p className='text-xl mb-18 text-center'>
        Effortlessly search movies, shows, and the people behind them
      </p>

      <div>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, resetForm, }) => (
            <Form>
              <div className='flex justify-center items-center flex-col bg-gray-800 rounded-md p-8'>
                <div className='flex justify-center items-start flex-col md:flex-row mb-4'>
                  <div className='mb-4 w-full md:w-auto'>
                    <label htmlFor='searchType' className='block mr-4'>Search By:</label>
                    <Field
                      as='select'
                      id='searchType'
                      name='searchType'
                      className='border-2 border-gray-100 bg-white px-3 py-2 rounded-sm text-gray-800 mr-0 md:mr-4 w-full md:w-auto'
                    >
                      <option value='multi'>All</option>
                      <option value='movie'>Movie</option>
                      <option value='tv'>Series</option>
                      <option value='person'>Person</option>
                    </Field>
                    <div className='error'>
                      <ErrorMessage name='searchType'>
                        {(msg) => <div className='text-red-500'>{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className='mb-4 w-full md:w-auto'>
                    <label htmlFor='searchValue' className='block'>Search Term:</label>
                    <Field
                      id='searchValue'
                      name='searchValue'
                      type='text'
                      placeholder='Search for media...'
                      className='border-2 border-gray-100 bg-white px-3 py-2 rounded-sm text-gray-800'
                    />
                    <div className='error'>
                      <ErrorMessage name='searchValue'>
                        {(msg) => <div className='text-red-500'>{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>

                  {(values.searchType === 'movie' || values.searchType === 'tv') && (
                    <div className='mb-4 w-full md:w-auto'>
                      <label htmlFor='year' className='block ml-4'>Year:</label>
                      <Field
                        id='year'
                        name='year'
                        type='text'
                        maxLength={4}
                        inputMode='numeric'
                        pattern='\d*'
                        placeholder='e.g. 2021'
                        className='border-2 border-gray-100 bg-white px-3 py-2 rounded-sm text-gray-800 ml-0 md:ml-4'
                      />
                      <div className='error'>
                        <ErrorMessage name='year'>
                          {(msg) => <div className='text-red-500'>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  )}
                </div>

                <div className='flex justify-center items-center gap-4'>
                  <Button
                    type='button'
                    onClick={() => resetForm()}
                    disabled={isSubmitting || loading}
                    variant='secondary'
                  >
                    Reset
                  </Button>

                  <Button type='submit' disabled={isSubmitting || loading}>
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {loading && (
        <div className='flex flex-col justify-center items-center mt-6'>
          <div className='spinner'></div>
          <span className='text-lg mt-8'>Loading...</span>
        </div>
      )}

      {!loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12'>
          {displayType === 'multi' && displayData?.map((item, index) => {
            const key = `${item.media_type}-${item.id}-page-${page}-${index}`

            return (
              <React.Fragment key={key}>
                {item.media_type === 'movie' && (
                  <div className='relative'>
                    <div className='absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded z-10 shadow'>
                      Movie
                    </div>
                    <Movie movie={item as TMDBMovie} />
                  </div>
                )}

                {item.media_type === 'tv' && (
                  <div className='relative'>
                    <div className='absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow'>
                      TV Show
                    </div>
                    <Series series={item as TMDBSeries} />
                  </div>
                )}

                {item.media_type === 'person' && (
                  <div className='relative'>
                    <div className='absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow'>
                      Person
                    </div>
                    <Person person={item as unknown as TMDBPerson} />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      )}

      {displayData && displayData.length > 0 && totalPages > 1 && (
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
      )}
    </div>
  )
}

export default Search