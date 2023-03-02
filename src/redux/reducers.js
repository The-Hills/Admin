import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './Users/slice';
import { driverSlice } from './Driver/slice';
import { kidSlice } from './Kid/slice';
import { bookingSlice } from './Booking/slice';

const rootReducer = combineReducers({
  getUserReducer: userSlice.reducer,
  getDriverReducer: driverSlice.reducer,
  getKidReducer: kidSlice.reducer,
  getBookingReducer: bookingSlice.reducer,
});

export default rootReducer;
