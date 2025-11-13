import { Sale } from "@/types/sales";

function randomId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export const MOCK: Sale[] = [
  {
    id: randomId(),
    createdAt: new Date().toISOString(),
    customer: "Rodrigo Alves",
    items: 2,
    total: 2199.9,
    method: "pix",
    status: "paid",
  },
  {
    id: randomId(),
    createdAt: new Date().toISOString(),
    customer: "Ana Souza",
    items: 1,
    total: 799.9,
    method: "card",
    status: "pending",
  },
  {
    id: randomId(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    customer: "Walk-in",
    items: 3,
    total: 1450,
    method: "cash",
    status: "paid",
  },
  {
    id: randomId(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    customer: "Marina",
    items: 1,
    total: 1299.9,
    method: "pix",
    status: "paid",
  },
  {
    id: randomId(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    customer: "Thiago",
    items: 2,
    total: 1699.9,
    method: "card",
    status: "paid",
  },
];
