import axiosClient from './index';

const kidAPI = {
  getKidList: async () => {
    const url = '/kid';
    return axiosClient.get(url);
  },
};

export default kidAPI;
