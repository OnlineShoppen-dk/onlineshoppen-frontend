import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";

interface RegisterRequest {
  email: string;
  password: string;
  guid: string;
}

interface RegisterResponse {
  data: {
    msg: string;
    user_details: {
      email: string;
      guid: string;
    };
  };
}

interface ProfileRequest {
  firstName: string;
  lastName: string;
  guid: string;
  email: string;
  phoneNumber: string;
}

const useRegister = () => {
  const { authServiceApiClient } = useApiClient();
  const { mainServiceApiClient } = useApiClient();


  const registerUser = useMutation<RegisterResponse, Error, RegisterRequest>({
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

  const registerUserDetails = useMutation<ProfileRequest, Error, ProfileRequest>({
    mutationFn: async (userDetails: ProfileRequest) =>
      await mainServiceApiClient.getAxiosInstance.post(
        "/api/user/User/register",
        userDetails
      ),
    onSuccess: (data) => {
      console.log("User Details created successfully",data);
    },
    onError: (error: Error) => {
      console.error("Profile update error:", error);
    },
  });

  return { registerUser, registerUserDetails };



};

export default useRegister;
