import { useMemo } from "react";
import { useSales } from "../../sales/context/sale-provider";
import { useProducts } from "../../products/hooks/use-product";

interface DashboardStats {
  totalInventory: number;
  lowStock: number;
  totalValue: number;
  monthlySales: number;
}

interface TopProduct {
  name: string;
  stock: number;
  sales: number;
}

interface MonthlySalesData {
  month: string;
  value: number;
}

export function useDashboard() {
  const { products, loading: loadingProducts } = useProducts();
  const { sales, loading: loadingSales } = useSales();

  const stats: DashboardStats = useMemo(() => {
    const totalInventory = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStock = products.filter((p) => p.stock < 5).length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlySales = sales.filter(
      (s) => new Date(s.createdAt) >= firstDayOfMonth,
    ).length;

    return {
      totalInventory,
      lowStock,
      totalValue,
      monthlySales,
    };
  }, [products, sales]);

  const monthlySalesData: MonthlySalesData[] = useMemo(() => {
    const now = new Date();
    const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    const data: MonthlySalesData[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthIndex = date.getMonth();
      const monthSales = sales.filter((s) => {
        const saleDate = new Date(s.createdAt);
        return (
          saleDate.getMonth() === monthIndex &&
          saleDate.getFullYear() === date.getFullYear()
        );
      }).length;

      data.push({
        month: months[monthIndex],
        value: monthSales,
      });
    }

    return data;
  }, [sales]);

  const topProducts: TopProduct[] = useMemo(() => {
    return products
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 4)
      .map((p) => ({
        name: `${p.brand} ${p.name}`,
        stock: p.stock,
        sales: 0,
      }));
  }, [products]);

  const loading = loadingProducts || loadingSales;

  return {
    stats,
    monthlySalesData,
    topProducts,
    loading,
  };
}
