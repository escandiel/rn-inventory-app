import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface DetailHeaderProps {
  onBack: () => void;
}

export function DetailHeader({ onBack }: DetailHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
});
