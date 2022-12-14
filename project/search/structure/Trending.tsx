import React from 'react'
import Carousel from '../../../components/Carousel'
import MovieCarouselCard from '../../../components/Carousel/CarouselCards/Movie/MovieCarouselCard'
import PeopleCarouselCard from '../../../components/Carousel/CarouselCards/People'
import TvCarouselCard from '../../../components/Carousel/CarouselCards/TV'

const Trending = ({ isLoading, trending }) => {
  const carouselMovieItems = trending.movies.map((item) => (
    <MovieCarouselCard item={item} />
  ))

  const carouselTvItems = trending.tv.map((item) => (
    <TvCarouselCard item={item} />
  ))

  const carouselPeopleItems = trending.people.map((item) => (
    <PeopleCarouselCard item={item} />
  ))

  return (
    <>
      {!isLoading && trending.movies.length > 0 && (
        <div className="my-12">
          <h2 className="text-3xl text-yellow-400 font-rockSalt mb-5">Trending Movies</h2>

          <Carousel carouselItems={carouselMovieItems} />
        </div>
      )}

      {!isLoading && trending.tv.length > 0 && (
        <div className="my-12">
          <h2 className="text-3xl text-yellow-400 font-rockSalt mb-5">Trending Series</h2>

          <Carousel carouselItems={carouselTvItems} />
        </div>
      )}

      {!isLoading && trending.people.length > 0 && (
        <div className="my-12">
          <h2 className="text-3xl text-yellow-400 font-rockSalt mb-5">Trending People</h2>

          <Carousel carouselItems={carouselPeopleItems} />
        </div>
      )}
    </>
  )
}

export default Trending
