import Details from '../../project/details/details'

const Home = ({ details }) => {
  return (
    <Details details={details} />
  )
}

export default Home

export async function getServerSideProps({ params }) {
  const { id } = params

  const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDBI_KEY}`)

  const data = await response.json()

  return {
    props: {
      details: data
    }
  }
}