import Details from '../../../project/details/MovieDetails'

const Home = ({ details }) => (
  <div className="container mx-auto max-h-[1280px]">
    <Details details={details} />
  </div>
)

export default Home

export async function getServerSideProps({ params }) {
  const { id } = params

  const response = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=${process.env.OMDBI_KEY}`)

  const data = await response.json()

  return {
    props: {
      details: data
    }
  }
}
