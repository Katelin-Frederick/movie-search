import { useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import validationSchema from './validation/validationSchema'
import SearchForm from './structure/SearchForm'
import MovieList from './structure/MovieList/MovieList'

const Search = () => {
  const [results, setResults] = useState([])

  const initialValues = {
    searchType: '',
    searchTerm: '',
    year: '',
  }

  const onSubmit = async (values) => {
    const { searchTerm, searchType, year } = values

    try {
      axios.get('/api/search', {
        params: {
          searchType,
          searchTerm,
          year,
        },
      })
        .then(function (response) {
          console.log('res', response.data)
          setResults(response.data)
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
        onSubmit={(values) => onSubmit(values)}
      >
        {() => (
          <Form noValidate>
            <h1 className='text-center text-yellow-400 text-5xl'>Movie Search</h1>

            <SearchForm />

            {results.length > 0 && (
              <MovieList results={results} />
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Search