import axios, { AxiosInstance } from "axios";

class ApiClient<T> {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
  }

  public get getAxiosInstance() {
    return this.axiosInstance;
  }

}

export default ApiClient;