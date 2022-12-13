import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import Carousel from '../../components/Carousel'
import MovieCarouselCard from '../../components/Carousel/CarouselCards/Movie/MovieCarouselCard'
import Pagination from '../../components/Pagination'
import PeopleCarouselCard from '../../components/Carousel/CarouselCards/People'
import ResultsList from '../../components/ResultsList/ResultsList'
import Spinner from '../../components/Spinner'
import TvCarouselCard from '../../components/Carousel/CarouselCards/TV'
import SiteContext from '../../context/SiteContext/SiteContext'
import AutoSubmit from './structure/AutoSubmit'
import SearchForm from './structure/SearchForm'
import SiteContextType from '../../types/SiteContextType'
import ValuesType from '../../types/ValuesType'
import validationSchema from './validation/validationSchema'

const Search = () => {
  const { site, siteDispatch } = useContext<SiteContextType>(SiteContext)

  const [trending, setTrending] = useState({ movies: [], tv: [], people: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [showNoResults, setShowNoResults] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    try {
      const movies = axios.get('/api/trending', {
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
  }, [])

  const onSubmit = (values: ValuesType, page: number) => {
    setIsLoading(true)

    const { searchTerm, searchType, year } = values

    axios.get('/api/search', {
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

  const carouselMovieItems = trending.movies.map((item) => (
    <MovieCarouselCard item={item} />
  ))

  const carouselTvItems = trending.tv.map((item) => (
    <TvCarouselCard item={item} />
  ))

  const carouselPeopleItems = trending.people.map((item) => (
    <PeopleCarouselCard item={item} />
  ))

  return (
    <div className="my-14">
      <Formik
        initialValues={site.values}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => onSubmit(values, 1)}
      >
        {({ values }) => (
          <Form noValidate>
            <AutoSubmit />

            <h1 className="text-center text-yellow-400 text-5xl font-rockSalt">TMDB Search</h1>

            <SearchForm setShowNoResults={setShowNoResults} />

            {isLoading && (
              <Spinner />
            )}

            {!isLoading && showNoResults && (
              <div className="text-yellow-400 my-20">
                <h3 className="text-3xl">Hmmm...</h3>

                <p className="text-2xl my-3">
                  We couldn&apos;t find any matches for <span className="font-bold italic">{`"${values.searchTerm}"`}</span>
                </p>

                <p>Double check your search for any typos or spelling errors - or try a different search term.</p>
              </div>
            )}

            {!isLoading && site.results.length > 0 && (
              <ResultsList results={site.results} />
            )}

            {!isLoading && site.totalPages > 1 && (
              <Pagination
                className="my-12"
                totalPages={site.totalPages}
                onPageChange={(e) => onSubmit(values, e.selected + 1)}
                page={site.page - 1}
              />
            )}

            {!isLoading && trending.movies.length > 0 && (
              <div className="my-12">
                <h2 className="text-3xl text-yellow-400 font-rockSalt mb-5">Trending Movies</h2>

                <Carousel carouselItems={carouselMovieItems} />
              </div>
            )}

            {!isLoading && trending.tv.length > 0 && (
              <div className="my-12">
                <h2 className="text-3xl text-yellow-400 font-rockSalt mb-5">Trending Series</h2>

                <Carousel carouselItems={carouselTvItems} />
              </div>
            )}

            {!isLoading && trending.people.length > 0 && (
              <div className="my-12">
                <h2 className="text-3xl text-yellow-400 font-rockSalt mb-5">Trending People</h2>

                <Carousel carouselItems={carouselPeopleItems} />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Search
