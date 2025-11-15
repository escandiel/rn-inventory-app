import { useMemo } from "react";
import { router } from "expo-router";
import { useSales } from "../context/sale-provider";

export function useSaleDetail(id: string) {
  const { sales, loading, error, remove } = useSales();

  const sale = useMemo(
    () => sales.find((sale) => sale.id === id) ?? null,
    [sales, id],
  );

  function goBack() {
    router.back();
  }

  async function handleDelete() {
    if (!sale) return;

    try {
      await remove(sale.id);
      router.back();
    } catch (err) {
      console.error("❌ Erro ao deletar venda:", err);
    }
  }

  return {
    sale,
    loading,
    error,
    goBack,
    handleDelete,
  };
}
