import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useProducts } from "@/features/modules/products/context/product-provider";
import { NewProductPayload } from "../features/modules/products/types/new-product-payload";

export default function ProductModalScreen() {
  const { create } = useProducts();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");

  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");

  const [condition, setCondition] = useState<"Novo" | "Usado">("Novo");

  const [stockDate, setStockDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [saving, setSaving] = useState(false);

  function parseNumber(value: string): number {
    if (!value.trim()) return 0;
    return parseFloat(value.replace(".", "").replace(",", ".")) || 0;
  }

  async function handleSave() {
    if (saving) return;

    if (!name.trim() || !brand.trim()) {
      alert("Nome e Marca são obrigatórios");
      return;
    }

    setSaving(true);

    try {
      const payload: NewProductPayload = {
        name: name.trim(),
        brand: brand.trim(),
        sku: sku.trim(),
        size: size.trim(),
        color: color.trim(),
        location: location.trim(),
        stock: parseInt(stock || "0", 10) || 0,
        price: parseNumber(price),
        cost: parseNumber(cost),
        condition,
        stockDate: stockDate.toISOString(),
      };

      await create(payload);
      router.back();
    } finally {
      setSaving(false);
    }
  }

  function handleConfirmDate(date: Date) {
    setStockDate(date);
    setDatePickerVisible(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header fixo */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerSide}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Novo Produto</Text>

        <TouchableOpacity
          onPress={handleSave}
          style={styles.headerSide}
          disabled={saving}
        >
          <Text style={[styles.saveText, saving && styles.saveTextDisabled]}>
            {saving ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Bloco: Info básica */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>

          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Air Jordan 1 High"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Marca *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Nike"
            value={brand}
            onChangeText={setBrand}
          />

          <Text style={styles.label}>SKU</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: AJ1-001-42"
            value={sku}
            onChangeText={setSku}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Detalhes</Text>

          <Text style={styles.label}>Tamanho</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 42 ou 9.5 US"
            value={size}
            onChangeText={setSize}
          />

          <Text style={styles.label}>Cor</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Preto/Vermelho"
            value={color}
            onChangeText={setColor}
          />

          <Text style={styles.label}>Condição</Text>
          <View style={styles.conditionRow}>
            <TouchableOpacity
              style={[
                styles.conditionBtn,
                condition === "Novo" && styles.conditionBtnActive,
              ]}
              onPress={() => setCondition("Novo")}
            >
              <Text
                style={[
                  styles.conditionText,
                  condition === "Novo" && styles.conditionTextActive,
                ]}
              >
                Novo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.conditionBtn,
                condition === "Usado" && styles.conditionBtnActive,
              ]}
              onPress={() => setCondition("Usado")}
            >
              <Text
                style={[
                  styles.conditionText,
                  condition === "Usado" && styles.conditionTextActive,
                ]}
              >
                Usado
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Localização</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Prateleira A3"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        {/* Bloco: Estoque/Valores */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Estoque e Valores</Text>

          <Text style={styles.label}>Quantidade em Estoque</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            value={stock}
            onChangeText={setStock}
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Preço de Venda (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="0,00"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Custo (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="0,00"
            value={cost}
            onChangeText={setCost}
            keyboardType="decimal-pad"
          />

          <Text style={styles.label}>Data de Entrada no Estoque</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.dateText}>
              {stockDate.toLocaleDateString("pt-BR")}
            </Text>
            <Text style={styles.dateIcon}>📅</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={stockDate}
        maximumDate={new Date()}
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerSide: {
    width: 80,
  },
  cancelText: {
    fontSize: 16,
    color: "#666",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    textAlign: "right",
  },
  saveTextDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#000",
  },
  conditionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  conditionBtn: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  conditionBtnActive: {
    backgroundColor: "#000",
  },
  conditionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  conditionTextActive: {
    color: "#FFF",
  },
  dateButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  dateText: {
    fontSize: 15,
    color: "#000",
  },
  dateIcon: {
    fontSize: 16,
  },
});
