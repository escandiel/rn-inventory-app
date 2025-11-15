import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SaleStatus } from "../types/sale-status";

interface StatusPillProps {
  status: SaleStatus;
}

export function StatusPill({ status }: StatusPillProps) {
  const isPaid = status === "paid";

  return (
    <View style={[styles.pill, isPaid ? styles.pillPaid : styles.pillPending]}>
      <Text style={styles.text}>{isPaid ? "Pago" : "Pendente"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillPaid: {
    backgroundColor: "rgba(16,185,129,0.12)",
  },
  pillPending: {
    backgroundColor: "rgba(245,158,11,0.14)",
  },
  text: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "600",
  },
});
