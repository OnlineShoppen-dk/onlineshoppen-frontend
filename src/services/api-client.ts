import axios, { AxiosInstance } from "axios";

class ApiClient<T> {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl
    });
  }

  public get getAxiosInstance() {
    return this.axiosInstance;
  }

  getProducts = (endpoint: string) =>
    this.axiosInstance.get<T>(endpoint).then((res) => res.data);

  getProduct = (endpoint: string) =>
    this.axiosInstance.get<T>(endpoint).then((res) => res.data);
  
  getAll = (endpoint: string) =>
    this.axiosInstance.get<T[]>(endpoint).then((res) => res.data);
}

export default ApiClient;
