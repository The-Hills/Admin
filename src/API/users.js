import axiosClient from './index';

const userAPI = {
  getUserList: async () => {
    const url = '/';
    return axiosClient.get(url);
  },

  getUserById: async (id) => {
    const url = `/${id}`;
    return axiosClient.get(url);
  },
};

export default userAPI;
