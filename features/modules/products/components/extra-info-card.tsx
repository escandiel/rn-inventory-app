import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Product } from "../types/product-model";

interface Props {
  product: Product;
}

export function ProductExtraInfoCard({ product }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Detalhes do produto</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Marca</Text>
        <Text style={styles.infoValue}>{product.brand}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Modelo</Text>
        <Text style={styles.infoValue}>{product.name}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Cor</Text>
        <Text style={styles.infoValue}>{product.color || "Não informado"}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Tamanho</Text>
        <Text style={styles.infoValue}>
          {product.size ? `${product.size} BR` : "Não informado"}
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
