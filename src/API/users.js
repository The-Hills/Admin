import axiosClient from './index';

const userAPI = {
  getUserList: async () => {
    const url = '/';
    return axiosClient.get(url);
  },

  getUserId: async (id) => {
    const url = `/${id}`;
    return axiosClient.get(url);
  },
};

export default userAPI;
