import PersonDetails from '../../../project/details/PersonDetails'

const Home = ({ credits, details }) => (
  <div className="container mx-auto max-h-[1280px]">
    <PersonDetails credits={credits} details={details} />
  </div>
)

export default Home

export async function getServerSideProps({ params }) {
  const { id } = params

  const creditsURL = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.TMDB_KEY}&include_adult=false`
  const detailsURL = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&include_adult=false`

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
