'use client'

import { type FormikHelpers, ErrorMessage, Formik, Field, Form, } from 'formik'
import { useState, } from 'react'
import * as Yup from 'yup'
import React from 'react'

import type { TMDBSearchItem, SearchValues, } from '~/types/search'
import type { TMDBSeries, } from '~/types/series'
import type { TMDBPerson, } from '~/types/person'
import type { TMDBMovie, } from '~/types/movies'

import Series from '~/components/Carousel/CarouselCards/Series'
import Person from '~/components/Carousel/CarouselCards/Person'
import Movie from '~/components/Carousel/CarouselCards/Movie'
import Button from '~/components/Button/Button'
import { rockSalt, } from '~/fonts'
import { api, } from '~/trpc/react'
import { cn, } from '~/lib/utils'

// Validation schema
const validationSchema = Yup.object({
  searchValue: Yup.string()
    .required('Search term is required')
    .min(3, 'Search term must be at least 3 characters long')
    .max(50, 'Search term cannot exceed 50 characters'),

  searchType: Yup.string()
    .required('Please select a search type'),

  year: Yup.string()
    .when('searchType', {
      is: (val: string) => val === 'movie' || val === 'tv',
      then: (schema) => schema
        .matches(/^\d{4}$/, 'Year must be a 4-digit number')
        .test('valid-year', 'Year must be between 1800 and current year', (value) => {
          if (!value) return true
          const num = parseInt(value, 10)
          const currentYear = new Date().getFullYear()
          return num >= 1800 && num <= currentYear
        }),
      otherwise: (schema) => schema.strip(),
    }),
})

const Search = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [displayType, setDisplayType] = useState<'movie' | 'tv' | 'person' | 'multi'>('multi')
  const [displayData, setDisplayData] = useState<TMDBSearchItem[] | undefined>()

  const searchMutation = api.search.getSearchResults.useMutation({
    onMutate: () => setLoading(true),
    onSuccess: () => setLoading(false),
    onError: (err) => {
      setLoading(false)
      setError(err.message)
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
      }

      const searchResults = await searchMutation.mutateAsync(payload)

      setDisplayType(searchType)
      setDisplayData(searchResults.results)
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='mb-14 flex justify-center items-center flex-col'>
      <h1 className={cn('text-3xl md:text-[40px] text-yellow-500 mb-5 text-center', rockSalt.className)}>
        ReelSearch
      </h1>

      <p className='text-xl text-yellow-500 mb-18 text-center'>
        Effortlessly search movies, shows, and the people behind them
      </p>

      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, }) => (
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
                      <option value='tv'>TV Show</option>
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

                <div>
                  <Button type='submit' disabled={isSubmitting || loading}>
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12'>
        {displayType === 'multi' && displayData?.map((item) => (
          <React.Fragment key={item.id}>
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
        ))}


        {displayType === 'movie' && displayData?.map((movie) => (
          <Movie key={movie.id} movie={movie as TMDBMovie} />
        ))}

        {displayType === 'tv' && displayData?.map((series) => (
          <Series key={series.id} series={series as TMDBSeries} />
        ))}

        {displayType === 'person' && displayData?.map((person) => (
          <Person key={person.id} person={person as unknown as TMDBPerson} />
        ))}
      </div>

      {error && (
        <div className='text-red-500 mt-4'>
          Error: {error || 'Unknown error'}
        </div>
      )}
    </div>
  )
}

export default Search
