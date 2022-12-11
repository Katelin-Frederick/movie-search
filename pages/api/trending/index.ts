import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { type }
  } = req;

  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${process.env.TMDB_KEY}`)
      .then((info) => info.json())
      .then((data) => data)

    res.status(200).json(response)
  } catch (error) {
    console.error('ERROR Fetching Data', error)
  }
}
