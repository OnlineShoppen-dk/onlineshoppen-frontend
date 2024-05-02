import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiClient<T> {
  endpoint: string;
  axiosInstance: AxiosInstance;

  constructor(baseUrl: string, endpoint: string) {
    this.endpoint = endpoint;
    this.axiosInstance = axios.create({
      baseURL: baseUrl
    });
  }

  getAll = (config?: AxiosRequestConfig) =>
    this.axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
}

export default ApiClient;