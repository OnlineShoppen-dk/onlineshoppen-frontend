
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
    categories: Category[],
    images: Image[]
}
export interface PostProductRequest {
    guid: string,
    name: string,
    description: string,
    price?: number,
    stock?: number,
    sold?: number,
}
export interface Image {
    id: number,
    name: string,
    fileName: string,
    alt: string
}

export interface Category {
    id: number,
    name: string,
    description: string,
    totalProducts: number
}