import { addDays, format, } from 'date-fns'

const formatDate = (date: string) => {
  if (date === '') {
    return 'N/A'
  }

  const newDate = new Date(addDays(new Date(date ?? ''), 1))

  const formattedDate = format(newDate, 'MMMM dd, yyyy')

  return formattedDate
}

export default formatDate