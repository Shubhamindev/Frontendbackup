import axiosInstance from '../api/axiosInstance';
import { handleApiError } from '../../utils/errorHandler';


const USER_BASE_URL = '/accounts';

const AccountService = {
    getAllAccounts: async () => {
        try {
        const response = await axiosInstance.get(`${USER_BASE_URL}`);
        return response.data;
        } catch (error) {
        throw handleApiError(error);
        }
    },
    
    getAccountById: async (id) => {
        try {
        const response = await axiosInstance.get(`/accounts/${id}`);
        return response.data;
        } catch (error) {
        throw handleApiError(error);
        }
    },
    
    updateAccount: async (id, data) => {
        try {
        const response = await axiosInstance.put(`/accounts/edit/${id}`, data);
        return response.data;
        } catch (error) {
        throw handleApiError(error);
        }
    },
    
    createAccount: async (data) => {
        try {
        const response = await axiosInstance.post('/accounts/create', data);
        return response.data;
        } catch (error) {
        throw handleApiError(error);
        }
    },
    };

    export default AccountService;

