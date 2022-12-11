import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, Form } from 'formik'
import Carousel from '../../components/Carousel'
import MovieCard from '../../components/Cards/Movie'
import PeopleCard from '../../components/Cards/People'
import TvCard from '../../components/Cards/TV'
import SiteContext from '../../context/SiteContext/SiteContext'
import SiteContextType from '../../types/SiteContextType'
import ValuesType from '../../types/ValuesType'
import AutoSubmit from './structure/AutoSubmit'
import SearchForm from './structure/SearchForm'
import validationSchema from './validation/validationSchema'

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

  const carouselMovieItems = trending.movies.map((item) => (
    <MovieCard item={item} />
  ))

  const carouselTvItems = trending.tv.map((item) => (
    <TvCard item={item} />
  ))

  const carouselPeopleItems = trending.people.map((item) => (
    <PeopleCard item={item} />
  ))

  return (
    <div className="my-14">
      <Formik
        initialValues={site.values}
        // validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={() => console.log('submit')}
      >
        {() => (
          <Form noValidate>
            <AutoSubmit />

            <h1 className="text-center text-yellow-400 text-5xl font-rockSalt">TMDB Search</h1>

            <SearchForm />

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
