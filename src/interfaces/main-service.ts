import { Category, Product, ProductHistory } from "./product";
export interface GetDataResponse {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    search: string;
    sortFields: string[];
    sort: string;
}

export interface GetProductsResponse extends GetDataResponse {
    products: Product[];
}

export interface GetCategoriesResponse {
    categories: Category[];
}

export interface GetProductResponse {
    product: Product;
    productHistory: ProductHistory[];
}