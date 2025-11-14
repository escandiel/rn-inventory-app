import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AppModal({ visible, onClose, children }: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.modalContainer}>{children}</Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    padding: 24,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
  },
});
