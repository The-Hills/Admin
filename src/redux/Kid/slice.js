import { createSlice } from '@reduxjs/toolkit';
import { getKidData } from './thunk';

const initialState = {
  data: [],
  loading: false,
  error: [],
};

export const kidSlice = createSlice({
  name: 'kid',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getKidData.pending, (state, action) => {
      console.log('💩: action', action);
      state.loading = true;
    });
    builder.addCase(getKidData.fulfilled, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.data = action?.payload?.data?.data;
    });
    builder.addCase(getKidData.rejected, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.error.push(action.error);
    });
  },
});

export const { addTask } = kidSlice.actions;
export default kidSlice.reducer;
