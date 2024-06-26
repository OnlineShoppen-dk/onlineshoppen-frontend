import { Product } from "../interfaces/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import useProductQueryStore from "../store/productStore";

const useProducts = () => {
  const { productQuery } = useProductQueryStore();

  const { catalogServiceApiClient: client } = useApiClient<Product>();

  let query =
    "api/Catalog" +
    "?page=" +
    productQuery.page +
    "&pageSize=" +
    productQuery.pageSize +
    "&sort=" +
    productQuery.sortOrder;

  if (productQuery.searchText) query += "&search=" + productQuery.searchText;
  if (productQuery.minPrice) query += "&minPrice=" + productQuery.minPrice;
  if (productQuery.maxPrice) query += "&maxPrice=" + productQuery.maxPrice;

  return useQuery<Product[], Error>({
    queryKey: ["products", productQuery],
    queryFn: () => client.getAll(query),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useProducts;
