import { useState, useMemo } from "react";
import { useProducts } from "./use-product";
import { Product } from "../types/product-model";
import { router } from "expo-router";

export function useProductsList() {
  const { products, loading, error, reload } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query),
    );
  }, [products, searchQuery]);

  const totalValue = useMemo(
    () =>
      products.reduce((sum, product) => sum + product.price * product.stock, 0),
    [products],
  );

  const totalItems = useMemo(
    () => products.reduce((sum, product) => sum + product.stock, 0),
    [products],
  );

  const lowStockItems = useMemo(
    () => products.filter((product) => product.stock < 10).length,
    [products],
  );

  function openDetails(product: Product) {
    router.push({
      pathname: "/product-detail-page",
      params: { productData: JSON.stringify(product) },
    });
  }

  return {
    products,
    filteredProducts,
    totalValue,
    totalItems,
    lowStockItems,

    searchQuery,
    setSearchQuery,

    loading,
    error,

    openDetails,

    reload,
  };
}
