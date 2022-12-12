import * as Yup from 'yup'

const validationSchema = Yup.object({
  searchTerm: Yup.string()
    .required('Search Term is Required')
    .matches(/^[a-zA-Z\s0-9_]+$/),
  year: Yup.string()
    .when('searchType', {
      is: 'movie',
      then: (schema) => schema.matches(/^[0-9_]{4}$/, 'Must be a valid four digit year')
    })
    .when('searchType', {
      is: 'tv',
      then: (schema) => schema.matches(/^[0-9_]{4}$/, 'Must be a valid four digit year')
    })
})

export default validationSchema
