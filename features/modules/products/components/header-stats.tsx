import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProductsHeaderStatsProps {
  skuCount: number;
  totalItems: number;
  lowStockItems: number;
  totalValue: number;
}

export function ProductsHeaderStats({
  skuCount,
  totalItems,
  lowStockItems,
  totalValue,
}: ProductsHeaderStatsProps) {
  return (
    <View style={styles.headerStats}>
      <View className="miniStat">
        <Text style={styles.miniStatValue}>{skuCount}</Text>
        <Text style={styles.miniStatLabel}>SKUs</Text>
      </View>

      <View style={styles.miniStat}>
        <Text style={styles.miniStatValue}>{totalItems}</Text>
        <Text style={styles.miniStatLabel}>Total</Text>
      </View>

      <View style={styles.miniStat}>
        <Text
          style={[
            styles.miniStatValue,
            lowStockItems > 0 && styles.warningText,
          ]}
        >
          {lowStockItems}
        </Text>
        <Text style={styles.miniStatLabel}>Baixo</Text>
      </View>

      <View style={styles.miniStat}>
        <Text style={styles.miniStatValue}>
          R$ {(totalValue / 1000).toFixed(0)}k
        </Text>
        <Text style={styles.miniStatLabel}>Valor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStats: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  miniStat: {
    flex: 1,
    alignItems: "center",
  },
  miniStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -0.5,
  },
  miniStatLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
  warningText: {
    color: "#FF3B30",
  },
});
