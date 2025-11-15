import { Range } from "./types/range";
import { Sale } from "./types/sales";

export interface SalesSummary {
  count: number;
  revenue: number;
  avg: number;
  paidCount: number;
  pendingCount: number;
  rangeLabel: string;
}

export interface SalesGroup {
  dayIso: string;
  rows: Sale[];
}

export function getMinDateForRange(range: Range): Date {
  const now = new Date();

  switch (range) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case "all":
    default:
      return new Date(0);
  }
}

export function getRangeLabel(range: Range): string {
  switch (range) {
    case "today":
      return "hoje";
    case "7d":
      return "últimos 7 dias";
    case "30d":
      return "últimos 30 dias";
    case "all":
    default:
      return "todo período";
  }
}

export function filterSalesByQuery(sales: Sale[], query: string): Sale[] {
  const trimmed = query.trim();
  if (!trimmed) return sales;

  const q = trimmed.toLowerCase();

  return sales.filter((s) => {
    return (
      s.customer?.toLowerCase().includes(q) ||
      s.method.toLowerCase().includes(q) ||
      String(s.total).includes(q)
    );
  });
}

export function groupSalesByDay(sales: Sale[]): SalesGroup[] {
  const map = new Map<string, Sale[]>();

  for (const sale of sales) {
    const d = new Date(sale.createdAt);
    const key = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
    ).toISOString();

    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(sale);
  }

  return Array.from(map.entries())
    .sort((a, b) => +new Date(b[0]) - +new Date(a[0]))
    .map(([dayIso, rows]) => ({ dayIso, rows }));
}
