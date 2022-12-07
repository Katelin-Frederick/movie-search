import { useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import Pagination from '../../components/Pagination'
import Spinner from '../../components/Spinner'
import SearchForm from './structure/SearchForm'
import MovieList from './structure/MovieList/MovieList'
import validationSchema from './validation/validationSchema'

const Search = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [showNoResults, setShowNoResults] = useState(false)
  const [totalPages, setTotalPages] = useState(0)

  const initialValues = {
    searchType: '',
    searchTerm: '',
    year: '',
  }

  const onSubmit = async (values, page) => {
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
        .then(function (response) {
          // console.log('results', response.data.results.filter((item) => item.Type !== 'movie' && item.Type !== 'series' && item.Type !== 'game'))
          setShowNoResults(response.data.results.length === 0)
          setResults(response.data.results)
          setTotalPages(Math.ceil(response.data.totalResults / 10))
        })
        .catch(function (error) {
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
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => onSubmit(values, 1)}
      >
        {({ values }) => (
          <Form noValidate>
            <h1 className='text-center text-yellow-400 text-5xl font-rockSalt'>Movie Search</h1>

            <SearchForm setResults={setResults} />

            {isLoading && (
              <div className="relative">
                <Spinner />
              </div>
            )}

            {!isLoading && showNoResults && (
              <div className="text-yellow-400">
                <h3 className="text-3xl">Hmmm...</h3>

                <p className="text-2xl my-3">We couldn't find any matches for <span className="font-bold italic">"{values.searchTerm}"</span></p>

                <p>Double check your search for any typos or spelling errors - or try a different search term.</p>
              </div>
            )}

            {!isLoading && results?.length > 0 && (
              <>
                <MovieList results={results} />

                {totalPages > 1 && (
                  <Pagination
                    className="my-12"
                    totalPages={totalPages}
                    onPageChange={(e) => onSubmit(values, e.selected + 1)}
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