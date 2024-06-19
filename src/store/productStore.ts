import { create } from "zustand";

export interface ProductQuery {
  page: number;
  pageSize: number;
  searchText?: string;
  sortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface ProductQueryStore {
  productQuery: ProductQuery;
  setSearchText: (searchText: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setPriceRange: (minPrice: number, maxPrice: number) => void;
  setDefaultProductQuery: () => void;
}

const useProductQueryStore = create<ProductQueryStore>((set) => ({
  productQuery: { page: 1, pageSize: 8 },
  setSearchText: (searchText) =>
    set((store) => ({ productQuery: { ...store.productQuery, searchText } })),
  setPage: (page: number) =>
    set((store) => ({ productQuery: { ...store.productQuery, page } })),
  setPageSize: (pageSize: number) =>
    set((store) => ({ productQuery: { ...store.productQuery, pageSize } })),
  setSortOrder: (sortOrder: string) =>
    set((store) => ({ productQuery: { ...store.productQuery, sortOrder } })),
  setPriceRange: (minPrice: number, maxPrice: number) =>
    set((store) => ({
      productQuery: { ...store.productQuery, minPrice, maxPrice },
    })),
  setDefaultProductQuery: () => {
    const defaultProductQuery: ProductQuery = {
      page: 1,
      pageSize: 8,
    };
    set(() => ({
      productQuery: defaultProductQuery,
    }));
  },
}));

export default useProductQueryStore;
