import { createSlice } from '@reduxjs/toolkit';
import { getDriverData, updateDriverData } from './thunk';

const initialState = {
  data: [],
  loading: false,
  error: [],
};

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDriverData.pending, (state, action) => {
      console.log('💩: action', action);
      state.loading = true;
    });
    builder.addCase(getDriverData.fulfilled, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.data = action?.payload?.data;
    });
    builder.addCase(getDriverData.rejected, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.error.push(action.error);
    });

    builder.addCase(updateDriverData.pending, (state, action) => {
      console.log('💩: action', action);
      state.loading = true;
    });
    builder.addCase(updateDriverData.fulfilled, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      const index = state.data.findIndex((obj) => obj.id === action?.payload?.data?.data?.id);
      state.data[index] = action?.payload?.data.data;
    });
    builder.addCase(updateDriverData.rejected, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.error.push(action.error);
    });
  },
});

export const { addTask } = driverSlice.actions;
export default driverSlice.reducer;
