import { useReducer } from 'react'
import type { AppProps } from 'next/app'
import site from '../context/SiteContext/site.json'
import SiteContext from '../context/SiteContext/SiteContext'
import SiteReducer from '../context/SiteContext/SiteReducer'
import '../styles/globals.css'
import '../styles/Pagination.css'
import '../styles/Spinner.css'

const App = ({ Component, pageProps }: AppProps) => {
  const [siteState, siteDispatch] = useReducer(SiteReducer, site)

  const Site = {
    site: siteState,
    siteDispatch
  }

  return (
    <SiteContext.Provider value={Site}>
      <Component {...pageProps} />
    </SiteContext.Provider>
  )
}

export default App
