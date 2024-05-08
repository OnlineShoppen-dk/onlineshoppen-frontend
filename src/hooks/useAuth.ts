import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { LoginRequest, ProfileRequest, RegisterRequest, AuthResponse} from "../interfaces/auth";

const useRegister = () => {
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
        loginData
      ),
    onSuccess: (response) => {
      console.log(response.data.msg);
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
    },
  });

  return { registerUser, registerUserDetails, login };
};

export default useRegister;
