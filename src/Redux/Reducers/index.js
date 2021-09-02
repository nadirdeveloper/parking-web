import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { areas } from './areas.reducer';
import { dashboard } from './dashboard.reducer'
import { bookings } from './bookings.reducer'
import { parkings } from './parkings.reducer'
import { feedbacks } from './feedbacks.reducer'
const rootReducer = combineReducers({
  authentication,
  dashboard,
  users,
  areas,
  bookings,
  parkings,
  feedbacks
});

export default rootReducer;