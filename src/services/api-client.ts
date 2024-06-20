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

  getAll = (endpoint: string) =>
    this.axiosInstance.get<T[]>(endpoint).then((res) => res.data);

  getOne = (endpoint: string, productId: string) =>
    this.axiosInstance
      .get<T>(`${endpoint}/${productId}`)
      .then((res) => res.data);
}

export default ApiClient;
