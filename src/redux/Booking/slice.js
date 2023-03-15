import { createSlice } from '@reduxjs/toolkit';
import { getBookingData, getDataStatistical } from './thunk';

const initialState = {
  data: [],
  loading: false,
  error: [],
  statistical: [],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getBookingData.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getBookingData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action?.payload?.data?.data;
    });

    builder.addCase(getBookingData.rejected, (state, action) => {
      state.loading = false;
      state.error.push(action.error);
    });

    builder.addCase(getDataStatistical.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getDataStatistical.fulfilled, (state, action) => {
      state.loading = false;
      state.statistical = action?.payload?.data?.data;
    });

    builder.addCase(getDataStatistical.rejected, (state, action) => {
      state.loading = false;
      state.error.push(action.error);
    });
  },
});

export const { addTask } = bookingSlice.actions;

export default bookingSlice.reducer;
