import { Product } from "../interfaces/product";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
    const product: Product = {
        Name: "Test",
        Price: 199,
      };
    
      function GetProducts(): Product[] {
        const products: Product[] = [];
        for (let index = 0; index < 20; index++) {
          products.push(product);
        }
    
        return products;
      }
    
    return useQuery<Product[], Error>({queryKey: ["products"], queryFn: GetProducts})
}

export default useProducts