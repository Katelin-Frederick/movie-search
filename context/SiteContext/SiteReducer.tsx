import ResultsType from '../../types/ResultsType'
import ValuesType from '../../types/ValuesType'

type SiteStateType = {
  values: ValuesType,
  page: number,
  results: ResultsType[],
  totalPages: number
}

type UpdateValuesActionType = {
  type: 'UPDATE_VALUES'
  payload: ValuesType
}

type UpdatePageActionType = {
  type: 'UPDATE_PAGE'
  payload: number
}

type UpdateResultsActionType = {
  type: 'UPDATE_RESULTS'
  payload: ResultsType[]
}

type UpdateTotalPagesActionType = {
  type: 'UPDATE_TOTAL_PAGES'
  payload: number
}

type UpdateTypeActionType = {
  type: 'UPDATE_TYPE'
  payload: '' | 'movie' | 'tv' | 'person'
}

type SiteActionType = UpdateValuesActionType | UpdatePageActionType | UpdateResultsActionType | UpdateTotalPagesActionType | UpdateTypeActionType

const updateValues = (payload: any, state: SiteStateType) => ({
  ...state,
  values: payload
})

const updatePage = (payload: number, state: SiteStateType) => ({
  ...state,
  page: payload
})

const updateResults = (payload: ResultsType[], state: SiteStateType) => ({
  ...state,
  results: payload
})

const updateTotalPages = (payload: number, state: SiteStateType) => ({
  ...state,
  totalPages: payload
})

const updateType = (payload: '' | 'movie' | 'tv' | 'person', state: SiteStateType) => ({
  ...state,
  type: payload
})

const SiteReducer = (state: SiteStateType, action: SiteActionType) => {
  switch (action.type) {
    case 'UPDATE_VALUES':
      return updateValues(action.payload, state)
    case 'UPDATE_PAGE':
      return updatePage(action.payload, state)
    case 'UPDATE_RESULTS':
      return updateResults(action.payload, state)
    case 'UPDATE_TOTAL_PAGES':
      return updateTotalPages(action.payload, state)
    case 'UPDATE_TYPE':
      return updateType(action.payload, state)
    default:
      return state
  }
}

export default SiteReducer
