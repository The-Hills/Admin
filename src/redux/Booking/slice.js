import { createSlice } from '@reduxjs/toolkit';
import { getBookingData } from './thunk';

const initialState = {
  data: [],
  loading: false,
  error: [],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getBookingData.pending, (state, action) => {
      console.log('💩: action', action);
      state.loading = true;
    });

    builder.addCase(getBookingData.fulfilled, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.data = action?.payload?.data?.data;
    });

    builder.addCase(getBookingData.rejected, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.error.push(action.error);
    });
  },
});

export const { addTask } = bookingSlice.actions;

export default bookingSlice.reducer;
