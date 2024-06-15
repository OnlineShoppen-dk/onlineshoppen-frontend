import { v4 as uuidv4 } from "uuid";
import { Product } from "../../interfaces/product";
import { GetProductResponse } from "../../interfaces/main-service";



function GetTestProductById(id: number, products: Product[]){
    return products.find(p => p.id === id);
}

function GetTestProducts({count}:{count:number}){
    const products: Product[] = [];
    for(let i = 0; i < count; i++){
        const createdAt = new Date().toISOString();
        const date = new Date(createdAt).toLocaleTimeString('da-DK');
        const time = new Date(createdAt).toLocaleTimeString('da-DK').replace(/\D/g, ':');

        products.push({
            id: i,
            guid: uuidv4(),
            name: `Product ${i}`,
            description: `This is a test product with id ${i}`,
            price: Math.floor(Math.random() * 1000),
            stock: Math.floor(Math.random() * 100),
            sold: Math.floor(Math.random() * 100),
            createdAt: createdAt,
            createdAtDate: date,
            createdAtTime: time,
            updatedAt: createdAt,
            updatedAtDate: date,
            updatedAtTime: time,
            isRemoved: Math.random() < 0.1,
            imageId: null,
            categories: [],
            images: []
        });
    }

    const result = {
        data: {
            page: 1,
            pageSize: 10,
            totalPages: 3,
            totalItems: products.length,
            sortFields: ["popularity", "name", "price", "stock"],
            sort: "popularity_asc"
        },
        products: products
    } as GetProductResponse;
    return result;
}

const TestData = {
    GetTestProducts,
    GetTestProductById
}

export default TestData;