import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatsCardsProps {
  totalInventory: number;
  lowStock: number;
  totalValue: number;
  monthlySales: number;
}

export function StatsCards({
  totalInventory,
  lowStock,
  totalValue,
  monthlySales,
}: StatsCardsProps) {
  return (
    <>
      <View style={styles.grid}>
        <View style={[styles.card, styles.primaryCard]}>
          <Text style={styles.labelWhite}>Estoque Total</Text>
          <Text style={styles.valueWhite}>{totalInventory}</Text>
          <Text style={styles.unitWhite}>pares</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Estoque Baixo</Text>
          <Text style={[styles.value, styles.warningValue]}>{lowStock}</Text>
          <Text style={styles.unit}>itens</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.label}>Valor Total</Text>
          <Text style={styles.value}>R$ {(totalValue / 1000).toFixed(0)}k</Text>
          <Text style={styles.unit}>em estoque</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Vendas (mês)</Text>
          <Text style={styles.value}>{monthlySales}</Text>
          <Text style={styles.unit}>pares</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryCard: {
    backgroundColor: "#000",
  },
  label: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
  },
  labelWhite: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 8,
  },
  value: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -1,
  },
  valueWhite: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: -1,
  },
  warningValue: {
    color: "#FF3B30",
  },
  unit: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
  },
  unitWhite: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
});
