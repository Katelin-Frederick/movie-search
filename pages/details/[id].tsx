import Details from '../../project/details/details'

const Home = ({ details }) => {
  return (
    <div className='container mx-auto'>
      <Details details={details} />
    </div>
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