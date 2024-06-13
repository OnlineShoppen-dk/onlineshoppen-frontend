import { v4 as uuidv4 } from "uuid";
import { Product } from "../../interfaces/product";

function GetTestProducts({count}:{count:number}){
    const products: Product[] = [];
    for(let i = 0; i < count; i++){
        products.push({
            id: i,
            guid: uuidv4(),
            name: `Product ${i}`,
            description: `This is a test product with id ${i}`,
            price: Math.floor(Math.random() * 1000),
            stock: Math.floor(Math.random() * 100),
            sold: Math.floor(Math.random() * 100),
            createdAt: new Date().toISOString(),
            createdAtDate: new Date().toISOString(),
            createdAtTime: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            updatedAtDate: new Date().toISOString(),
            updatedAtTime: new Date().toISOString(),
            isRemoved: Math.random() < 0.1,
            imageId: null,
            categories: [],
            images: []
        });
    }

    return products;
}

const TestData = {
    GetTestProducts
}

export default TestData;