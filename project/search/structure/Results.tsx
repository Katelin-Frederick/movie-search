import { useContext } from 'react'
import { useFormikContext } from 'formik'
import Pagination from '../../../components/Pagination'
import ResultsList from '../../../components/ResultsList'
import SiteContext from '../../../context/SiteContext/SiteContext'
import SiteContextType from '../../../types/SiteContextType'
import ValuesType from '../../../types/ValuesType'

const Results = ({ isLoading, showNoResults, onSubmit }) => {
  const { site } = useContext<SiteContextType>(SiteContext)
  const { values } = useFormikContext<ValuesType>()

  return (
    <>
      {!isLoading && showNoResults && (
        <div className="text-yellow-400 my-20">
          <h3 className="text-3xl">Hmmm...</h3>

          <p className="text-2xl my-3">
            We couldn&apos;t find any matches for <span className="font-bold italic">{`"${values.searchTerm}"`}</span>
          </p>

          <p>Double check your search for any typos or spelling errors - or try a different search term.</p>
        </div>
      )}

      {!isLoading && site.results.length > 0 && (
        <ResultsList results={site.results} />
      )}

      {!isLoading && site.totalPages > 1 && (
        <Pagination
          className="my-12"
          totalPages={site.totalPages}
          onPageChange={(e) => onSubmit(values, e.selected + 1)}
          page={site.page - 1}
        />
      )}
    </>
  )
}

export default Results
