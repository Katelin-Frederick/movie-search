import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import Carousel from '../../components/Carousel'
import SiteContext from '../../context/SiteContext/SiteContext'
import SiteContextType from '../../types/SiteContextType'
import ValuesType from '../../types/ValuesType'
import AutoSubmit from './structure/AutoSubmit'
import SearchForm from './structure/SearchForm'
import validationSchema from './validation/validationSchema'
import ResultsList from '../../components/ResultsList/ResultsList'
import MovieCarouselCard from '../../components/Carousel/CarouselCards/Movie/MovieCarouselCard'
import TvCarouselCard from '../../components/Carousel/CarouselCards/TV'
import PeopleCarouselCard from '../../components/Carousel/CarouselCards/People'
import Pagination from '../../components/Pagination'

const Search = () => {
  const { site, siteDispatch } = useContext<SiteContextType>(SiteContext)

  const [trending, setTrending] = useState({ movies: [], tv: [], people: [] })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
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
  }, [])

  const onSubmit = (values: ValuesType, page: number) => {
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

            <SearchForm />

            {site.results.length > 0 && (
              <ResultsList results={site.results} />
            )}

            {site.totalPages > 1 && (
              <Pagination
                className="my-12"
                totalPages={site.totalPages}
                onPageChange={(e) => onSubmit(values, e.selected + 1)}
                page={site.page - 1}
              />
            )}

            {trending.movies.length > 0 && (
              <div className="my-12">
                <h2 className="text-3xl text-yellow-400 font-rockSalt mb-5">Trending Movies</h2>

                <Carousel carouselItems={carouselMovieItems} />
              </div>
            )}

            {trending.tv.length > 0 && (
              <div className="my-12">
                <h2 className="text-3xl text-yellow-400 font-rockSalt mb-5">Trending Series</h2>

                <Carousel carouselItems={carouselTvItems} />
              </div>
            )}

            {trending.people.length > 0 && (
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
