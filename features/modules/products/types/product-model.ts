export interface Product {
  id: string;
  name: string;
  brand: string;
  size: string;
  stock: number;
  price: number;
  cost: number;
  sku: string;
  color: string;
  condition: "Novo" | "Usado";
  location: string;
  stockDate?: string;
  createdAt: string;
  updatedAt: string;
}
