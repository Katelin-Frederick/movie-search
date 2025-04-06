
import { HydrateClient, } from '~/trpc/server'

import Trending from './_trending/page'

const Home = async () => (
  <HydrateClient>
    <main className='flex flex-col justify-center items-center'>
      <div className='container py-14'>
        <Trending />
      </div>
    </main>
  </HydrateClient>
)

export default Home