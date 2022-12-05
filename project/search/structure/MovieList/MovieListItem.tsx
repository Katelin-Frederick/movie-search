import { Router, useRouter } from 'next/router'
import Button from '../../../../components/Button'
import Image from 'next/image'

const MovieListItem = ({ item }) => {
  const router = useRouter()

  return (
    <li className="text-white flex justify-center items-start">
      <div className="w-[300px] border-2 border-gray rounded-md shadow-xl">
        <Image
          alt='user profile picture'
          src={item.Poster}
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: '300px', height: '450px' }}
          className="rounded-t-md"
        />

        <h2 className="text-center my-3 text-3xl">{item.Title}</h2>

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