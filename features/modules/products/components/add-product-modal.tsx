import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AppModal } from "@/components/AppModal";
import { NewProductPayload } from "../types/new-product-payload";
import { useProducts } from "../hooks/use-product";

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: NewProductPayload) => Promise<unknown> | void;
}

export function AddProductModal({
  visible,
  onClose,
  onSave,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");

  async function handleSave() {
    if (!name.trim()) return;

    const payload: NewProductPayload = {
      name,
      brand,
      sku,
      size: "",
      price: 0,
      cost: 0,
      stock: 0,
      color: "",
      condition: "Novo",
      location: "",
    };

    console.log(payload);
    await onSave(payload);
    onClose();
  }

  return (
    <AppModal visible={visible} onClose={onClose}>
      <Text style={styles.title}>Adicionar Produto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={setBrand}
      />

      <TextInput
        style={styles.input}
        placeholder="SKU"
        value={sku}
        onChangeText={setSku}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  saveButton: {
    marginTop: 10,
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
