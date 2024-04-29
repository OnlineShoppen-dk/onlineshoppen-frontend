import { Product } from "../interfaces/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useProductQueryStore from "../store";

const useProducts = () => {
  const { productQuery } = useProductQueryStore();

  const product: Product = {
    name: "Test",
    price: 199,
  };

  function GetProducts(): Product[] {
    let products: Product[] = [];
    for (let index = 0; index < 20; index++) {
      product.name += "a";
      const newProduct: Product = { price: 199, name: product.name };
      products.push(newProduct);
    }

    if (productQuery.searchText != undefined && productQuery.searchText) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(productQuery.searchText!.toLowerCase())
      );
    }

    const pageStartIndex = (productQuery.page - 1) * productQuery.pageSize;
    const pageEndIndex =
      (productQuery.page - 1) * productQuery.pageSize + productQuery.pageSize;
    return products.slice(pageStartIndex, pageEndIndex);
  }

  return useQuery<Product[], Error>({
    queryKey: ["products", productQuery],
    queryFn: GetProducts,
    placeholderData: keepPreviousData,
  });
};

export default useProducts;
