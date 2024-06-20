import { create } from 'zustand';

export interface AdminProductQuery {
    search?: string;
    page?: number;
    pageSize?: number;
    sort?: string;
    categoryId?: number;
    includeRemoved?: boolean;
    // For product details
    productId?: number;
}

interface AdminProductQueryStore {
    adminProductQuery: AdminProductQuery;
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setSort: (sort: string) => void;
    setCategoryId: (categoryId: number) => void;
    setIncludeRemoved: (includeRemoved: boolean) => void;
    setProductId: (productId: number) => void;
}

const useAdminProductQueryStore = create<AdminProductQueryStore>((set) => ({
    adminProductQuery: { },
    setSearch: (search) =>
        set((store) => ({ adminProductQuery: { ...store.adminProductQuery, search } })),
    setPage: (page) =>
        set((store) => ({ adminProductQuery: { ...store.adminProductQuery, page } })),
    setPageSize: (pageSize) =>
        set((store) => ({ adminProductQuery: { ...store.adminProductQuery, pageSize } })),
    setSort: (sort) =>
        set((store) => ({ adminProductQuery: { ...store.adminProductQuery, sort } })),
    setCategoryId: (categoryId) =>
        set((store) => ({ adminProductQuery: { ...store.adminProductQuery, categoryId } })),
    setIncludeRemoved: (includeRemoved) =>
        set((store) => ({ adminProductQuery: { ...store.adminProductQuery, includeRemoved } })),
    setProductId: (productId) =>
        set((store) => ({ adminProductQuery: { ...store.adminProductQuery, productId } }))
}));

export default useAdminProductQueryStore;