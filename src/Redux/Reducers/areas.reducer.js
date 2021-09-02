import { dashboardConstants } from '../../Constants';

export function areas(state = {}, action) {
  switch (action.type) {
    case dashboardConstants.GET_AREAS_REQUEST:
      return {
        loading: true
      };
    case dashboardConstants.GET_AREAS_SUCCESS:
      return {
        data: action.allAreas,
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