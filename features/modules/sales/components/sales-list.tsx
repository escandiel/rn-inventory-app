import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { SalesGroup } from "./sales-group";
import { Sale } from "../types/sales";

interface SalesListProps {
  grouped: Array<{ dayIso: string; rows: Sale[] }>;
  refreshing: boolean;
  onRefresh: () => void;
  onSalePress: (id: string) => void;
}

export function SalesList({
  grouped,
  refreshing,
  onRefresh,
  onSalePress,
}: SalesListProps) {
  return (
    <FlatList
      data={grouped}
      keyExtractor={(g) => g.dayIso}
      renderItem={({ item }) => (
        <SalesGroup group={item} onSalePress={onSalePress} />
      )}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#000"
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
});
