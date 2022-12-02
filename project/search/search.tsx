import { useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import TextField from '../../components/TextField'
import validationSchema from './validation/validationSchema'
import Image from 'next/image'

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
        {({ resetForm }) => (
          <Form noValidate>
            <h1 className='text-center text-yellow-400 text-5xl'>Movie Search</h1>

            <div className="flex justify-center items-center mt-14">
              <div className="bg-gray rounded-lg p-4 md:p-8 w-full md:w-auto shadow-xl">
                <div className="flex flex-col md:flex-row justify-evenly">
                  <TextField
                    className="md:pr-3 mb-5 md:mb-0"
                    label="Search Term"
                    name="searchTerm"
                    maxLength={30}
                    placeholder="Enter Search Term"
                  />

                  <TextField
                    className="md:pr-3 mb-5 md:mb-0"
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
                        label: 'Select An Option',
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
                </div>

                <div className='flex flex-col md:flex-row justify-center items-center mt-5'>
                  <Button
                    onClick={() => resetForm()}
                    type='button'
                  >
                    Reset
                  </Button>

                  <Button
                    className="mt-5 md:mt-0 md:ml-4"
                    type='submit'
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {results.length > 0 && (
              <ul>
                {results.map((item, index) => (
                  <li key={index} className="text-white">
                    <p>{item.Title}</p>

                    <Image
                      alt='user profile picture'
                      height={444}
                      src={item.Poster}
                      width={300}
                    />
                  </li>
                ))}
              </ul>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Search