import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TopProduct {
  name: string;
  stock: number;
  sales: number;
}

interface TopProductsProps {
  products: TopProduct[];
}

export function TopProducts({ products }: TopProductsProps) {
  if (products.length === 0) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Produtos em Estoque</Text>
        <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Produtos em Estoque</Text>
      {products.map((product, index) => (
        <View key={index} style={styles.productRow}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productStock}>{product.stock} em estoque</Text>
          </View>
          {product.sales > 0 && (
            <View style={styles.productSales}>
              <Text style={styles.salesNumber}>{product.sales}</Text>
              <Text style={styles.salesLabel}>vendas</Text>
            </View>
          )}
        </View>
      ))}
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
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingVertical: 20,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  productStock: {
    fontSize: 13,
    color: "#999",
  },
  productSales: {
    alignItems: "flex-end",
  },
  salesNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  salesLabel: {
    fontSize: 12,
    color: "#999",
  },
});
