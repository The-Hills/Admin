import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingAPI from '../../API/bookings';

export const getBookingData = createAsyncThunk('booking/getBookingData', async () => {
  const response = await bookingAPI.getBookingList();
  return response;
});
