import React, { useContext } from 'react'
import MovieCard from '../Cards/Movie'
import TvCard from '../Cards/TV'
import PeopleCard from '../Cards/People'
import SiteContext from '../../context/SiteContext/SiteContext'
import SiteContextType from '../../types/SiteContextType'

const ResultsList = ({ results }) => {
  const { site } = useContext<SiteContextType>(SiteContext)
  const { type } = site

  return (
    <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((item) => (
        <React.Fragment key={item.id}>
          {(type === 'movie' || item.media_type === 'movie') && (
            <MovieCard key={`${item.id}-${type}`} item={item} />
          )}

          {(type === 'tv' || item.media_type === 'tv') && (
            <TvCard key={`${item.id}-${type}`} item={item} />
          )}

          {(type === 'person' || item.media_type === 'person') && (
            <PeopleCard key={`${item.id}-${type}`} item={item} />
          )}
        </React.Fragment>
      ))}
    </ul>
  )
}

export default ResultsList
