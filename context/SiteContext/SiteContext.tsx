import { createContext } from 'react'
import SiteContextType from '../../types/SiteContextType'

const Site: SiteContextType = {
  site: {
    values: {
      searchType: '',
      searchTerm: '',
      year: ''
    },
    page: 0,
    results: [],
    totalPages: 0
  },
  siteDispatch: ({ type, payload }) => { },
}

const SiteContext = createContext(Site)

export default SiteContext
