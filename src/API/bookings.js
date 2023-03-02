import axiosClient from './index';

const bookingAPI = {
  getBookingList: async () => {
    const url = '/booking';
    return axiosClient.get(url);
  },
};

export default bookingAPI;
