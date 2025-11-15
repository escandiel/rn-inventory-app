// import { useState } from "react";
// import { router } from "expo-router";
// import { useSales } from "./use-sales";
// import {
//   filterSalesByQuery,
//   getMinDateForRange,
//   getRangeLabel,
//   groupSalesByDay,
//   type SalesGroup,
//   type SalesSummary,
// } from "../helpers";
// import { type Range } from "../types/range";

// export function useSalesList() {
//   const { sales, loading, error, reload } = useSales();

//   const [range, setRange] = useState<Range>("7d");
//   const [query, setQuery] = useState("");
//   const [refreshing, setRefreshing] = useState(false);

//   const filteredByDate = getFilteredSalesByDate(sales, range);

//   const filtered = getSortedFilteredSales(filteredByDate, query);

//   const summary = calculateSummary(filtered, range);

//   const grouped = groupSalesByDay(filtered);

//   async function onRefresh() {
//     setRefreshing(true);
//     await reload();
//     setRefreshing(false);
//   }

//   function openDetails(id: string) {
//     router.push(`/(sales)/${id}`);
//   }

//   return {
//     sales,
//     loading,
//     error,
//     range,
//     setRange,
//     query,
//     setQuery,
//     refreshing,
//     filtered,
//     summary,
//     grouped,
//     onRefresh,
//     openDetails,
//   };
// }

// function getFilteredSalesByDate(sales: any[], range: Range) {
//   const minDate = getMinDateForRange(range);
//   return sales.filter((sale) => new Date(sale.createdAt) >= minDate);
// }

// function getSortedFilteredSales(sales: any[], query: string) {
//   return filterSalesByQuery(sales, query).sort(
//     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//   );
// }

// function calculateSummary(sales: any[], range: Range): SalesSummary {
//   const count = sales.length;
//   const revenue = sales.reduce((acc, sale) => acc + sale.total, 0);
//   const avg = count > 0 ? revenue / count : 0;

//   const paidCount = sales.filter((sale) => sale.status === "paid").length;
//   const pendingCount = sales.filter((sale) => sale.status === "pending").length;

//   return {
//     count,
//     revenue,
//     avg,
//     paidCount,
//     pendingCount,
//     rangeLabel: getRangeLabel(range),
//   };
// }
import { useState } from "react";
import { router } from "expo-router";
import { useSales } from "../context/sale-provider";
import {
  filterSalesByQuery,
  getMinDateForRange,
  getRangeLabel,
  groupSalesByDay,
  type SalesGroup,
  type SalesSummary,
} from "../helpers";
import { type Range } from "../types/range";

export function useSalesList() {
  const { sales, loading, error, reload } = useSales();

  const [range, setRange] = useState<Range>("7d");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const filteredByDate = getFilteredSalesByDate(sales, range);
  const filtered = getSortedFilteredSales(filteredByDate, query);
  const summary = calculateSummary(filtered, range);
  const grouped = groupSalesByDay(filtered);

  async function onRefresh() {
    console.log("🔄 Pull-to-refresh acionado"); // DEBUG
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  }

  function openDetails(id: string) {
    router.push(`/(sales)/${id}`);
  }

  return {
    sales,
    loading,
    error,
    range,
    setRange,
    query,
    setQuery,
    refreshing,
    filtered,
    summary,
    grouped,
    onRefresh,
    openDetails,
  };
}

function getFilteredSalesByDate(sales: any[], range: Range) {
  const minDate = getMinDateForRange(range);
  return sales.filter((sale) => new Date(sale.createdAt) >= minDate);
}

function getSortedFilteredSales(sales: any[], query: string) {
  return filterSalesByQuery(sales, query).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function calculateSummary(sales: any[], range: Range): SalesSummary {
  const count = sales.length;
  const revenue = sales.reduce((acc, sale) => acc + sale.total, 0);
  const avg = count > 0 ? revenue / count : 0;

  const paidCount = sales.filter((sale) => sale.status === "paid").length;
  const pendingCount = sales.filter((sale) => sale.status === "pending").length;

  return {
    count,
    revenue,
    avg,
    paidCount,
    pendingCount,
    rangeLabel: getRangeLabel(range),
  };
}
