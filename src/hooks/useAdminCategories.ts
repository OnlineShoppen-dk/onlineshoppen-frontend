import { useQuery } from "@tanstack/react-query";
import { Category } from '../interfaces/product';
import { useApiClient } from './useApiClient';


const useAdminCategories = () => {
    const apiClient = useApiClient<Category>().mainServiceApiClient;
    console.log('we here');
    
    async function GetAdminCategories(): Promise<Category[]> {
        // API Call
        try {
            const response = await apiClient.getAxiosInstance.get<Category[]>("api/admin/category");
            return response.data;
        } catch (error){
            console.error(error);
            throw new Error("Error fetching categories");
        }
    }

    async function AddProductToCategory(categoryId: number, productId: number): Promise<void> {
        // API Call
        try {
            const response = await apiClient.getAxiosInstance.post(`api/admin/category/${categoryId}/add-product/${productId}`);
            console.log("Added: " + response.data);
            return response.data;
        } catch (error){
            console.error(error);
            throw new Error("Error adding product to category");
        }
    }

    const { data, error, isLoading, refetch } = useQuery<AdminCategoryResponse, Error>({
        queryKey: ["adminCategories"],
        queryFn: GetAdminCategories,
    });
    console.log('returning');
    return { data, error, isLoading, refetch, AddProductToCategory };
}

export interface AdminCategoryResponse {
    totalCategories: number,
    page: number,
    pageSize: number,
    totalPages: number,
    search: string,
    categories: Category[]
}

export { useAdminCategories };