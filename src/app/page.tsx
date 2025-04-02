
import { HydrateClient, } from '~/trpc/server'

const Home = async () => (
  <HydrateClient>
    <main>
      <p>test</p>
    </main>
  </HydrateClient>
)

export default Home