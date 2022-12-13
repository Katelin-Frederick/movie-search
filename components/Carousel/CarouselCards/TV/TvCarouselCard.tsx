import { useRouter } from 'next/router'
import Image from 'next/image'
import Button from '../../../Button'

const TvCarouselCard = ({ item }) => {
  const router = useRouter()

  return (
    <li className="text-white flex justify-center items-center flex-col">
      <div className="w-[300px] sm:w-[250px] md:w-[200px] lg:w-full border-2 border-light-gray rounded-md shadow-xl">
        <Image
          alt={item.name}
          src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
          className="rounded-t-md"
          priority
        />

        <div className="flex justify-center items-center px-3 py-5 border-t-2 border-light-gray">
          <Button
            type="button"
            className="text-black"
            onClick={() => router.push(`/details/${item.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </li>
  )
}

export default TvCarouselCard
