import ApiClient from "../services/api-client"

export const useApiClient = <T>(endpoint: string) => {
    
    return {
        get mainServiceApiClient() : ApiClient<T> {
            const baseUrl = import.meta.env.BASE_URL_MAIN ?? "http://localhost:8081";
            return new ApiClient(baseUrl ,endpoint);
        },
        get catalogServiceApiClient() : ApiClient<T> {
            const baseUrl = import.meta.env.BASE_URL_CATALOG ?? "http://localhost:8080";
            return new ApiClient(baseUrl, endpoint);
        },
        get authServiceApiClient() : ApiClient<T> {
            const baseUrl = import.meta.env.BASE_URL_CATALOG ?? "http://localhost:80";
            return new ApiClient(baseUrl, endpoint);
        }
    }

}

