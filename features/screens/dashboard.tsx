import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardScreen() {
  const stats = {
    totalInventory: 247,
    lowStock: 8,
    totalValue: 89450,
    monthlySales: 156,
  };

  const topProducts = [
    { name: "Air Jordan 1 High", stock: 12, sales: 28 },
    { name: "Nike Dunk Low", stock: 8, sales: 24 },
    { name: "Yeezy 350 V2", stock: 15, sales: 19 },
    { name: "New Balance 550", stock: 10, sales: 17 },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, styles.primaryCard]}>
          <Text style={styles.statLabelWhite}>Estoque Total</Text>
          <Text style={styles.statValueWhite}>{stats.totalInventory}</Text>
          <Text style={styles.statUnitWhite}>pares</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Estoque Baixo</Text>
          <Text style={[styles.statValue, styles.warningValue]}>
            {stats.lowStock}
          </Text>
          <Text style={styles.statUnit}>itens</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Valor Total</Text>
          <Text style={styles.statValue}>
            R$ {(stats.totalValue / 1000).toFixed(0)}k
          </Text>
          <Text style={styles.statUnit}>em estoque</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Vendas (mês)</Text>
          <Text style={styles.statValue}>{stats.monthlySales}</Text>
          <Text style={styles.statUnit}>pares</Text>
        </View>
      </View>

      {/* Simple Chart Visualization */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Vendas Mensais</Text>
        <View style={styles.chartContainer}>
          {[45, 52, 48, 61, 55, 67].map((value, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={[styles.bar, { height: value * 2 }]} />
              <Text style={styles.barLabel}>
                {["J", "F", "M", "A", "M", "J"][index]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mais Vendidos</Text>
        {topProducts.map((product, index) => (
          <View key={index} style={styles.productRow}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productStock}>
                {product.stock} em estoque
              </Text>
            </View>
            <View style={styles.productSales}>
              <Text style={styles.salesNumber}>{product.sales}</Text>
              <Text style={styles.salesLabel}>vendas</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
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
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryCard: {
    backgroundColor: "#000",
  },
  statLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
  },
  statLabelWhite: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -1,
  },
  statValueWhite: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: -1,
  },
  warningValue: {
    color: "#FF3B30",
  },
  statUnit: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
  },
  statUnitWhite: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 140,
    paddingTop: 10,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 30,
    backgroundColor: "#000",
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: "#999",
  },
  section: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  productStock: {
    fontSize: 13,
    color: "#999",
  },
  productSales: {
    alignItems: "flex-end",
  },
  salesNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  salesLabel: {
    fontSize: 12,
    color: "#999",
  },
});
