import { dashboardConstants } from '../../Constants';

export function feedbacks(state = {}, action) {
  switch (action.type) {
    case dashboardConstants.GET_FEEDBACKS_REQUEST:
      return {
        loading: true
      };
    case dashboardConstants.GET_FEEDBACKS_SUCCESS:
      return {
        data: action.allFeedbacks,
        loading: false
      };
    case dashboardConstants.GET_FEEDBACKS_FAILURE:
      return {
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}