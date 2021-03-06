import { dashboardConstants } from '../../Constants';
const initialState = { loading: true, data: [] }
export function users(state = initialState, action) {
  switch (action.type) {
    case dashboardConstants.GET_USERS_REQUEST:
      return {
        loading: true
      };
    case dashboardConstants.GET_USERS_SUCCESS:
      return {
        data: action.data,
        loading: false
      };
    case dashboardConstants.GET_USERS_FAILURE:
      return {
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}