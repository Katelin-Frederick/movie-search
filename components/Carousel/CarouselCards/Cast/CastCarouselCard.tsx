import { useRouter } from 'next/router'
import Image from 'next/image'
import Button from '../../../Button'

const PeopleCarouselCard = ({ item }) => {
  const router = useRouter()

  return (
    <li className="text-white flex justify-center items-center flex-col">
      <div className="w-[300px] sm:w-[250px] md:w-[200px] lg:w-full border-2 border-light-gray rounded-md shadow-xl">
        {item.profile_path && (
          <Image
            alt={item.name}
            src={`https://image.tmdb.org/t/p/w185/${item.profile_path}`}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '100%', height: '100%' }}
            className="rounded-t-md"
            priority
          />
        )}

        <div className="flex flex-col justify-center items-center px-3 py-5 border-t-2 border-light-gray">
          <h3 className="text-3xl mb-5 text-center">{item.name}</h3>

          <h4 className="text-lg mb-5 text-center">{item.character}</h4>

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

export default PeopleCarouselCard
