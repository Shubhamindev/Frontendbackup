import axiosInstance from '../api/axiosInstance';
import { handleApiError } from '../../utils/errorHandler';

const AWS_BASE_URL = '/aws';

const AwsService = {
  getEC2Instances: async (accountId) => {
    try {
      const response = await axiosInstance.get(`${AWS_BASE_URL}/ec2/${accountId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getRdsInstances: async (accountId) => {
    try {
      const response = await axiosInstance.get(`${AWS_BASE_URL}/rds/${accountId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAutoScalingGroups: async (accountId) => {
    try {
      const response = await axiosInstance.get(`${AWS_BASE_URL}/asg/${accountId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default AwsService;
