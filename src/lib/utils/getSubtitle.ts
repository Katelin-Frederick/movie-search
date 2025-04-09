type MediaType = 'movie' | 'series' | 'person'

const getSubtitle = (mediaType: MediaType, rating: string): string => {
  let subtitle = `${mediaType}`

  switch (mediaType) {
    case 'movie': {
      subtitle = 'Movie'
      break
    }
    case 'series': {
      subtitle = 'TV Series'
      break
    }
    case 'person': {
      subtitle = 'Person'
      break
    }
    default: {
      subtitle = ''
    }
  }

  if (rating) {
    subtitle = `${subtitle} | ${rating}`
  }

  return subtitle
}

export default getSubtitle
