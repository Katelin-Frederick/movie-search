'use client'

import { useFormikContext, ErrorMessage, Field, Form, } from 'formik'
import React from 'react'

import type { SearchValues, } from '~/types/search'

import Button from '~/components/Button/Button'

const SearchForm = ({ loading, }: { loading: boolean }) => {
  const { values, isSubmitting, resetForm, } = useFormikContext<SearchValues>()

  return (
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
  )
}

export default SearchForm