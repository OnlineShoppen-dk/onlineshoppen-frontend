export interface Product {
    id: number,
    guid: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    sold: number,
    createdAt: string,
    createdAtDate: string,
    createdAtTime: string,
    updatedAt: string,
    updatedAtDate: string,
    updatedAtTime: string,
    isRemoved: boolean,
    imageId: string | null,
    categories: string[],
    images: string[]
}