import ResultsType from './ResultsType'
import ValuesType from './ValuesType'

type SiteType = {
  values: ValuesType
  page: number
  results: ResultsType[]
  totalPages: number
  type: '' | 'movie' | 'tv' | 'person'
}

export default SiteType
