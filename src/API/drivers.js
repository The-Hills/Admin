import axiosClient from './index';

const driverAPI = {
  getDriverList: async () => {
    const url = '/driver';
    return axiosClient.get(url);
  },

  updateVeriyDriver: async (id, data) => {
    console.log('api =>', data);
    const url = `/driver/${id}`;
    return axiosClient.put(url, data);
  },
};

export default driverAPI;
