import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingAPI from '../../API/bookings';

export const getBookingData = createAsyncThunk('booking/getBookingData', async () => {
  const response = await bookingAPI.getBookingList();
  return response;
});

export const getDataStatistical = createAsyncThunk('booking/getDataStatistical', async () => {
  const response = await bookingAPI.getDataStatistical();
  return response;
});
