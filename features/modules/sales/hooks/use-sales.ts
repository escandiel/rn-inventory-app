import { useEffect, useState } from "react";
import { Sale, NewSalePayload, UpdateSalePayload } from "../types/sales";
import { getSales } from "../services/get-sales";
import { createSale } from "../services/create-sale";
import { updateSale } from "../services/update-sale";
import { deleteSale } from "../services/delete-sale";

interface UseSalesResult {
  sales: Sale[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  create: (data: NewSalePayload) => Promise<Sale | null>;
  update: (id: string, data: UpdateSalePayload) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useSales(): UseSalesResult {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setErrorMessage(message: string, err: unknown) {
    console.error(message, err);
    setError(message);
  }

  async function reload() {
    setLoading(true);
    setError(null);

    try {
      const data = await getSales();
      setSales(data);
    } catch (err) {
      setErrorMessage("Erro ao carregar vendas", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function create(data: NewSalePayload): Promise<Sale | null> {
    setError(null);

    try {
      const created = await createSale(data);
      setSales((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setErrorMessage("Erro ao criar venda", err);
      return null;
    }
  }

  async function update(id: string, data: UpdateSalePayload): Promise<void> {
    setError(null);

    try {
      await updateSale(id, data);
      const updatedAt = new Date().toISOString();

      setSales((prev) =>
        prev.map((sale) =>
          sale.id === id ? { ...sale, ...data, updatedAt } : sale,
        ),
      );
    } catch (err) {
      setErrorMessage("Erro ao atualizar venda", err);
    }
  }

  async function remove(id: string): Promise<void> {
    setError(null);

    try {
      await deleteSale(id);
      setSales((prev) => prev.filter((sale) => sale.id !== id));
    } catch (err) {
      setErrorMessage("Erro ao remover venda", err);
    }
  }

  return {
    sales,
    loading,
    error,
    reload,
    create,
    update,
    remove,
  };
}
