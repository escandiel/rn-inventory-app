import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "../types/product-model";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const marginPercent = ((product.price - product.cost) / product.price) * 100;

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.productHeader}>
        <View style={styles.productTitleContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>
            {product.brand} • Tam {product.size}
          </Text>
        </View>
        <View
          style={[
            styles.stockBadge,
            product.stock < 10 && styles.lowStockBadge,
          ]}
        >
          <Text
            style={[
              styles.stockText,
              product.stock < 10 && styles.lowStockText,
            ]}
          >
            {product.stock} un
          </Text>
        </View>
      </View>

      <View style={styles.productFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$ {product.price}</Text>
          <Text style={styles.cost}>Custo: R$ {product.cost}</Text>
        </View>
        <Text style={styles.sku}>SKU: {product.sku}</Text>
      </View>

      <View style={styles.profitBar}>
        <View
          style={[
            styles.profitFill,
            {
              width: `${marginPercent}%`,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  productBrand: {
    fontSize: 13,
    color: "#999",
  },
  stockBadge: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  lowStockBadge: {
    backgroundColor: "#FFF1F0",
  },
  stockText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  lowStockText: {
    color: "#FF3B30",
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  cost: {
    fontSize: 12,
    color: "#999",
  },
  sku: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  profitBar: {
    height: 4,
    backgroundColor: "#F5F5F5",
    borderRadius: 2,
    overflow: "hidden",
  },
  profitFill: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 2,
  },
});
