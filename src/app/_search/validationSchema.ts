import * as Yup from 'yup'

export const validationSchema = Yup.object({
  searchValue: Yup.string()
    .required('Search term is required')
    .min(3, 'Search term must be at least 3 characters long')
    .max(50, 'Search term cannot exceed 50 characters'),

  searchType: Yup.string()
    .required('Please select a search type'),

  year: Yup.string()
    .when('searchType', {
      is: (val: string) => val === 'movie' || val === 'tv',
      then: (schema) => schema
        .matches(/^\d{4}$/, 'Year must be a 4-digit number')
        .test('valid-year', 'Year must be between 1800 and current year', (value) => {
          if (!value) return true

          const num = parseInt(value, 10)
          const currentYear = new Date().getFullYear()

          return num >= 1800 && num <= currentYear
        }),
      otherwise: (schema) => schema.strip(),
    }),
})