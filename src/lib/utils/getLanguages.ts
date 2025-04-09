import type { SpokenLanguage, } from '~/types/types'

const getLanguages = (languageList: SpokenLanguage[]) => {
  if (languageList.length === 0) {
    return 'N/A'
  }

  return languageList.map((language) => language.name).join(', ')
}

export default getLanguages