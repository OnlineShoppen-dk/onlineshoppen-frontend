import { Product } from "../interfaces/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface ProductQuery {
    page: number,
    pageSize: number
}

const useProducts = (productQuery: ProductQuery) => {
    const product: Product = {
        name: "Test",
        price: 199,
      };
    
      function GetProducts(): Product[] {
        const products: Product[] = [];
        for (let index = 0; index < 20; index++) {
          products.push(product);
        }
        
        const pageStartIndex = (productQuery.page - 1) * productQuery.pageSize;
        const pageEndIndex = (productQuery.page - 1) * productQuery.pageSize + productQuery.pageSize;
        return products.slice(pageStartIndex, pageEndIndex);
      }
    
    return useQuery<Product[], Error>({queryKey: ["products", productQuery], queryFn: GetProducts, placeholderData: keepPreviousData})
}

export default useProducts