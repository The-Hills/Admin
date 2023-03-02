import { createSlice } from '@reduxjs/toolkit';
import { getUserData } from './thunk';

const initialState = {
  data: [],
  loading: false,
  error: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state, action) => {
      console.log('💩: action', action);
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.data = action?.payload?.data;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      console.log('💩: action', action);
      state.loading = false;
      state.error.push(action.error);
    });
  },
});

export const { addTask } = userSlice.actions;
export default userSlice.reducer;
