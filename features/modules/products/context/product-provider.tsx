import React, { createContext, useContext, ReactNode } from "react";
import { useProducts as useProductsHook } from "../hooks/use-product";

type ProductsContextType = ReturnType<typeof useProductsHook>;

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const products = useProductsHook();

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts deve ser usado dentro de ProductsProvider");
  }

  return context;
}
