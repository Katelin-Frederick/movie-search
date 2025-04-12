export type TMDBSearchItem = {
  id: number
  title?: string
  name?: string
  media_type: 'movie' | 'tv' | 'person'
  overview: string
  release_date?: string
  first_air_date?: string
  poster_path?: string
}

export type TMDBSearchResult = {
  page: number
  results: Array<TMDBSearchItem>
  total_pages: number
  total_results: number
}

export type SearchType = 'movie' | 'tv' | 'person' | 'multi'

export type SearchValues = {
  searchType: SearchType
  searchValue: string
  year: string | null
}

export type DisplayType = 'movie' | 'tv' | 'person' | 'multi'