import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSaleDetail } from "../modules/sales/hooks/use-sale-detail";
import { DetailHeader } from "../modules/sales/components/detail-header";
import { SaleTitleCard } from "../modules/sales/components/sale-title-card";
import { SaleInfoCard } from "../modules/sales/components/sale-info-card";
import { ActionButtons } from "../modules/sales/components/actions-button";
import { EmptyState } from "../modules/sales/components/empty-state";

export default function SalesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sale, goBack, handleDelete } = useSaleDetail(id);

  if (!sale) {
    return <EmptyState />;
  }

  return (
    <View style={styles.container}>
      <DetailHeader onBack={goBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <SaleTitleCard sale={sale} />
        <SaleInfoCard sale={sale} />
        <ActionButtons onDelete={handleDelete} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    paddingBottom: 40,
  },
});
