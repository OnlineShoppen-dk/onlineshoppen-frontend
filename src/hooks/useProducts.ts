import { Product } from "../interfaces/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import useProductQueryStore from "../store/productStore";

const useProducts = () => {
  const { productQuery } = useProductQueryStore();

  const { catalogServiceApiClient: client } = useApiClient<Product>();

  return useQuery<Product[], Error>({
    queryKey: ["products", productQuery],
    queryFn: () =>
      client.getAll(
        "api/Catalog" +
          "?page=" +
          productQuery.page +
          "&pageSize=" +
          productQuery.pageSize
      ),
    placeholderData: keepPreviousData,
  });
};

export default useProducts;
