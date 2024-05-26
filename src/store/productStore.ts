import { create } from "zustand";

export interface ProductQuery {
  page: number;
  pageSize: number;
  searchText?: string;
}

interface ProductQueryStore {
  productQuery: ProductQuery;
  setSearchText: (searchText: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: { page: 1, pageSize: 10 },
  setSearchText: (searchText) =>
    set((store) => ({ productQuery: { ...store.productQuery, searchText } })),
  setPage: (page: number) =>
    set((store) => ({ productQuery: { ...store.productQuery, page } })),
  setPageSize: (pageSize: number) =>
    set((store) => ({ productQuery: { ...store.productQuery, pageSize } })),
}));

export default useProductQueryStore;
