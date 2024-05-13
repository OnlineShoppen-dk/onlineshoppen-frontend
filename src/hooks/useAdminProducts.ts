import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { PostProductRequest, Product } from "../interfaces/product";
import { useApiClient } from './useApiClient';


const useAdminProducts = () => {
    const { adminProductQuery } = useAdminProductQueryDashboard();
    const apiClient = useApiClient<Product>().mainServiceApiClient;

    async function GetAdminProducts(): Promise<AdminProductResponse> {
        // API Call
        try {
            const urlQuery = new URLSearchParams(adminProductQuery as any).toString();
            const response = await apiClient.getAxiosInstance.get<AdminProductResponse>("api/admin/product?" + urlQuery);
            return response.data;
        } catch (error){
            console.error(error);
            throw new Error("Error fetching products");
        }
    }

    async function PostAdminProduct(product: PostProductRequest): Promise<void> {
        // API Call
        console.log("posting product");
        try {
            const response = await apiClient.getAxiosInstance.post("api/admin/product", product);
            return response.data;
        } catch (error){
            console.error(error);
            throw new Error("Error adding product");
        }
    }

    async function UpdateAdminProduct(newProduct: Product): Promise<void> {
        // API Call
        try {
            const response = await apiClient.getAxiosInstance.put(`api/admin/product/${newProduct.id}`, newProduct);
            return response.data;
        } catch (error){
            console.error(error);
            throw new Error("Error updating product");
        }
    }

    async function ActivateAdminProduct(product: Product): Promise<void> {
        // API Call
        try {
            const response = await apiClient.getAxiosInstance.put(`api/admin/product/${product.id}/restore`);
            return response.data;
        } catch (error){
            console.error(error);
            throw new Error("Error activating product");
        }
    }

    async function DeleteAdminProduct(product: Product): Promise<void> {
        // API Call
        try {
            const response = await apiClient.getAxiosInstance.delete(`api/admin/product/${product.id}`);
            return response.data;
        } catch (error){
            console.error(error);
            throw new Error("Error deleting product");
        }
    }

    const { data, error, isLoading, refetch } = useQuery<AdminProductResponse, Error>({
        queryKey: ["adminProducts", adminProductQuery],
        queryFn: GetAdminProducts,
    });
    return { data, error, isLoading, refetch, PostAdminProduct, UpdateAdminProduct, ActivateAdminProduct, DeleteAdminProduct };
};

// Interfaces for Response
export interface AdminProductResponse {
    page: number;
    pageSize: number;
    products: Product[];
    search: string;
    sort: 
    | "popularity_asc"
    | "popularity_desc"
    | "name_asc"
    | "name_desc"
    | "price_asc"
    | "price_desc"
    | "stock_asc"
    | "stock_desc";
    totalPages: number;
    totalProducts: number;
    includeRemoved: boolean;
}

// Interfaces
export interface AdminProductQuery {
    page?: number;
    pageSize?: number;
    search?: string;
    sort?: AdminProductResponse["sort"];
    includeRemoved?: boolean;
}

interface AdminProductQueryDashboard {
    adminProductQuery: AdminProductQuery;
    setSearch: (search: string) => void;
    setSort: (sort: AdminProductResponse["sort"]) => void;
    setIncludeRemoved: (includeRemoved: boolean) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
}

const useAdminProductQueryDashboard = create<AdminProductQueryDashboard>((set) => ({
    adminProductQuery: {},
    setSearch: (search: string) =>
        set((state) => ({ adminProductQuery: { ...state.adminProductQuery, search: search } })),
    setSort: (sort: AdminProductResponse["sort"]) => 
        set((state) => ({ adminProductQuery: { ...state.adminProductQuery, sort: sort } })),
    setPage: (page: number) => 
        set((state) => ({ adminProductQuery: { ...state.adminProductQuery, page } })),
    setPageSize: (pageSize: number) =>
        set((state) => ({ adminProductQuery: { ...state.adminProductQuery, pageSize } })),
    setIncludeRemoved: (includeRemoved: boolean) =>
        set((state) => ({ adminProductQuery: { ...state.adminProductQuery, includeRemoved } })),
}));

export { useAdminProductQueryDashboard, useAdminProducts };