export interface Error {
  message: string;
}

export interface Product {
  count: number;
  description: string;
  id: string;
  price: number;
  title: string;
}

export type Products = Array<Product>

