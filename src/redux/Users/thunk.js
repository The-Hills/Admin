import { createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../../API/users';

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  const response = await userAPI.getUserList();
  return response.data;
});


