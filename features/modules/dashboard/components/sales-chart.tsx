import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface SalesChartProps {
  data: Array<{ month: string; value: number }>;
}

export function SalesChart({ data }: SalesChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Vendas Mensais</Text>
      <View style={styles.chartContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                { height: (item.value / maxValue) * 120 || 4 },
              ]}
            />
            <Text style={styles.barLabel}>{item.month}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 140,
    paddingTop: 10,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 30,
    backgroundColor: "#000",
    borderRadius: 4,
    marginBottom: 8,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    color: "#999",
  },
});
