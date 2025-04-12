'use client'

import { type FormikHelpers, type FormikProps, Formik, } from 'formik'
import { useEffect, useState, useRef, } from 'react'
import React from 'react'

import type { TMDBSearchItem, SearchValues, DisplayType, } from '~/types/search'

import { rockSalt, } from '~/fonts'
import { api, } from '~/trpc/react'
import { cn, } from '~/lib/utils'

import { validationSchema, } from './validationSchema'
import CardDisplay from './CardDisplay'
import SearchForm from './SearchForm'
import Pagination from './Pagination'

const Search = () => {
  const formikRef = useRef<FormikProps<SearchValues>>(null)
  const [loading, setLoading] = useState(false)
  const [displayType, setDisplayType] = useState<DisplayType>('multi')
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
          {() => (
            <SearchForm loading={loading} />
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
        <CardDisplay displayType={displayType} displayData={displayData} page={page} />
      )}

      {displayData && displayData.length > 0 && totalPages > 1 && (
        <Pagination loading={loading} page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  )
}

export default Search