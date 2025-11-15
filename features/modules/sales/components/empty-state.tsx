import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Venda não encontrada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  text: {
    fontSize: 16,
    color: "#999",
  },
});
