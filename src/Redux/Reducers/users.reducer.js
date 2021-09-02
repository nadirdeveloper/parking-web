import { userConstants } from '../../Constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_DASHBOARD_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_DASHBOARD_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GET_DASHBOARD_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}