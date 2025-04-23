import axiosInstance from '../api/axiosInstance';
import { handleApiError } from '../../utils/errorHandler';


const USER_BASE_URL = '/usermanagement';

const UserService = {
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get(`${USER_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`${USER_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateUser: async (id, data) => {
    try {
      const response = await axiosInstance.put(`${USER_BASE_URL}/edit/${id}`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post(`${USER_BASE_URL}/create`, userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  


};

export default UserService;
