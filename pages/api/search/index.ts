import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { searchTerm, searchType, year, page }
  } = req

  try {
    const yearQuery = searchType === 'movie' ? `&primary_release_year=${year}` : searchType === 'tv' ? `&first_air_date_year=${year}` : ''

    const response = await fetch(`https://api.themoviedb.org/3/search/${searchType === '' ? 'multi' : searchType}?api_key=${process.env.TMDB_KEY}&include_adult=false&page=${page}&query=${searchTerm}${yearQuery}`)
      .then((info) => info.json())
      .then((data) => data)

    res.status(200).json(response)
  } catch (error) {
    console.error('ERROR Fetching Data', error)
  }
}
