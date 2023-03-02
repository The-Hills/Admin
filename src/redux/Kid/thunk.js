import { createAsyncThunk } from '@reduxjs/toolkit';
import kidAPI from '../../API/kids';

export const getKidData = createAsyncThunk('kid/getKidData', async () => {
  const response = await kidAPI.getKidList();
  return response;
});
