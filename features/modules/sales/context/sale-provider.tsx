import React, { createContext, useContext, ReactNode } from "react";
import { useSales as useSalesHook } from "../hooks/use-sales";

type SalesContextType = ReturnType<typeof useSalesHook>;

const SalesContext = createContext<SalesContextType | null>(null);

export function SalesProvider({ children }: { children: ReactNode }) {
  const sales = useSalesHook();

  return (
    <SalesContext.Provider value={sales}>{children}</SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);

  if (!context) {
    throw new Error("useSales deve ser usado dentro de SalesProvider");
  }

  return context;
}
