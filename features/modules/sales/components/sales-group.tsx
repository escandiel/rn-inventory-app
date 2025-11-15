import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SaleRow } from "./sales-row";
import formatDayLabel from "@/helpers/dates";
import { Sale } from "../types/sales";

interface SalesGroupProps {
  group: { dayIso: string; rows: Sale[] };
  onSalePress: (id: string) => void;
}

export function SalesGroup({ group, onSalePress }: SalesGroupProps) {
  const date = new Date(group.dayIso);

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{formatDayLabel(date)}</Text>
      <View style={styles.card}>
        {group.rows.map((sale, idx) => (
          <SaleRow
            key={sale.id}
            sale={sale}
            showDivider={idx < group.rows.length - 1}
            onPress={() => onSalePress(sale.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
