import { useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import validationSchema from './validation/validationSchema'
import SearchForm from './structure/SearchForm'
import MovieList from './structure/MovieList/MovieList'
import Pagination from '../../components/Pagination'

const Search = () => {
  const [results, setResults] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  const initialValues = {
    searchType: '',
    searchTerm: '',
    year: '',
  }

  const onSubmit = async (values, page) => {
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
          setResults(response.data.results)
          setTotalPages(Math.ceil(response.data.totalResults / 10))
        })
        .catch(function (error) {
          console.error(error)
        })
    } catch (error) {
      console.error('ERROR Fetching Data', error)
    }
  }

  return (
    <div className="mt-14">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => onSubmit(values, 1)}
      >
        {({ values }) => (
          <Form noValidate>
            <h1 className='text-center text-yellow-400 text-5xl'>Movie Search</h1>

            <SearchForm setResults={setResults} />

            {results.length > 0 && (
              <>
                <MovieList results={results} />

                <Pagination
                  className="my-12"
                  totalPages={totalPages}
                  onPageChange={(e) => onSubmit(values, e.selected + 1)}
                />
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Search