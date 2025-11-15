import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AppModal } from "@/components/AppModal";
import { NewSalePayload } from "../types/sales";
import { PaymentMethod } from "../types/payment-method";
import { SaleStatus } from "../types/sale-status";

interface AddSaleModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: NewSalePayload) => Promise<unknown> | void;
}

export function AddSaleModal({ visible, onClose, onSave }: AddSaleModalProps) {
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState("1");
  const [total, setTotal] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [status, setStatus] = useState<SaleStatus>("paid");

  function resetForm() {
    setCustomer("");
    setItems("1");
    setTotal("");
    setMethod("pix");
    setStatus("paid");
  }

  async function handleSave() {
    const totalValue = parseFloat(total.replace(",", ".")) || 0;
    const itemsValue = parseInt(items) || 1;

    if (totalValue <= 0 || itemsValue <= 0) {
      return;
    }

    const payload: NewSalePayload = {
      customer: customer.trim() || undefined,
      items: itemsValue,
      total: totalValue,
      method,
      status,
    };

    await onSave(payload);
    resetForm();
    onClose();
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  return (
    <AppModal visible={visible} onClose={handleClose}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Nova Venda</Text>

        <Text style={styles.label}>Cliente (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do cliente"
          value={customer}
          onChangeText={setCustomer}
        />

        <Text style={styles.label}>Quantidade de itens</Text>
        <TextInput
          style={styles.input}
          placeholder="1"
          value={items}
          onChangeText={setItems}
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Valor total</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          value={total}
          onChangeText={setTotal}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Método de pagamento</Text>
        <View style={styles.methodRow}>
          <TouchableOpacity
            style={[
              styles.methodBtn,
              method === "pix" && styles.methodBtnActive,
            ]}
            onPress={() => setMethod("pix")}
          >
            <Text
              style={[
                styles.methodText,
                method === "pix" && styles.methodTextActive,
              ]}
            >
              Pix
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodBtn,
              method === "card" && styles.methodBtnActive,
            ]}
            onPress={() => setMethod("card")}
          >
            <Text
              style={[
                styles.methodText,
                method === "card" && styles.methodTextActive,
              ]}
            >
              Cartão
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodBtn,
              method === "cash" && styles.methodBtnActive,
            ]}
            onPress={() => setMethod("cash")}
          >
            <Text
              style={[
                styles.methodText,
                method === "cash" && styles.methodTextActive,
              ]}
            >
              Dinheiro
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Status</Text>
        <View style={styles.methodRow}>
          <TouchableOpacity
            style={[
              styles.methodBtn,
              status === "paid" && styles.methodBtnActive,
            ]}
            onPress={() => setStatus("paid")}
          >
            <Text
              style={[
                styles.methodText,
                status === "paid" && styles.methodTextActive,
              ]}
            >
              Pago
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodBtn,
              status === "pending" && styles.methodBtnActive,
            ]}
            onPress={() => setStatus("pending")}
          >
            <Text
              style={[
                styles.methodText,
                status === "pending" && styles.methodTextActive,
              ]}
            >
              Pendente
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar Venda</Text>
        </TouchableOpacity>
      </ScrollView>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#000",
  },
  methodRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  methodBtn: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  methodBtnActive: {
    backgroundColor: "#000",
  },
  methodText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  methodTextActive: {
    color: "#FFF",
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
  },
});
