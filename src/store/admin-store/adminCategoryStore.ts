import { create } from 'zustand';

export interface AdminCategoryQuery {
    search?: string;
    page?: number;
    pageSize?: number;
    sort?: string;
    includeRemoved?: boolean;
    // For category details
    categoryId?: number;
}

interface AdminCategoryQueryStore {
    adminCategoryQuery: AdminCategoryQuery;
    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setSort: (sort: string) => void;
    setIncludeRemoved: (includeRemoved: boolean) => void;
    setCategoryId: (categoryId: number) => void;
}

const useAdminCategoryQueryStore = create<AdminCategoryQueryStore>((set) => ({
    adminCategoryQuery: { },
    setSearch: (search) =>
        set((store) => ({ adminCategoryQuery: { ...store.adminCategoryQuery, search } })),
    setPage: (page) =>
        set((store) => ({ adminCategoryQuery: { ...store.adminCategoryQuery, page } })),
    setPageSize: (pageSize) =>
        set((store) => ({ adminCategoryQuery: { ...store.adminCategoryQuery, pageSize } })),
    setSort: (sort) =>
        set((store) => ({ adminCategoryQuery: { ...store.adminCategoryQuery, sort } })),
    setIncludeRemoved: (includeRemoved) =>
        set((store) => ({ adminCategoryQuery: { ...store.adminCategoryQuery, includeRemoved } })),
    setCategoryId: (categoryId) =>
        set((store) => ({ adminCategoryQuery: { ...store.adminCategoryQuery, categoryId } }))
}));

export default useAdminCategoryQueryStore;