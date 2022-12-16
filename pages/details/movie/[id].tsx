import Details from '../../../project/details/details'

const Home = ({ collections, credits, details, rating, recommended }) => (
  <div className="container mx-auto max-h-[1280px]">
    <Details
      collections={collections}
      credits={credits}
      details={details}
      rating={rating}
      recommended={recommended}
    />
  </div>
)

export default Home

export async function getServerSideProps({ params }) {
  const { id } = params

  const creditsURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
  const detailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
  const ratingsURL = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.TMDB_KEY}`
  const recommendedURL = `https://api.themoviedb.org/3/movie/176/recommendations?api_key=${process.env.TMDB_KEY}`

  const [creditsRes, detailsRes, ratingsRes, recommendedRes] = await Promise.all([
    fetch(creditsURL),
    fetch(detailsURL),
    fetch(ratingsURL),
    fetch(recommendedURL),
  ])

  const [credits, details, allRatings, recommended] = await Promise.all([
    creditsRes.json(),
    detailsRes.json(),
    ratingsRes.json(),
    recommendedRes.json()
  ])

  const collections = details?.belongs_to_collection ?
    await fetch(`https://api.themoviedb.org/3/collection/${details?.belongs_to_collection?.id}?api_key=${process.env.TMDB_KEY}`).then((data) => data.json())
    : []
  const usRating = allRatings.results.find((item) => item.iso_3166_1 === 'US')
    .release_dates.find((item) => item.note === '').certification

  return {
    props: {
      details,
      collections,
      credits,
      rating: usRating,
      recommended,
    }
  }
}
