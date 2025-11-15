import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  price: number;
  cost: number;
  profit: number;
  profitMargin: string;
}

export function ProductPriceCard({ price, cost, profit, profitMargin }: Props) {
  const marginNumber = Number(profitMargin) || 0;

  return (
    <View style={styles.card}>
      <View style={styles.priceRow}>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Preço de venda</Text>
          <Text style={styles.priceValue}>
            R$ {price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>Custo</Text>
          <Text style={styles.costValue}>
            R$ {cost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </View>

      <View style={styles.profitSection}>
        <View style={styles.profitHeader}>
          <Text style={styles.profitLabel}>Margem de lucro</Text>
          <Text style={styles.profitValue}>{profitMargin}%</Text>
        </View>

        <View style={styles.profitBar}>
          <View
            style={[
              styles.profitFill,
              { width: `${Math.min(marginNumber, 100)}%` },
            ]}
          />
        </View>

        <Text style={styles.profitAmount}>
          R$ {profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} por
          unidade
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  priceRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  priceItem: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  priceValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  costValue: {
    fontSize: 26,
    fontWeight: "700",
    color: "#4B5563",
    letterSpacing: -0.5,
  },
  divider: {
    width: 1,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 20,
  },
  profitSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  profitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  profitLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  profitValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#22C55E",
    letterSpacing: -0.5,
  },
  profitBar: {
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  profitFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 4,
  },
  profitAmount: {
    fontSize: 13,
    color: "#6B7280",
  },
});
