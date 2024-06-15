import { Product } from "./product";

export interface RequestBody {
    data: GetDataResponse;
}

export interface GetDataResponse {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    search: string;
    sortFields: string[];
    sort: string;
}

export interface GetProductResponse extends RequestBody {
    products: Product[];
}