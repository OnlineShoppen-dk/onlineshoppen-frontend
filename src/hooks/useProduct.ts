import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./useApiClient";
import { Product } from "../interfaces/product";

const useProduct = (productId: string) => {
  const { catalogServiceApiClient: apiClient } = useApiClient<Product>();

  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => apiClient.getOne("api/catalog", productId),
    staleTime: 1000 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useProduct;
