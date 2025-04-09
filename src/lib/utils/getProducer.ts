import type { CrewMember, } from '~/types/credits'

const getProducer = (crew: CrewMember[]) => {
  if (crew.length === 0) {
    return 'N/A'
  }

  return crew.filter((person) => person.job === 'Executive Producer' || person.job === 'Producer').map((person) => person.name).join(', ')
}

export default getProducer