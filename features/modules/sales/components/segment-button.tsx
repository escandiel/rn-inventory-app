import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SegmentButtonProps {
  label: string;
  value: string;
  active: string;
  onPress: (value: any) => void;
}

export function SegmentButton({
  label,
  value,
  active,
  onPress,
}: SegmentButtonProps) {
  const isActive = active === value;

  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={[styles.button, isActive && styles.buttonActive]}
    >
      <Text style={[styles.label, isActive && styles.labelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  labelActive: {
    color: "#000",
  },
});
