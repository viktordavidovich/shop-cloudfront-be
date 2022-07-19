export type Product = {
    count: number;
    description: string;
    id: string;
    price: number;
    title: string;
}

export type Products = Array<Product>

export type Error = {
    message: string;
}