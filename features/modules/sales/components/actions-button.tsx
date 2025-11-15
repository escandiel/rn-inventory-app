import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

interface ActionButtonsProps {
  onDelete: () => void;
}

export function ActionButtons({ onDelete }: ActionButtonsProps) {
  function confirmDelete() {
    Alert.alert(
      "Excluir Venda",
      "Tem certeza que deseja excluir esta venda? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: onDelete,
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dangerButton} onPress={confirmDelete}>
        <Text style={styles.dangerText}>Excluir Venda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    gap: 12,
  },
  dangerButton: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  dangerText: {
    color: "#FF3B30",
    fontSize: 15,
    fontWeight: "600",
  },
});
