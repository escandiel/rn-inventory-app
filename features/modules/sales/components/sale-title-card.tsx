import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Sale } from "../types/sales";

interface SaleTitleCardProps {
  sale: Sale;
}

export function SaleTitleCard({ sale }: SaleTitleCardProps) {
  const formattedDate = new Date(sale.createdAt).toLocaleString("pt-BR");
  const itemsText = sale.items > 1 ? "itens" : "item";

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{sale.customer || "Sem cliente"}</Text>
      <Text style={styles.info}>
        {formattedDate} • {sale.items} {itemsText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#000",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  info: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
  },
});
