import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      name: "Air Jordan 1 High",
      brand: "Nike",
      size: "42",
      stock: 12,
      price: 1299,
      cost: 890,
      sku: "AJ1-001",
      color: "Chicago",
      condition: "Novo",
      location: "Prateleira A3",
    },
    {
      id: 2,
      name: "Nike Dunk Low",
      brand: "Nike",
      size: "40",
      stock: 8,
      price: 899,
      cost: 650,
      sku: "DK-102",
      color: "Panda",
      condition: "Novo",
      location: "Prateleira B1",
    },
    {
      id: 3,
      name: "Yeezy 350 V2",
      brand: "Adidas",
      size: "41",
      stock: 15,
      price: 2199,
      cost: 1600,
      sku: "YZ-203",
      color: "Zebra",
      condition: "Novo",
      location: "Prateleira C2",
    },
    {
      id: 4,
      name: "New Balance 550",
      brand: "New Balance",
      size: "43",
      stock: 10,
      price: 799,
      cost: 550,
      sku: "NB-304",
      color: "White Green",
      condition: "Novo",
      location: "Prateleira A5",
    },
    {
      id: 5,
      name: "Air Force 1",
      brand: "Nike",
      size: "42",
      stock: 20,
      price: 699,
      cost: 480,
      sku: "AF1-405",
      color: "Triple White",
      condition: "Novo",
      location: "Prateleira B4",
    },
    {
      id: 6,
      name: "Adidas Samba",
      brand: "Adidas",
      size: "41",
      stock: 5,
      price: 599,
      cost: 420,
      sku: "SMB-506",
      color: "Black White",
      condition: "Novo",
      location: "Prateleira C1",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalItems = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockItems = products.filter((p) => p.stock < 10).length;

  const handleProductPress = (product: any) => {
    router.push({
      pathname: "/product-detail-page",
      params: { productData: JSON.stringify(product) },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.headerStats}>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{products.length}</Text>
          <Text style={styles.miniStatLabel}>SKUs</Text>
        </View>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>{totalItems}</Text>
          <Text style={styles.miniStatLabel}>Total</Text>
        </View>
        <View style={styles.miniStat}>
          <Text
            style={[
              styles.miniStatValue,
              lowStockItems > 0 && styles.warningText,
            ]}
          >
            {lowStockItems}
          </Text>
          <Text style={styles.miniStatLabel}>Baixo</Text>
        </View>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatValue}>
            R$ {(totalValue / 1000).toFixed(0)}k
          </Text>
          <Text style={styles.miniStatLabel}>Valor</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produto, marca ou SKU..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Add Product Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.productsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => handleProductPress(product)}
            activeOpacity={0.7}
          >
            <View style={styles.productHeader}>
              <View style={styles.productTitleContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productBrand}>
                  {product.brand} • Tam {product.size}
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

            <View style={styles.productFooter}>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>R$ {product.price}</Text>
                <Text style={styles.cost}>Custo: R$ {product.cost}</Text>
              </View>
              <Text style={styles.sku}>SKU: {product.sku}</Text>
            </View>

            <View style={styles.profitBar}>
              <View
                style={[
                  styles.profitFill,
                  {
                    width: `${((product.price - product.cost) / product.price) * 100}%`,
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
        ))}

        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
            <Text style={styles.emptySubtext}>
              Tente buscar por outro termo
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  headerStats: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  miniStat: {
    flex: 1,
    alignItems: "center",
  },
  miniStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -0.5,
  },
  miniStatLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
  warningText: {
    color: "#FF3B30",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#000",
  },
  clearButton: {
    fontSize: 18,
    color: "#999",
    paddingLeft: 8,
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  productsList: {
    flex: 1,
  },
  productCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  productBrand: {
    fontSize: 13,
    color: "#999",
  },
  stockBadge: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  lowStockBadge: {
    backgroundColor: "#FFF1F0",
  },
  stockText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  lowStockText: {
    color: "#FF3B30",
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  cost: {
    fontSize: 12,
    color: "#999",
  },
  sku: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  profitBar: {
    height: 4,
    backgroundColor: "#F5F5F5",
    borderRadius: 2,
    overflow: "hidden",
  },
  profitFill: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 2,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
});
