import { PaymentMethod } from "./payment-method";
import { SaleStatus } from "./sale-status";

export interface Sale {
  id: string;
  customer: string | null;
  items: number;
  total: number;
  method: PaymentMethod;
  status: SaleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NewSalePayload {
  customer?: string;
  items: number;
  total: number;
  method: PaymentMethod;
  status: SaleStatus;
}

export interface UpdateSalePayload {
  customer?: string;
  items?: number;
  total?: number;
  method?: "pix" | "card" | "cash";
  status?: "paid" | "pending";
}
