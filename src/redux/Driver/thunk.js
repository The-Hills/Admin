import { createAsyncThunk } from '@reduxjs/toolkit';
import driverAPI from '../../API/drivers';

export const getDriverData = createAsyncThunk('driver/getDriverData', async () => {
  const response = await driverAPI.getDriverList();
  return response.data;
});

export const updateDriverData = createAsyncThunk('driver/updateDriverData', async ({id, data}) => {
  const response = await driverAPI.updateVeriyDriver(id, data);
  return response;
});
