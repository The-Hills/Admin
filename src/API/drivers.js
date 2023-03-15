import axiosClient from './index';

const driverAPI = {
  getDriverList: async () => {
    const url = '/driver';
    return axiosClient.get(url);
  },

  updateVeriyDriver: async (id, data) => {
    const url = `/driver/${id}`;
    return axiosClient.put(url, data);
  },

  getDriverById: async (id) => {
    const url = `/driver/${id}`;
    return axiosClient.get(url);
  },
};

export default driverAPI;
