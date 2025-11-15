import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { PaymentPill } from "./payment-pill";
import { StatusPill } from "./status-pill";
import currency from "@/helpers/money";
import { Sale } from "../types/sales";

interface SaleRowProps {
  sale: Sale;
  showDivider: boolean;
  onPress: () => void;
}

export function SaleRow({ sale, showDivider, onPress }: SaleRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.row, showDivider && styles.rowDivider]}
    >
      <View style={styles.left}>
        <Text style={styles.title}>
          {sale.customer || "Sem cliente"} • {sale.items}{" "}
          {sale.items > 1 ? "itens" : "item"}
        </Text>
        <View style={styles.tags}>
          <PaymentPill method={sale.method} />
          <StatusPill status={sale.status} />
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{currency(sale.total)}</Text>
        <Text style={styles.time}>
          {new Date(sale.createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
  },
  right: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.2,
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
