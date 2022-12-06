export default async function handler(req, res) {
  const {
    query: { page, searchTerm, searchType, year }
  } = req;

  try {
    const response = await fetch(`https://www.omdbapi.com/?page=${page}&s=${searchTerm}&y=${year}&type=${searchType}&apikey=${process.env.OMDBI_KEY}`)
      .then(response => response.json())
      .then(data => data.Search)

    res.status(200).json(response)

  } catch (error) {
    console.error('ERROR Fetching Data', error)
  }
}