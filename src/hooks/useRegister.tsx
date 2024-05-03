// import { useQueryClient } from '@tanstack/react-query';
import { useApiClient } from './useApiClient';

type RegisterResponse = {
    email: string;
    password: string;
    guid: string;
};

export const useRegister = () => {
  const { authServiceApiClient } = useApiClient('/api/auth/register');

  const register = async (email: string, password: string, guid: string) => {
    try {
      const response = await authServiceApiClient.axiosInstance.post<RegisterResponse>('/api/auth/register', {
        email,
        password,
        guid
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to register');
    }
  };

  return {
    register,
  };
};
