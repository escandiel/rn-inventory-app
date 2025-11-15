import React from "react";
import { View, Text, StyleSheet } from "react-native";
import currency from "@/helpers/money";
import { Sale } from "../types/sales";
import { PaymentMethod } from "../types/payment-method";

interface SaleInfoCardProps {
  sale: Sale;
}

export function SaleInfoCard({ sale }: SaleInfoCardProps) {
  const paymentLabels: Record<PaymentMethod, string> = {
    pix: "Pix",
    card: "Cartão",
    cash: "Dinheiro",
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Detalhes da Venda</Text>

      <InfoRow label="Total" value={currency(sale.total)} />
      <InfoRow label="Método" value={paymentLabels[sale.method]} />
      <InfoRow
        label="Status"
        value={sale.status === "paid" ? "Pago" : "Pendente"}
      />
      <InfoRow label="ID" value={sale.id} isLast />
    </View>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

function InfoRow({ label, value, isLast = false }: InfoRowProps) {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  label: {
    fontSize: 15,
    color: "#999",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
});
