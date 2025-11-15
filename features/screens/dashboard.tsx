import React from "react";
import { ScrollView, StyleSheet, ActivityIndicator, View } from "react-native";
import { useDashboard } from "../modules/dashboard/hooks/use-dashboard";
import { DashboardHeader } from "../modules/dashboard/components/header";
import { StatsCards } from "../modules/dashboard/components/stats-card";
import { SalesChart } from "../modules/dashboard/components/sales-chart";
import { TopProducts } from "../modules/dashboard/components/top-products";

export default function DashboardScreen() {
  const { stats, monthlySalesData, topProducts, loading } = useDashboard();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DashboardHeader />

      <StatsCards
        totalInventory={stats.totalInventory}
        lowStock={stats.lowStock}
        totalValue={stats.totalValue}
        monthlySales={stats.monthlySales}
      />

      <SalesChart data={monthlySalesData} />

      <TopProducts products={topProducts} />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },
});
