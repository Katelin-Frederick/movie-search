import MovieListItem from './MovieListItem'

const MovieList = ({ results }) => {
  return (
    <ul className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((item) => (
        <MovieListItem key={item.imdbID} item={item} />
      ))}
    </ul>
  )
}

export default MovieList