import { useContext, useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import Pagination from '../../components/Pagination'
import Spinner from '../../components/Spinner'
import SiteContext from '../../context/SiteContext/SiteContext'
import SiteContextType from '../../types/SiteContextType'
import AutoSubmit from './structure/AutoSubmit'
import MovieList from './structure/MovieList/MovieList'
import SearchForm from './structure/SearchForm'
import validationSchema from './validation/validationSchema'
import ValuesType from '../../types/ValuesType'

const Search = () => {
  const { site, siteDispatch } = useContext<SiteContextType>(SiteContext)

  const [isLoading, setIsLoading] = useState(false)
  const [showNoResults, setShowNoResults] = useState(false)

  const onSubmit = async (values: ValuesType, page: number) => {
    setIsLoading(true)

    const { searchTerm, searchType, year } = values

    try {
      axios.get('/api/search', {
        params: {
          page,
          searchType,
          searchTerm,
          year,
        },
      })
        .then((response) => {
          // console.log('results', response.data.results.filter((item) => item.Type !== 'movie' && item.Type !== 'series' && item.Type !== 'game'))
          setShowNoResults(response.data.results.length === 0)

          siteDispatch({
            type: 'UPDATE_RESULTS',
            payload: response.data.results
          })

          siteDispatch({
            type: 'UPDATE_TOTAL_PAGES',
            payload: Math.ceil(response.data.totalResults / 10)
          })

          siteDispatch({
            type: 'UPDATE_PAGE',
            payload: page
          })
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error('ERROR Fetching Data', error)
    }

    setIsLoading(false)
  }

  return (
    <div className="my-14">
      <Formik
        initialValues={site.values}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values: ValuesType) => onSubmit(values, 1)}
      >
        {({ values }) => (
          <Form noValidate>
            <AutoSubmit />

            <h1 className="text-center text-yellow-400 text-5xl font-rockSalt">Movie Search</h1>

            <SearchForm />

            {isLoading && (
              <div className="relative">
                <Spinner />
              </div>
            )}

            {!isLoading && showNoResults && (
              <div className="text-yellow-400">
                <h3 className="text-3xl">Hmmm...</h3>

                <p className="text-2xl my-3">
                  We couldn&apos;t find any matches for <span className="font-bold italic">{`"${values.searchTerm}`}</span>
                </p>

                <p>Double check your search for any typos or spelling errors - or try a different search term.</p>
              </div>
            )}

            {!isLoading && site.results?.length > 0 && (
              <>
                <MovieList results={site.results} />

                {site.totalPages > 1 && (
                  <Pagination
                    className="my-12"
                    totalPages={site.totalPages}
                    onPageChange={(e) => onSubmit(values, e.selected + 1)}
                    page={site.page - 1}
                  />
                )}
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Search
