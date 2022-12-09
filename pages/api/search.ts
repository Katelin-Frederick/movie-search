import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { page, searchTerm, searchType, year }
  } = req;

  try {
    const response = await fetch(`https://www.omdbapi.com/?page=${page}&s=${searchTerm}&y=${year}&type=${searchType}&apikey=${process.env.OMDBI_KEY}`)
      .then((info) => info.json())
      .then((data) => {
        if (data.Error === 'Movie not found!') {
          return { results: [], totalResults: 0 }
        }

        return { results: data.Search, totalResults: data.totalResults }
      })

    res.status(200).json(response)
  } catch (error) {
    console.error('ERROR Fetching Data', error)
  }
}
