import axiosClient from './index';

const bookingAPI = {
  getBookingList: async () => {
    const url = '/booking';
    return axiosClient.get(url);
  },

  getDataStatistical: async () => {
    const url = '/booking/statistical';
    return axiosClient.get(url);
  },

  getDataStatisticalByDate: async (date) => {
    const url = `/booking/statisticalbydate/?date=${date}`;
    return axiosClient.get(url);
  },

  getDataStatisticalByMonth: async (month, year) => {
    const url = `/booking/statisticalbymonth/?month=${month}&year=${year}`;
    return axiosClient.get(url);
  },
};

export default bookingAPI;
