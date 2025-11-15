import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PaymentMethod } from "../types/payment-method";

interface PaymentPillProps {
  method: PaymentMethod;
}

export function PaymentPill({ method }: PaymentPillProps) {
  const labels: Record<PaymentMethod, string> = {
    pix: "Pix",
    card: "Cartão",
    cash: "Dinheiro",
  };

  return (
    <View style={[styles.pill, styles[`pill_${method}`]]}>
      <Text style={styles.text}>{labels[method]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F4F4F5",
  },
  pill_pix: {
    backgroundColor: "rgba(16,185,129,0.12)",
  },
  pill_card: {
    backgroundColor: "rgba(59,130,246,0.14)",
  },
  pill_cash: {
    backgroundColor: "rgba(31,41,55,0.12)",
  },
  text: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "600",
  },
});
