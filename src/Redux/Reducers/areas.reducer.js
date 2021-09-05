import { dashboardConstants } from '../../Constants';
const initialState = { loading: false, data: [] }
export function areas(state = initialState, action) {
  switch (action.type) {
    case dashboardConstants.GET_AREAS_REQUEST:
      return {
        loading: true
      };
    case dashboardConstants.GET_AREAS_SUCCESS:
      return {
        data: action.data,
        loading: false
      };
    case dashboardConstants.GET_AREAS_FAILURE:
      return {
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}