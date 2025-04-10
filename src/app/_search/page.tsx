'use client'

import { ErrorMessage, Formik, Field, Form, } from 'formik'
import React, { useState, } from 'react'
import Image from 'next/image'
import * as Yup from 'yup'

import { type SearchValues, } from '~/types/search'
import Button from '~/components/Button/Button'
import { rockSalt, } from '~/fonts'
import { api, } from '~/trpc/react'
import { cn, } from '~/lib/utils'

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

  return (
    <div className='mb-14 flex justify-center items-center flex-col'>
      <h1 className={cn('text-3xl md:text-[40px] text-yellow-500 mb-5 text-center', rockSalt.className)}>
        ReelSearch
      </h1>

      <p className={cn('text-xl text-yellow-500 mb-18 text-center')}>
        Effortlessly search movies, shows, and the people behind them
      </p>

      <div className='bg-gray-800 rounded-md p-8'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, }) => {
            try {
              const { searchType, searchValue, year, } = values
              const payload = {
                searchType,
                searchValue,
                year: year ? Number(year) : undefined,
              }

              await searchMutation.mutateAsync(payload)
            } catch (err) {
              console.error('Search error:', err)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ values, isSubmitting, }) => (
            <Form>
              <div className='flex justify-center items-center flex-col'>
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
                      <ErrorMessage name='searchType'>{(msg) => <div className='text-red-500'>{msg}</div>}</ErrorMessage>
                    </div>
                  </div>

                  <div className='mb-4 w-full md:w-auto'>
                    <label htmlFor='searchValue' className='block mr-4'>Search Term:</label>

                    <Field
                      id='searchValue'
                      name='searchValue'
                      type='text'
                      placeholder='Search for media...'
                      className='border-2 border-gray-100 bg-white px-3 py-2 rounded-sm text-gray-800 mr-0 md:mr-4'
                    />
                    <div className='error'>
                      <ErrorMessage name='searchValue'>{(msg) => <div className='text-red-500'>{msg}</div>}</ErrorMessage>
                    </div>
                  </div>

                  {(values.searchType === 'movie' || values.searchType === 'tv') && (
                    <div className='mb-4 w-full md:w-auto'>
                      <label htmlFor='year' className='block mr-4'>Year:</label>

                      <Field
                        id='year'
                        name='year'
                        type='text'
                        maxLength={4}
                        inputMode='numeric'
                        pattern='\d*'
                        placeholder='e.g. 2021'
                        className='border-2 border-gray-100 bg-white px-3 py-2 rounded-sm text-gray-800 mr-0 md:mr-4'
                      />
                      <div className='error'>
                        <ErrorMessage name='year'>{(msg) => <div className='text-red-500'>{msg}</div>}</ErrorMessage>
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
        {searchMutation?.data?.results.map((result) => (
          <div key={result.id} className='rounded-lg shadow-lg overflow-hidden max-w-xs w-full'>
            <Image
              src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              alt={result.title ?? result.name}
              width={200}
              height={300}
              className='w-full h-auto object-cover'
              layout='intrinsic'
              priority={false}
            />
            <div className='p-4'>
              <h3 className='text-xl font-semibold'>{result.title ?? result.name}</h3>
              <p className='text-sm text-gray-600'>{result.release_date ?? result.first_air_date}</p>
              {result.overview && (
                <p className='text-gray-800'>{result.overview.slice(0, 100)}...</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className='text-red-500 mt-4'>\
          Error: {error || 'Unknown error'}
        </div>
      )}
    </div>
  )
}

export default Search
