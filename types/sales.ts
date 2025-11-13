export type PaymentMethod = "pix" | "card" | "cash";
export type SaleStatus = "paid" | "pending";

export type Sale = {
  id: string;
  createdAt: string;
  customer?: string;
  items: number;
  total: number;
  method: PaymentMethod;
  status: SaleStatus;
};

export type Range = "today" | "7d" | "30d" | "all";
