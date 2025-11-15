import { type Product } from "./product-model";

export type NewProductPayload = Omit<
  Product,
  "id" | "createdAt" | "updatedAt"
> & {
  stockDate: string;
};
