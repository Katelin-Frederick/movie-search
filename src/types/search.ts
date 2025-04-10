export type TMDBSearchResult = {
  page: number
  results: Array<{
    id: number
    title?: string
    name?: string
    media_type: string
    overview: string
    release_date?: string
    first_air_date?: string
    poster_path?: string
  }>
  total_pages: number
  total_results: number
}

export type SearchType = 'movie' | 'tv' | 'person' | 'multi'

export type SearchValues = {
  searchType: SearchType
  searchValue: string
  year: string | null
}