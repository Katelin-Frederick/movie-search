import type { CrewMember, } from '~/types/credits'

const getDirector = (crew: CrewMember[]) => {
  if (crew.length === 0) {
    return 'N/A'
  }

  return crew.filter((person) => person.job === 'Director').map((person) => person.name).join(', ')
}

export default getDirector