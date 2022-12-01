import { useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import TextField from '../../components/TextField'
import validationSchema from './validation/validationSchema'

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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form noValidate>
          <TextField
            label="Search Term"
            name="searchTerm"
            maxLength={30}
            placeholder="Enter Search Term"
          />

          <TextField
            label="Year"
            name="year"
            maxLength={4}
            placeholder="Enter Year"
          />

          <Dropdown
            label="Search Type"
            name="searchType"
            options={[
              {
                value: '',
                label: 'select an option',
                disabled: true,
              },
              {
                value: 'movie',
                label: 'Movie'
              },
              {
                value: 'series',
                label: 'Series'
              },
            ]}
          />

          <Button
            type='submit'
          >
            Search
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default Search