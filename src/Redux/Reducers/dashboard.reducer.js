import { userConstants } from '../../Constants';
const initialState = { loading: false, data: {} }
export function dashboard(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_DASHBOARD_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_DASHBOARD_SUCCESS:
      return {
        data: action.data,
        loading: false
      };
    case userConstants.GET_DASHBOARD_FAILURE:
      return {
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}