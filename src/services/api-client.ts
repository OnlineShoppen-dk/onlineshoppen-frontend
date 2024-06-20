import axios, { AxiosInstance } from "axios";

class ApiClient<T> {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public get getAxiosInstance() {
    return this.axiosInstance;
  }

  get = (endpoint: string) =>
    this.axiosInstance.get<T>(endpoint).then((res) => res.data);
  
  getAll = (endpoint: string) =>
    this.axiosInstance.get<T[]>(endpoint).then((res) => res.data);

  put = (endpoint: string, data: T) =>
    this.axiosInstance.put<T>(endpoint, data).then((res) => res.data);

  post = (endpoint: string, data: T) =>
    this.axiosInstance.post<T>(endpoint, data).then((res) => res.data);

  delete = (endpoint: string) =>
    this.axiosInstance.delete<T>(endpoint).then((res) => res.data);

  getOne = (endpoint: string, productId: string) =>
    this.axiosInstance
      .get<T>(`${endpoint}/${productId}`)
      .then((res) => res.data);
}

export default ApiClient;
