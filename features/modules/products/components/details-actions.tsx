import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  onEdit: () => void;
  onRemove: () => void;
}

export function ProductDetailActions({ onEdit, onRemove }: Props) {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Text style={styles.editText}>Editar produto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
        <Text style={styles.deleteText}>Remover produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  editText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  deleteText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "600",
  },
});
