import axiosClient from './index';

const kidAPI = {
  getKidList: async () => {
    const url = '/kid';
    return axiosClient.get(url);
  },
  getKidById: async (id) => {
    const url = `/kid/${id}`;
    return axiosClient.get(url);
  },
};

export default kidAPI;
