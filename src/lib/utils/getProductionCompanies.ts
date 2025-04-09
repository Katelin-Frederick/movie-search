import type { ProductionCompany, } from '~/types/types'

const getProductionCompanies = (productionCompanyList: ProductionCompany[]) => {
  if (productionCompanyList.length === 0) {
    return 'N/A'
  }

  return productionCompanyList.map((company) => company.name).join(', ')
}

export default getProductionCompanies