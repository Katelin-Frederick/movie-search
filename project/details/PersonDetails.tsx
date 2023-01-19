import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import Button from '../../components/Button'
import Carousel from '../../components/Carousel'
import CastCarouselCard from '../../components/Carousel/CarouselCards/Cast'
import MovieCarouselCard from '../../components/Carousel/CarouselCards/Movie/MovieCarouselCard'
import currencyUS from '../../helpers/currencyUS'
import formatDate from '../../helpers/formatDate'

const PersonDetails = ({ credits, details }) => {
  console.log('credits', credits)
  console.log('details', details)

  return (
    <div className="py-12">
      <h1 className="text-5xl text-white mb-6">{details.name}</h1>

      <div className="flex flex-col md:flex-row justify-center items-center md:items-end">
        <Image
          alt={details.name}
          src={`https://image.tmdb.org/t/p/w185/${details.profile_path}`}
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: 'auto', height: '450px' }}
        />

        <div className="mt-6 md:ml-6 md:mt-0">
          <ul className="bg-gray rounded-t-md text-lightest-gray">
            <li
              className="px-4 py-3 border-2 border-light-gray"
            >
              <span className="text-white font-bold">Place of Birth: </span>{details.place_of_birth ? details.place_of_birth : 'N/A'}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Birthday: </span>{details.birthday ? formatDate(details.birthday) : 'N/A'}
            </li>
            <li
              className="px-4 py-3 border-2 border-t-0 border-light-gray"
            >
              <span className="text-white font-bold">Died: </span>{details.deathday ? formatDate(details.deathday) : 'N/A'}
            </li>
            {details.homepage && (
              <li
                className="px-4 py-3 border-2 border-t-0 border-light-gray break-words"
              >
                <span className="text-white font-bold">Website: </span><Link className="text-yellow-400 underline break-all" href={details.homepage} target="_blank">{details.homepage}</Link>
              </li>
            )}
          </ul>

          <a
            href={`http://imdb.com/title/${details.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="mt-5"
              type="submit"
            >
              View On IMDb
            </Button>
          </a>
        </div>
      </div>

      {details.biography && (
        <>
          <h2 className="text-3xl text-white mt-12">Biography:</h2>

          <p className="text-lightest-gray">{details.biography}</p>
        </>
      )}
    </div>
  )
}

export default PersonDetails
