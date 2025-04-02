
import { HydrateClient, api, } from '~/trpc/server'
import { rockSalt, } from '~/fonts'
import { cn, } from '~/lib/utils'

const Home = async () => {
  const trendingMoves = await api.movies.getTrending()
  const trendingSeries = await api.series.getTrending()
  const trendingPeople = await api.people.getTrending()

  console.log('trendingMoves', trendingMoves)
  console.log('trendingSeries', trendingSeries)
  console.log('trendingPeople', trendingPeople)

  return (
    <HydrateClient>
      <main>
        <h1
          className={cn('text-3xl md:text-[40px] text-yellow-500 mb-10 text-center', rockSalt.className)}
        >
          Screen Scout
        </h1>

        <h2>Trending Movies</h2>
        {trendingMoves.results.map((movie) => (
          <p key={movie.id}>{movie.title}</p>
        ))}

        <h2>Trending Series</h2>
        {trendingSeries.results.map((series) => (
          <p key={series.id}>{series.name}</p>
        ))}

        <h2>Trending People</h2>
        {trendingPeople.results.map((people) => (
          <p key={people.id}>{people.name}</p>
        ))}
      </main>
    </HydrateClient>
  )
}

export default Home