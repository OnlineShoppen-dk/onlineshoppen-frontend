import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import {
  LoginRequest,
  ProfileRequest,
  RegisterRequest,
  AuthResponse,
  ProfileResponse,
} from "../interfaces/auth";

const useAuth = () => {
  const { authServiceApiClient } = useApiClient();
  const { mainServiceApiClient } = useApiClient();

  const registerUser = useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: async (registerData: RegisterRequest) =>
      await authServiceApiClient.getAxiosInstance.post(
        "/api/auth/register",
        registerData
      ),
    onSuccess: (response) => {
      console.log(response.data.user_details);
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
    },
  });

  const registerUserDetails = useMutation<
    ProfileRequest,
    Error,
    ProfileRequest
  >({
    mutationFn: async (userDetails: ProfileRequest) =>
      await mainServiceApiClient.getAxiosInstance.post(
        "/api/user/User/register",
        userDetails
      ),
    onSuccess: (data) => {
      console.log("User Details created successfully", data);
    },
    onError: (error: Error) => {
      console.error("Profile update error:", error);
    },
  });

  const login = useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: async (loginData: LoginRequest) =>
      await authServiceApiClient.getAxiosInstance.post(
        "/api/auth/login",
        loginData,
        { withCredentials: true }
      ),
    onSuccess: (response) => {
      console.log(response.data.msg);
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
    },
  });

  const getUserDetails = useMutation<ProfileResponse, Error>({
    mutationFn: async () =>
      await mainServiceApiClient.getAxiosInstance.get(
        "/api/user/User/get-details",
        { withCredentials: true }
      ),

    onSuccess: (data) => {
      console.log(data);
    },
  });

  const logout = useMutation<string, Error>({
    mutationFn: async () =>
      await authServiceApiClient.getAxiosInstance.post("/api/auth/logout"),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { registerUser, registerUserDetails, login, logout, getUserDetails };
};

export default useAuth;
