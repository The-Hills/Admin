import axiosClient from './index';

export const login = async (data) => {
  const url = 'auth/login/admin';
  return axiosClient.post(url, data);
};
