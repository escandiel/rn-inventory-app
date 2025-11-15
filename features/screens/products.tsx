import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useProductsList } from "../modules/products/hooks/use-products-list";
import { ProductsHeaderStats } from "../modules/products/components/header-stats";
import { ProductsSearchBar } from "../modules/products/components/search-bar";
import { ProductCard } from "../modules/products/components/card";

import { useProducts } from "../modules/products/context/product-provider";
import { NewProductPayload } from "../modules/products/types/new-product-payload";
import { router } from "expo-router";

export default function ProductsScreen() {
  const {
    filteredProducts,
    totalItems,
    lowStockItems,
    totalValue,
    searchQuery,
    setSearchQuery,
    openDetails,
    loading,
    error,
    products,
    reload,
  } = useProductsList();

  const { create } = useProducts();

  const [modalVisible, setModalVisible] = useState(false);

  async function handleSaveProduct(data: NewProductPayload) {
    await create(data);
    await reload();
  }

  return (
    <View style={styles.container}>
      <ProductsHeaderStats
        skuCount={products.length}
        totalItems={totalItems}
        lowStockItems={lowStockItems}
        totalValue={totalValue}
      />

      <ProductsSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery("")}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/product-modal")}
      >
        <Text style={styles.addButtonText}>+ Novo Produto</Text>
      </TouchableOpacity>

      <ScrollView style={styles.productsList}>
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} onPress={() => openDetails(p)} />
        ))}

        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
            <Text style={styles.emptySubtext}>Tente outro termo</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  productsList: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
});
