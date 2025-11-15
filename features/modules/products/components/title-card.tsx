import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Product } from "../types/product-model";

interface Props {
  product: Product;
}

export function ProductTitleCard({ product }: Props) {
  const isLowStock = product.stock < 10;

  return (
    <View style={styles.titleCard}>
      <View style={styles.titleHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productSubtitle}>
            {product.brand}
            {product.color ? ` • ${product.color}` : ""}
          </Text>
        </View>

        <View style={[styles.stockBadge, isLowStock && styles.lowStockBadge]}>
          <Text style={[styles.stockText, isLowStock && styles.lowStockText]}>
            {product.stock} un
          </Text>
        </View>
      </View>

      <View style={styles.titleFooter}>
        <Text style={styles.sku}>SKU: {product.sku || "—"}</Text>

        <View
          style={[
            styles.conditionPill,
            product.condition === "Novo"
              ? styles.conditionNew
              : styles.conditionUsed,
          ]}
        >
          <Text style={styles.conditionText}>{product.condition || "—"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleCard: {
    backgroundColor: "#000",
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 20,
    borderRadius: 16,
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  productSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
  },
  titleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  sku: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
  stockBadge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  lowStockBadge: {
    backgroundColor: "rgba(255,59,48,0.25)",
  },
  stockText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFF",
  },
  lowStockText: {
    color: "#FFE4E0",
  },
  conditionPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  conditionNew: {
    backgroundColor: "rgba(16,185,129,0.18)",
  },
  conditionUsed: {
    backgroundColor: "rgba(59,130,246,0.18)",
  },
  conditionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F9FAFB",
  },
});
