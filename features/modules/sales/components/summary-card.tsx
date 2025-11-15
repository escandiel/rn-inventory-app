import React from "react";
import { View, Text, StyleSheet } from "react-native";
import currency from "@/helpers/money";

interface SummaryCardsProps {
  summary: {
    count: number;
    revenue: number;
    avg: number;
    paidCount: number;
    pendingCount: number;
    rangeLabel: string;
  };
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <>
      <View style={styles.grid}>
        <View style={[styles.card, styles.primaryCard]}>
          <Text style={styles.labelWhite}>Vendas</Text>
          <Text style={styles.valueWhite}>{summary.count}</Text>
          <Text style={styles.subWhite}>{summary.rangeLabel}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Receita</Text>
          <Text style={styles.value}>{currency(summary.revenue)}</Text>
          <Text style={styles.sub}>bruta</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.label}>Ticket médio</Text>
          <Text style={styles.value}>{currency(summary.avg)}</Text>
          <Text style={styles.sub}>por venda</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusRow}>
            <View style={[styles.dot, styles.dotGreen]} />
            <Text style={styles.sub}>{summary.paidCount} pagos</Text>
            <View style={[styles.dot, styles.dotOrange]} />
            <Text style={styles.sub}>{summary.pendingCount} pendentes</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 18,
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
  value: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  labelWhite: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
  },
  valueWhite: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: -0.5,
  },
  subWhite: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  statusRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotGreen: {
    backgroundColor: "#10B981",
  },
  dotOrange: {
    backgroundColor: "#F59E0B",
  },
});
