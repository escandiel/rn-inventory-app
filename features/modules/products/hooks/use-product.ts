import { useEffect, useState } from "react";
import { Product } from "../types/product-model";
import { NewProductPayload } from "../types/new-product-payload";
import {
  updateProduct,
  UpdateProductPayload,
} from "../services/update-product";
import { getProducts } from "../services/get-products";
import { createProduct } from "../services/create-product";
import { deleteProduct } from "../services/delete-product";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  create: (data: NewProductPayload) => Promise<Product | null>;
  update: (id: string, data: UpdateProductPayload) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
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
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setErrorMessage("Erro ao carregar produtos", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function create(data: NewProductPayload): Promise<Product | null> {
    setError(null);

    try {
      const created = await createProduct(data);
      if (created) {
        setProducts((prev) => [...prev, created]);
      }
      return created;
    } catch (err) {
      setErrorMessage("Erro ao criar produto", err);
      return null;
    }
  }

  async function update(id: string, data: UpdateProductPayload): Promise<void> {
    setError(null);

    try {
      await updateProduct(id, data);

      const updatedAt = new Date().toISOString();

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...data, updatedAt } : product,
        ),
      );
    } catch (err) {
      setErrorMessage("Erro ao atualizar produto", err);
    }
  }

  async function remove(id: string): Promise<void> {
    setError(null);

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setErrorMessage("Erro ao remover produto", err);
    }
  }

  return {
    products,
    loading,
    error,
    reload,
    create,
    update,
    remove,
  };
}
