import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de vendas</Text>
      <Text style={styles.subtitle}>Forfeet Sneakers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});
