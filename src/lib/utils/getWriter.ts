import type { CrewMember, } from '~/types/credits'

const getWriter = (crew: CrewMember[]) => {
  if (crew.length === 0) {
    return 'N/A'
  }

  return crew.filter((person) => person.job === 'Writer' || person.job === 'Story' || person.job === 'Screenplay').map((person) => person.name).join(', ')
}

export default getWriter