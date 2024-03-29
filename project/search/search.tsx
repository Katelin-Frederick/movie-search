import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import Spinner from '../../components/Spinner'
import SiteContext from '../../context/SiteContext/SiteContext'
import AutoSubmit from './structure/AutoSubmit'
import SearchForm from './structure/SearchForm'
import SiteContextType from '../../types/SiteContextType'
import ValuesType from '../../types/ValuesType'
import validationSchema from './validation/validationSchema'
import Trending from './structure/Trending'
import Results from './structure/Results'

const Search = () => {
  const { site, siteDispatch } = useContext<SiteContextType>(SiteContext)

  const [trending, setTrending] = useState({ movies: [], tv: [], people: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [showNoResults, setShowNoResults] = useState(false)

  const getTrending = async () => {
    setIsLoading(true)

    try {
      const movies = await axios.get('/api/trending', {
        params: {
          type: 'movie'
        },
      })

      const tv = axios.get('/api/trending', {
        params: {
          type: 'tv'
        },
      })

      const people = axios.get('/api/trending', {
        params: {
          type: 'person'
        },
      })

      axios.all([movies, tv, people]).then(axios.spread((...responses) => {
        const moviesResponse = responses[0]
        const tvResponse = responses[1]
        const peopleResponse = responses[2]

        setTrending({
          movies: moviesResponse.data.results.filter((movie) => movie.poster_path !== null),
          tv: tvResponse.data.results.filter((series) => series.poster_path !== null),
          people: peopleResponse.data.results.filter((person) => person.profile_path !== null),
        })
      }))
    } catch (error) {
      console.error('ERROR Fetching Data', error)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getTrending()
  }, [])

  const onSubmit = async (values: ValuesType, page: number) => {
    setIsLoading(true)

    const { searchTerm, searchType, year } = values

    await axios.get('/api/search', {
      params: {
        searchType,
        searchTerm,
        year,
        page,
      },
    })
      .then((response) => {
        setShowNoResults(response.data.results.length === 0)

        siteDispatch({
          type: 'UPDATE_RESULTS',
          payload: response.data.results
        })

        siteDispatch({
          type: 'UPDATE_TYPE',
          payload: searchType
        })

        siteDispatch({
          type: 'UPDATE_TOTAL_PAGES',
          payload: response.data.total_pages
        })

        siteDispatch({
          type: 'UPDATE_PAGE',
          payload: page
        })
      })
      .catch((error) => {
        console.error(error)
      })

    setIsLoading(false)
  }

  return (
    <div className="my-14">
      <Formik
        initialValues={site.values}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => onSubmit(values, 1)}
      >
        {() => (
          <Form noValidate>
            <AutoSubmit />

            <h1 className="text-center text-yellow-400 text-5xl font-rockSalt">TMDB Search</h1>

            <SearchForm setShowNoResults={setShowNoResults} />

            {isLoading && (
              <Spinner />
            )}

            <Results
              isLoading={isLoading}
              showNoResults={showNoResults}
              onSubmit={onSubmit}
            />

            <Trending isLoading={isLoading} trending={trending} />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Search
