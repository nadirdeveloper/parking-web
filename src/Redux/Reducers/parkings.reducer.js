import { dashboardConstants } from '../../Constants';

export function parkings(state = {}, action) {
  switch (action.type) {
    case dashboardConstants.GET_PARKINGS_REQUEST:
      return {
        loading: true
      };
    case dashboardConstants.GET_PARKINGS_SUCCESS:
      return {
        data: action.allParkings,
        loading: false
      };
    case dashboardConstants.GET_PARKINGS_FAILURE:
      return { 
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}