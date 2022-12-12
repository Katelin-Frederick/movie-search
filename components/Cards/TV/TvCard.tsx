import { useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import SiteContext from '../../../context/SiteContext/SiteContext'
import SiteContextType from '../../../types/SiteContextType'
import Button from '../../Button'

const TvCard = ({ item }) => {
  const router = useRouter()
  const { site } = useContext<SiteContextType>(SiteContext)

  return (
    <li className="text-white flex items-center flex-col mb-5">
      <div className="w-[250px] border-2 border-light-gray rounded-md shadow-xl relative">
        {site.type === '' && (
          <span className="absolute top-0 right-0 bg-teal-500 rounded-md p-1 text-xs font-bold">Series</span>
        )}

        {item.poster_path && (
          <Image
            alt={item.name}
            src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '100%', height: '350px' }}
            className="rounded-t-md"
          />
        )}

        {!item.poster_path && (
          <div className="flex justify-center items-center bg-gray w-[100%] h-[350px] text-2xl">
            <p>No Image Available</p>
          </div>
        )}

        <div className="flex flex-col justify-center items-center px-3 py-5 border-t-2 border-light-gray">
          <h3 className="text-3xl mb-5 text-center">{item.name}</h3>

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

export default TvCard
