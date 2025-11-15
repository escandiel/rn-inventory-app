import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Alert } from "react-native";
import { useProducts } from "../modules/products/context/product-provider";

import { ProductTitleCard } from "../modules/products/components/title-card";
import { ProductDetailActions } from "../modules/products/components/details-actions";
import { ProductPriceCard } from "../modules/products/components/price-card";
import { ProductInventoryCard } from "../modules/products/components/inventory-card";
import { ProductExtraInfoCard } from "../modules/products/components/extra-info-card";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const { remove } = useProducts();

  const product = useMemo(
    () =>
      params.productData ? JSON.parse(params.productData as string) : null,
    [params.productData],
  );

  if (!product) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.emptyTitle}>Produto não encontrado</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.emptyLink}>Voltar para a lista</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const profit = product.price - product.cost;
  const profitMargin = product.price
    ? ((profit / product.price) * 100).toFixed(1)
    : "0.0";
  const totalValue = product.price * product.stock;

  function handleEdit() {
    router.push({
      pathname: "/product-modal",
      params: {
        productData: JSON.stringify(product),
        mode: "edit",
      },
    });
  }

  function handleRemove() {
    Alert.alert(
      "Remover produto",
      `Tem certeza que deseja remover "${product.name}" do estoque?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await remove(product.id);
              router.back();
            } catch (err) {
              console.error(err);
              Alert.alert(
                "Erro",
                "Não foi possível remover o produto. Tente novamente.",
              );
            }
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ProductTitleCard product={product} />

        <ProductDetailActions onEdit={handleEdit} onRemove={handleRemove} />

        <ProductPriceCard
          price={product.price}
          cost={product.cost}
          profit={profit}
          profitMargin={profitMargin}
        />

        <ProductInventoryCard
          stock={product.stock}
          location={product.location}
          totalValue={totalValue}
        />

        <ProductExtraInfoCard product={product} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginTop: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 8,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  emptyLink: {
    fontSize: 14,
    color: "#2563EB",
    marginTop: 4,
  },
});
