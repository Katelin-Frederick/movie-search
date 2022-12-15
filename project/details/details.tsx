import { useRouter } from 'next/router'
import Image from 'next/image'
import Button from '../../components/Button'
import Carousel from '../../components/Carousel'
import CastCarouselCard from '../../components/Carousel/CarouselCards/Cast'
import MovieCarouselCard from '../../components/Carousel/CarouselCards/Movie/MovieCarouselCard'

const Details = ({ details, collections, credits }) => {
  const router = useRouter()
  console.log('details', details)
  console.log('collections', collections)
  console.log('credits', credits)

  const carouselCollectionItems = collections.parts.map((item) => (
    <MovieCarouselCard item={item} />
  ))

  const carouselCastItems = credits.cast.filter((person) => person.profile_path !== null).map((item) => (
    <CastCarouselCard item={item} />
  ))

  const getDirector = () => credits.crew.filter((person) => person.job === 'Director').map((person) => person.name).join(', ')
  const getWriter = () => credits.crew.filter((person) => person.job === 'Writer').map((person) => person.name).join(', ')
  const getGenres = (item) => item.genres.map((genre) => genre.name).join(', ')
  const getLanguages = (item) => item.spoken_languages.map((language) => language.name).join(', ')
  const getProductionCompanies = (item) => item.production_companies.map((company) => company.name).join(', ')
  const getProductionCountries = (item) => item.production_countries.map((country) => country.name).join(', ')

  return (
    <div className="py-12">
      <h1 className="text-5xl text-white mb-6">{details.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
        <Image
          alt={`${details.title} Movie Poster`}
          src={`https://image.tmdb.org/t/p/w185/${details.poster_path}`}
          width="0"
          height="0"
          sizes="100vw"
          className="rounded-t-md col-span-1 w-full h-auto"
        />

        <div className="flex flex-col rounded-md border-t-2 border-light-gray text-lightest-gray">
          <ul className="bg-gray">
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Released: </span>{details.release_date}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Runtime: </span>{details.runtime}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Budget: </span>{details.budget}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Revenue: </span>{details.revenue}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Popularity: </span>{details.popularity}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Vote Average: </span>{details.vote_average}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Vote Count: </span>{details.vote_count}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Genres: </span>{getGenres(details)}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Languages: </span>{getLanguages(details)}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Production Companies: </span>{getProductionCompanies(details)}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Production Countries: </span>{getProductionCountries(details)}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Director: </span>{getDirector()}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Writer: </span>{getWriter()}
            </li>
          </ul>
        </div>

        <div className="rounded-md text-lightest-gray col-span-1 md:col-span-2 xl:col-span-1 mt-8 xl:mt-0">
          <div>
            <h2 className="text-3xl text-white">Plot:</h2>

            <p>{details.overview}</p>

            <h2 className="text-3xl text-white mt-8">Tagline: </h2>{details.tagline}
          </div>
        </div>
      </div>

      <div className="my-12">
        <h3 className="text-3xl text-yellow-400 font-rockSalt mb-5">Cast</h3>

        <Carousel carouselItems={carouselCastItems} />
      </div>

      <div className="my-12">
        <h3 className="text-3xl text-yellow-400 font-rockSalt mb-5">{collections.name}</h3>

        <p className="text-lightest-gray my-5">{collections.overview}</p>

        <Carousel carouselItems={carouselCollectionItems} />
      </div>

      <div className="mt-8">
        <Button
          onClick={() => router.push('/')}
          variant="secondary"
          type="button"
        >
          Back
        </Button>

        <a
          href={`http://imdb.com/title/${details.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="mt-5 md:mt-0 md:ml-4"
            type="submit"
          >
            View On IMDb
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Details
