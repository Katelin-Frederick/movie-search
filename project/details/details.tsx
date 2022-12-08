import { useRouter } from 'next/router'
import Image from 'next/image'
import Button from '../../components/Button'

const Details = ({ details }) => {
  const router = useRouter()
  console.log('details', details)

  return (
    <div className="my-8">
      <h1 className="text-5xl text-white mb-6">{details.Title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
        <Image
          alt="user profile picture"
          src={details.Poster}
          width="0"
          height="0"
          sizes="100vw"
          className="rounded-t-md col-span-1 w-full h-auto md:w-auto md:h-full"
        />

        <ul className="flex flex-col bg-gray rounded-md border-t-2 border-light-gray text-lightest-gray">
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Genre: </span>{details.Genre}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Actors: </span>{details.Actors}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Awards: </span>{details.Awards}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">BoxOffice: </span>{details.BoxOffice}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Country: </span>{details.Country}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Director: </span>{details.Director}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Language: </span>{details.Language}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Rated: </span>{details.Rated}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Released: </span>{details.Released}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Runtime: </span>{details.Runtime}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Type: </span>{details.Type}
          </li>
          <li
            className="px-4 py-3 border-2 border-t-0 border-light-gray"
          >
            <span className="text-white font-bold">Writer: </span>{details.Writer}
          </li>
        </ul>

        <div className="rounded-md text-lightest-gray col-span-1 md:col-span-2 xl:col-span-1 mt-8 xl:mt-0">
          <h2 className="text-3xl text-white">Plot:</h2>

          <p>{details.Plot}</p>

          <ul className="rounded-md border-t-2 border-light-gray text-lightest-gray mt-8 inline-block">
            {details.Ratings.map((item, index) => (
              <li
                key={index}
                className="px-4 py-3 border-2 border-t-0 border-light-gray bg-gray w-full text-yellow-400"
              >
                <span className="text-white font-bold">{item.Source} </span>{item.Value}
              </li>
            ))}
          </ul>
        </div>
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
          className="mt-5 md:mt-0 md:ml-4"
          href={`http://imdb.com/title/${details.imdbID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
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
