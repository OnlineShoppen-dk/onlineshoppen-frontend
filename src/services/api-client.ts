import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    // TODO: insert api url
    baseURL: ""
  });
  
  class ApiClient<T> {
    endpoint: string;
  
    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }
  
    getAll = (config?: AxiosRequestConfig) =>
      axiosInstance
        .get<T[]>(this.endpoint, config)
        .then((res) => res.data);
  }
  
  export default ApiClient;