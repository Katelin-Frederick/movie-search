import { createCallerFactory, createTRPCRouter, } from '~/server/api/trpc'
import { seriesRouter, } from '~/server/api/routers/series'
import { peopleRouter, } from '~/server/api/routers/people'
import { searchRouter, } from '~/server/api/routers/search'
import { movieRouter, } from '~/server/api/routers/movies'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  search: searchRouter,
  movies: movieRouter,
  series: seriesRouter,
  people: peopleRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
