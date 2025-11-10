import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";

function randomId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}
function currency(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function formatDayLabel(d: Date) {
  const hoje = new Date();
  const isToday =
    d.getFullYear() === hoje.getFullYear() &&
    d.getMonth() === hoje.getMonth() &&
    d.getDate() === hoje.getDate();
  if (isToday) return "Hoje";
  return d.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}
type PaymentMethod = "pix" | "card" | "cash";
type SaleStatus = "paid" | "pending";

type Sale = {
  id: string;
  createdAt: string; // ISO
  customer?: string;
  items: number;
  total: number;
  method: PaymentMethod;
  status: SaleStatus;
};

const MOCK: Sale[] = [
  {
    id: randomId(),
    createdAt: new Date().toISOString(),
    customer: "Rodrigo Alves",
    items: 2,
    total: 2199.9,
    method: "pix",
    status: "paid",
  },
  {
    id: randomId(),
    createdAt: new Date().toISOString(),
    customer: "Ana Souza",
    items: 1,
    total: 799.9,
    method: "card",
    status: "pending",
  },
  {
    id: randomId(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    customer: "Walk-in",
    items: 3,
    total: 1450,
    method: "cash",
    status: "paid",
  },
  {
    id: randomId(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    customer: "Marina",
    items: 1,
    total: 1299.9,
    method: "pix",
    status: "paid",
  },
  {
    id: randomId(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    customer: "Thiago",
    items: 2,
    total: 1699.9,
    method: "card",
    status: "paid",
  },
];

type Range = "today" | "7d" | "30d" | "all";

export default function SalesScreen() {
  const [range, setRange] = useState<Range>("7d");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [sales, setSales] = useState<Sale[]>(MOCK);

  const filtered = useMemo(() => {
    const now = new Date();
    const minDate =
      range === "today"
        ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
        : range === "7d"
          ? new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7)
          : range === "30d"
            ? new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30)
            : new Date(0);

    return sales
      .filter((s) => new Date(s.createdAt) >= minDate)
      .filter((s) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          s.customer?.toLowerCase().includes(q) ||
          s.method.toLowerCase().includes(q) ||
          String(s.total).includes(q)
        );
      })
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [sales, range, query]);

  const summary = useMemo(() => {
    const count = filtered.length;
    const revenue = filtered.reduce((acc, s) => acc + s.total, 0);
    const avg = count ? revenue / count : 0;
    return { count, revenue, avg };
  }, [filtered]);

  const grouped = useMemo(() => {
    const map = new Map<string, Sale[]>();
    for (const s of filtered) {
      const d = new Date(s.createdAt);
      const key = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
      ).toISOString();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    }
    const arr = Array.from(map.entries())
      .sort((a, b) => +new Date(b[0]) - +new Date(a[0]))
      .map(([dayIso, rows]) => ({ dayIso, rows }));
    return arr;
  }, [filtered]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const SegmentBtn = ({ label, value }: { label: string; value: Range }) => (
    <TouchableOpacity
      onPress={() => setRange(value)}
      style={[styles.segmentBtn, range === value && styles.segmentBtnActive]}
    >
      <Text
        style={[
          styles.segmentLabel,
          range === value && styles.segmentLabelActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const PaymentPill = ({ method }: { method: PaymentMethod }) => (
    <View style={[styles.pill, styles[`pill_${method}` as const]]}>
      <Text style={styles.pillText}>
        {method === "pix" ? "Pix" : method === "card" ? "Cartão" : "Dinheiro"}
      </Text>
    </View>
  );

  const StatusPill = ({ status }: { status: SaleStatus }) => (
    <View
      style={[
        styles.pill,
        status === "paid" ? styles.pill_ok : styles.pill_warn,
      ]}
    >
      <Text style={styles.pillText}>
        {status === "paid" ? "Pago" : "Pendente"}
      </Text>
    </View>
  );

  const renderGroup = ({
    item,
  }: {
    item: { dayIso: string; rows: Sale[] };
  }) => {
    const d = new Date(item.dayIso);
    return (
      <View style={styles.group}>
        <Text style={styles.groupLabel}>{formatDayLabel(d)}</Text>
        <View style={styles.card}>
          {item.rows.map((s, idx) => (
            <TouchableOpacity
              key={s.id}
              onPress={() => router.push(`/sales/${s.id}`)} //fix this route
              style={[
                styles.row,
                idx < item.rows.length - 1 && styles.rowDivider,
              ]}
            >
              <View style={styles.rowLeft}>
                <Text style={styles.rowTitle}>
                  {s.customer || "Sem cliente"} • {s.items}{" "}
                  {s.items > 1 ? "itens" : "item"}
                </Text>
                <View style={styles.rowTags}>
                  <PaymentPill method={s.method} />
                  <StatusPill status={s.status} />
                </View>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.rowAmount}>{currency(s.total)}</Text>
                <Text style={styles.rowTime}>
                  {new Date(s.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Registro de vendas</Text>
        <Text style={styles.subtitle}>Forfeet Sneakers</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryGrid}>
        <View style={[styles.summaryCard, styles.primaryCard]}>
          <Text style={styles.summaryLabelWhite}>Vendas</Text>
          <Text style={styles.summaryValueWhite}>{summary.count}</Text>
          <Text style={styles.summarySubWhite}>
            {range === "today"
              ? "hoje"
              : range === "7d"
                ? "últimos 7 dias"
                : range === "30d"
                  ? "últimos 30 dias"
                  : "todo período"}
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Receita</Text>
          <Text style={styles.summaryValue}>{currency(summary.revenue)}</Text>
          <Text style={styles.summarySub}>bruta</Text>
        </View>
      </View>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Ticket médio</Text>
          <Text style={styles.summaryValue}>{currency(summary.avg)}</Text>
          <Text style={styles.summarySub}>por venda</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Status</Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 6 }}>
            <View style={[styles.dot, { backgroundColor: "#10B981" }]} />
            <Text style={styles.summarySub}>
              {filtered.filter((s) => s.status === "paid").length} pagos
            </Text>
            <View style={[styles.dot, { backgroundColor: "#F59E0B" }]} />
            <Text style={styles.summarySub}>
              {filtered.filter((s) => s.status === "pending").length} pendentes
            </Text>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsCard}>
        <View style={styles.segment}>
          <SegmentBtn label="Hoje" value="today" />
          <SegmentBtn label="7d" value="7d" />
          <SegmentBtn label="30d" value="30d" />
          <SegmentBtn label="Tudo" value="all" />
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

      <FlatList
        data={grouped}
        keyExtractor={(g) => g.dayIso}
        renderItem={renderGroup}
        contentContainerStyle={{ paddingBottom: 24 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.fabWrap}>
        <TouchableOpacity
          onPress={() => router.push("/sales/new")}
          style={styles.fab}
        >
          <Text style={styles.fabText}>+ Nova venda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 8 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.6,
  },
  subtitle: { fontSize: 14, color: "#666", marginTop: 2 },

  summaryGrid: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryCard: { backgroundColor: "#000" },
  summaryLabel: { fontSize: 13, color: "#999", marginBottom: 8 },
  summaryValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.5,
  },
  summarySub: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },

  summaryLabelWhite: {
    fontSize: 13,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 8,
  },
  summaryValueWhite: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: -0.5,
  },
  summarySubWhite: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },

  controlsCard: {
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
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  segmentBtnActive: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  segmentLabel: { fontSize: 14, color: "#6B7280", fontWeight: "600" },
  segmentLabelActive: { color: "#000" },

  searchRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
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
  calendarText: { color: "#FFF", fontSize: 16 },

  group: { paddingHorizontal: 20, marginTop: 16 },
  groupLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: "#F2F2F2" },
  rowLeft: { flex: 1 },
  rowTitle: { fontSize: 15, color: "#111827", fontWeight: "600" },
  rowTags: { flexDirection: "row", gap: 8, marginTop: 6 },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F4F4F5",
  },
  pill_ok: { backgroundColor: "rgba(16,185,129,0.12)" },
  pill_warn: { backgroundColor: "rgba(245,158,11,0.14)" },
  pill_pix: { backgroundColor: "rgba(16,185,129,0.12)" },
  pill_card: { backgroundColor: "rgba(59,130,246,0.14)" },
  pill_cash: { backgroundColor: "rgba(31,41,55,0.12)" },
  pillText: { fontSize: 12, color: "#111827", fontWeight: "600" },

  rowRight: { alignItems: "flex-end" },
  rowAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.2,
  },
  rowTime: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },

  fabWrap: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  fab: {
    backgroundColor: "#000",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  fabText: { color: "#FFF", fontSize: 15, fontWeight: "700" },
});
