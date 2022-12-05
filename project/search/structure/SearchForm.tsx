import { useFormikContext } from 'formik'
import Button from '../../../components/Button'
import Dropdown from '../../../components/Dropdown'
import TextField from '../../../components/TextField'

const SearchForm = () => {
  const { resetForm } = useFormikContext()

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

          <TextField
            className="md:pr-3 mb-5 md:mb-0"
            label="Year"
            name="year"
            maxLength={4}
            placeholder="Enter Year"
          />

          <Dropdown
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
                value: 'series',
                label: 'Series'
              },
            ]}
          />
        </div>

        <div className='flex flex-col md:flex-row justify-center items-center mt-5'>
          <Button
            onClick={() => resetForm()}
            type='button'
          >
            Reset
          </Button>

          <Button
            className="mt-5 md:mt-0 md:ml-4"
            type='submit'
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchForm