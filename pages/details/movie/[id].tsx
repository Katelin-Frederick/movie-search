import Details from '../../../project/details/details'

const Home = ({ details, collections, credits }) => (
  <div className="container mx-auto max-h-[1280px]">
    <Details
      details={details}
      collections={collections}
      credits={credits}
    />
  </div>
)

export default Home

export async function getServerSideProps({ params }) {
  const { id } = params

  const detailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
  const collectionsURL = `https://api.themoviedb.org/3/collection/656?api_key=${process.env.TMDB_KEY}`
  const creditsURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`

  const [detailsRes, collectionsRes, creditsRes] = await Promise.all([
    fetch(detailsURL),
    fetch(collectionsURL),
    fetch(creditsURL),
  ])

  const [details, collections, credits] = await Promise.all([
    detailsRes.json(),
    collectionsRes.json(),
    creditsRes.json(),
  ])

  return {
    props: {
      details,
      collections,
      credits,
    }
  }
}
