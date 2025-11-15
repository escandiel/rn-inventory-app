import { useState } from "react";
import { router } from "expo-router";
import { Product } from "../types/product-model";
import { useProducts } from "../context/product-provider";

export function useProductsList() {
  const { products, loading, error, reload } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.toLowerCase();

  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query)
    );
  });

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  );

  const totalItems = products.reduce((sum, product) => sum + product.stock, 0);

  const lowStockItems = products.filter((product) => product.stock < 10).length;

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
