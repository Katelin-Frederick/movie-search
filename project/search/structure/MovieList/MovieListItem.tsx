import { useRouter } from 'next/router'
import Button from '../../../../components/Button'
import Image from 'next/image'

const MovieListItem = ({ item }) => {
  const router = useRouter()

  return (
    <li className="text-white flex justify-center items-start">
      <div className="w-[300px] border-2 border-light-gray rounded-md shadow-xl">
        {item.Poster && item.Poster !== 'N/A' && (
          <Image
            alt='user profile picture'
            src={item.Poster}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '300px', height: '450px' }}
            className="rounded-t-md"
          />
        )}

        {!item.Poster || item.Poster === 'N/A' && (
          <div className="flex justify-center items-center bg-gray w-[300px] h-[450px] text-2xl">
            <p>No Poster Available</p>
          </div>
        )}

        <h2 className="text-center mx-2 my-3 text-3xl">{item.Title}</h2>

        <div className="flex justify-center items-center px-3 py-5">
          <Button
            type='button'
            className="text-black"
            onClick={() => router.push(`/details/${item.imdbID}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </li>
  )
}

export default MovieListItem