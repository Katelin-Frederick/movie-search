import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/SiteContext/SiteContext'
import ValuesType from '../../../types/ValuesType'

const AutoSubmit = () => {
  const { siteDispatch } = useContext(SiteContext)
  const { values } = useFormikContext<ValuesType>()

  useEffect(() => {
    siteDispatch({
      type: 'UPDATE_VALUES',
      payload: values
    })
  }, [values])

  return null
}

export default AutoSubmit