import { useContext } from 'react'
import { useFormikContext } from 'formik'
import Button from '../../../components/Button'
import Dropdown from '../../../components/Dropdown'
import TextField from '../../../components/TextField'
import SiteContext from '../../../context/SiteContext/SiteContext'
import ValuesType from '../../../types/ValuesType'

const SearchForm = ({ setShowNoResults }) => {
  const { siteDispatch } = useContext(SiteContext)

  const { values, resetForm } = useFormikContext<ValuesType>()

  return (
    <div className="flex justify-center items-center my-14">
      <div className="bg-gray rounded-lg p-4 md:p-8 w-full md:w-auto shadow-xl">
        <div className="flex flex-col md:flex-row justify-evenly">
          <TextField
            className="md:pr-3 mb-5 md:mb-0"
            label="Search Term"
            name="searchTerm"
            maxLength={30}
            placeholder="Enter Search Term"
          />

          <Dropdown
            className="md:pr-3"
            label="Search Type"
            name="searchType"
            options={[
              {
                value: '',
                label: 'Select An Option',
                disabled: true,
              },
              {
                value: 'movie',
                label: 'Movie'
              },
              {
                value: 'tv',
                label: 'Series'
              },
              {
                value: 'person',
                label: 'Person'
              },
            ]}
          />

          {(values.searchType === 'movie' || values.searchType === 'tv') && (
            <TextField
              className="mb-5 md:mb-0"
              label="Year"
              name="year"
              maxLength={4}
              placeholder="Enter Year"
            />
          )}

        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-5">
          <Button
            variant="secondary"
            onClick={() => {
              resetForm()
              setShowNoResults(false)

              siteDispatch({
                type: 'UPDATE_RESULTS',
                payload: []
              })

              siteDispatch({
                type: 'UPDATE_TYPE',
                payload: ''
              })

              siteDispatch({
                type: 'UPDATE_TOTAL_PAGES',
                payload: 0
              })

              siteDispatch({
                type: 'UPDATE_PAGE',
                payload: 0
              })
            }}
            type="button"
          >
            Reset
          </Button>

          <Button
            className="mt-5 md:mt-0 md:ml-4"
            type="submit"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
