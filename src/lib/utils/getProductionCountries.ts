import type { ProductionCountry, } from '~/types/types'

const getProductionCountries = (productionCountryList: ProductionCountry[]) => {
  if (productionCountryList.length === 0) {
    return 'N/A'
  }

  return productionCountryList.map((country) => country.name).join(', ')
}

export default getProductionCountries