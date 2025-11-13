import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const product = params.productData
    ? JSON.parse(params.productData as string)
    : null;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  const profit = product.price - product.cost;
  const profitMargin = ((profit / product.price) * 100).toFixed(1);
  const totalValue = product.price * product.stock;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Product Title Card */}
        <View style={styles.titleCard}>
          <View style={styles.titleHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productSubtitle}>
                {product.brand} • {product.color}
              </Text>
            </View>
            <View
              style={[
                styles.stockBadge,
                product.stock < 10 && styles.lowStockBadge,
              ]}
            >
              <Text
                style={[
                  styles.stockText,
                  product.stock < 10 && styles.lowStockText,
                ]}
              >
                {product.stock} un
              </Text>
            </View>
          </View>
          <Text style={styles.sku}>SKU: {product.sku}</Text>
        </View>

        {/* Price Card */}
        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Preço de Venda</Text>
              <Text style={styles.priceValue}>R$ {product.price}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceItem}>
              <Text style={styles.priceLabel}>Custo</Text>
              <Text style={styles.costValue}>R$ {product.cost}</Text>
            </View>
          </View>

          <View style={styles.profitSection}>
            <View style={styles.profitHeader}>
              <Text style={styles.profitLabel}>Margem de Lucro</Text>
              <Text style={styles.profitValue}>{profitMargin}%</Text>
            </View>
            <View style={styles.profitBar}>
              <View
                style={[
                  styles.profitFill,
                  { width: `${profitMargin}%` as any },
                ]}
              />
            </View>
            <Text style={styles.profitAmount}>R$ {profit} por unidade</Text>
          </View>
        </View>

        {/* Inventory Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Informações de Estoque</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Quantidade</Text>
            <Text style={styles.infoValue}>{product.stock} pares</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Valor Total</Text>
            <Text style={styles.infoValue}>
              R$ {totalValue.toLocaleString("pt-BR")}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Localização</Text>
            <Text style={styles.infoValue}>{product.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Condição</Text>
            <Text style={styles.infoValue}>{product.condition}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Detalhes do Produto</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Marca</Text>
            <Text style={styles.infoValue}>{product.brand}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Modelo</Text>
            <Text style={styles.infoValue}>{product.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cor</Text>
            <Text style={styles.infoValue}>{product.color}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tamanho</Text>
            <Text style={styles.infoValue}>{product.size} BR</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Editar Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Ajustar Estoque</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Remover Produto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
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
  titleCard: {
    backgroundColor: "#000",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  productSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
  },
  sku: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
  },
  stockBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  lowStockBadge: {
    backgroundColor: "rgba(255,59,48,0.2)",
  },
  stockText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFF",
  },
  lowStockText: {
    color: "#FF6B6B",
  },
  priceCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  priceRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  priceItem: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: "#F5F5F5",
    marginHorizontal: 20,
  },
  priceLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -1,
  },
  costValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#666",
    letterSpacing: -1,
  },
  profitSection: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  profitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  profitLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  profitValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#34C759",
    letterSpacing: -0.5,
  },
  profitBar: {
    height: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  profitFill: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 4,
  },
  profitAmount: {
    fontSize: 13,
    color: "#999",
  },
  infoCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  infoLabel: {
    fontSize: 15,
    color: "#999",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  actionButtons: {
    marginHorizontal: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  dangerButtonText: {
    color: "#FF3B30",
    fontSize: 15,
    fontWeight: "600",
  },
});
