import Crew from '../../../../../project/details/Crew'

const Home = ({ credits, details }) => (
  <div className="container mx-auto max-h-[1280px]">
    <Crew
      credits={credits}
      details={details}
    />
  </div>
)

export default Home

export async function getServerSideProps({ params }) {
  const { id } = params

  const creditsURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}&include_adult=false`
  const detailsURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&include_adult=false`

  const [creditsRes, detailsRes] = await Promise.all([
    fetch(creditsURL),
    fetch(detailsURL),
  ])

  const [credits, details] = await Promise.all([
    creditsRes.json(),
    detailsRes.json(),
  ])

  return {
    props: {
      credits,
      details,
    }
  }
}
