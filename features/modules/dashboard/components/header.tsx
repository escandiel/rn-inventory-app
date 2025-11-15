import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function DashboardHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Olá 👋</Text>
        <Text style={styles.subtitle}>Forfeet Sneakers</Text>
      </View>
      <TouchableOpacity
        onPress={() => signOut(auth)}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
});
