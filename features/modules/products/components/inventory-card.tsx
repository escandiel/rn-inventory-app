import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  stock: number;
  location?: string;
  totalValue: number;
}

export function ProductInventoryCard({ stock, location, totalValue }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Informações de estoque</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Quantidade</Text>
        <Text style={styles.infoValue}>{stock} pares</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Valor total</Text>
        <Text style={styles.infoValue}>
          R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Localização</Text>
        <Text style={styles.infoValue}>{location || "Não informado"}</Text>
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
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoLabel: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
});
