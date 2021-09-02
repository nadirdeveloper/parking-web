import { dashboardConstants } from '../../Constants';

export function bookings(state = {}, action) {
  switch (action.type) {
    case dashboardConstants.GET_BOOKINGS_REQUEST:
      return {
        loading: true
      };
    case dashboardConstants.GET_BOOKINGS_SUCCESS:
      return {
        data: action.allBookings,
        loading: false
      };
    case dashboardConstants.GET_BOOKINGS_FAILURE:
      return { 
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}