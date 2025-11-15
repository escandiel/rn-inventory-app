import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { SegmentButton } from "./segment-button";

interface ControlsCardProps {
  range: string;
  setRange: (range: any) => void;
  query: string;
  setQuery: (query: string) => void;
}

export function ControlsCard({
  range,
  setRange,
  query,
  setQuery,
}: ControlsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.segment}>
        <SegmentButton
          label="Hoje"
          value="today"
          active={range}
          onPress={setRange}
        />
        <SegmentButton
          label="7d"
          value="7d"
          active={range}
          onPress={setRange}
        />
        <SegmentButton
          label="30d"
          value="30d"
          active={range}
          onPress={setRange}
        />
        <SegmentButton
          label="Tudo"
          value="all"
          active={range}
          onPress={setRange}
        />
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Buscar por cliente, método ou valor"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={() => {}} style={styles.calendarBtn}>
          <Text style={styles.calendarText}>📅</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#F4F4F5",
    borderRadius: 12,
    padding: 4,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#000",
  },
  calendarBtn: {
    marginLeft: 10,
    backgroundColor: "#000",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  calendarText: {
    fontSize: 16,
  },
});
