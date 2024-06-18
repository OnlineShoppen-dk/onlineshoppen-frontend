import { useQuery } from "@tanstack/react-query";
import { GetProductResponse, GetProductsResponse } from "../../interfaces/main-service";
import useAdminProductQueryStore, { AdminProductQuery } from "../../store/admin-store/adminProductStore";
import { useApiClient } from "../useApiClient";

interface AdminProducts {
    products: GetProductsResponse;
    product: GetProductResponse | undefined;
}

const useAdminProducts = () => {
    const { adminProductQuery } = useAdminProductQueryStore() as { adminProductQuery: AdminProductQuery };
    const { mainServiceApiClient: client } = useApiClient<GetProductsResponse>();
    const { mainServiceApiClient: clientForProduct } = useApiClient<GetProductResponse>();

    return useQuery<AdminProducts, Error>({
        queryKey: ["products", adminProductQuery],
        queryFn: async () => {
            const allProducts = await client.getProducts("api/admin/product?" + constructQuery(adminProductQuery));

            const product = adminProductQuery.productId
                ? await clientForProduct.getProduct("api/admin/product/" + adminProductQuery.productId)
                : undefined;

            return {
                products: allProducts,
                product: product,
            };
        },
    });
};

function constructQuery(adminProductQuery: AdminProductQuery) {
    let result = "";
    if (adminProductQuery.search) {
        result += "search=" + adminProductQuery.search + "&";
    }
    if (adminProductQuery.page) {
        result += "page=" + adminProductQuery.page + "&";
    }
    if (adminProductQuery.pageSize) {
        result += "pageSize=" + adminProductQuery.pageSize + "&";
    }
    if (adminProductQuery.sort) {
        result += "sort=" + adminProductQuery.sort + "&";
    }
    if (adminProductQuery.categoryId) {
        result += "categoryId=" + adminProductQuery.categoryId + "&";
    }
    if (adminProductQuery.includeRemoved) {
        result += "includeRemoved=" + adminProductQuery.includeRemoved + "&";
    }
    return result;
}

export default useAdminProducts;
