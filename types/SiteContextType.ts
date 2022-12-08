import { Dispatch } from 'react'
import SiteType from './SiteType'

type SiteContextType = {
  site: SiteType
  siteDispatch: Dispatch<any>
}

export default SiteContextType