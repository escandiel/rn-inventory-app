import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSalesList } from "../modules/sales/hooks/use-sales-list";
import { useSales } from "../modules/sales/context/sale-context";
import { Header } from "../modules/sales/components/header";
import { SummaryCards } from "../modules/sales/components/summary-card";
import { ControlsCard } from "../modules/sales/components/controls-card";
import { SalesList } from "../modules/sales/components/sales-list";
import { AddSaleModal } from "../modules/sales/components/add-sale-modal";
import { NewSaleButton } from "../modules/sales/components/new-sale-button";
import { NewSalePayload } from "../modules/sales/types/sales";

export default function SalesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { create } = useSales();

  const {
    range,
    setRange,
    query,
    setQuery,
    refreshing,
    summary,
    grouped,
    onRefresh,
    openDetails,
  } = useSalesList();

  return (
    <View style={styles.container}>
      <Header />
      <SummaryCards summary={summary} />
      <ControlsCard
        range={range}
        setRange={setRange}
        query={query}
        setQuery={setQuery}
      />
      <SalesList
        grouped={grouped}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onSalePress={openDetails}
      />
      <NewSaleButton onPress={() => setModalVisible(true)} />
      <AddSaleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(data: NewSalePayload) => create(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});
