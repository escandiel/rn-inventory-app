import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface NewSaleButtonProps {
  onPress: () => void;
}

export function NewSaleButton({ onPress }: NewSaleButtonProps) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>+ Nova venda</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    color: "#F2F2F2",
    fontSize: 15,
    fontWeight: "700",
  },
});
