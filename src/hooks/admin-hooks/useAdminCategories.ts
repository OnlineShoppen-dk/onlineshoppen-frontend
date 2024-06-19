import { useQuery } from "@tanstack/react-query";
import { GetCategoriesResponse } from "../../interfaces/main-service";
import { Category } from "../../interfaces/product";
import useAdminCategoryQueryStore from "../../store/admin-store/adminCategoryStore";
import { AdminProductQuery } from "../../store/admin-store/adminProductStore";
import { useApiClient } from "../useApiClient";

interface AdminCategories {
    categories: GetCategoriesResponse;
    category: Category | undefined;
}

const useAdminCategories = () => {
    const { adminCategoryQuery } = useAdminCategoryQueryStore();
    const { mainServiceApiClient: client } = useApiClient<GetCategoriesResponse>();
    const { mainServiceApiClient: clientForProduct } = useApiClient<Category>();

    return useQuery<AdminCategories, Error>({
        queryKey: ["categories", adminCategoryQuery],
        queryFn: async () => {
            const allCategories = await client.get("api/admin/category?" + constructQuery(adminCategoryQuery));

            const product = adminCategoryQuery.categoryId
                ? await clientForProduct.get("api/admin/cateogory/" + adminCategoryQuery.categoryId)
                : undefined;

            return {
                categories: allCategories,
                category: product,
            };
        },
    });
};

function constructQuery(adminCategoryQuery: AdminProductQuery) {
    let result = "";
    if (adminCategoryQuery.search) {
        result += "search=" + adminCategoryQuery.search + "&";
    }
    if (adminCategoryQuery.page) {
        result += "page=" + adminCategoryQuery.page + "&";
    }
    if (adminCategoryQuery.pageSize) {
        result += "pageSize=" + adminCategoryQuery.pageSize + "&";
    }
    return result;
}

export default useAdminCategories;
