// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Platform,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { AppModal } from "@/components/AppModal";
// import { type NewProductPayload } from "../types/new-product-payload";

// interface AddProductModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSave: (data: NewProductPayload) => Promise<unknown> | void;
// }

// export function AddProductModal({
//   visible,
//   onClose,
//   onSave,
// }: AddProductModalProps) {
//   // Estados básicos
//   const [name, setName] = useState("");
//   const [brand, setBrand] = useState("");
//   const [sku, setSku] = useState("");

//   // Estados de detalhes
//   const [size, setSize] = useState("");
//   const [color, setColor] = useState("");
//   const [location, setLocation] = useState("");

//   // Estados numéricos
//   const [stock, setStock] = useState("");
//   const [price, setPrice] = useState("");
//   const [cost, setCost] = useState("");

//   // Estado de condição
//   const [condition, setCondition] = useState<"Novo" | "Usado">("Novo");

//   // Estado de data
//   const [stockDate, setStockDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   function resetForm() {
//     setName("");
//     setBrand("");
//     setSku("");
//     setSize("");
//     setColor("");
//     setLocation("");
//     setStock("");
//     setPrice("");
//     setCost("");
//     setCondition("Novo");
//     setStockDate(new Date());
//   }

//   async function handleSave() {
//     // Validações básicas
//     if (!name.trim() || !brand.trim()) {
//       return;
//     }

//     const stockValue = parseInt(stock) || 0;
//     const priceValue = parseFloat(price.replace(",", ".")) || 0;
//     const costValue = parseFloat(cost.replace(",", ".")) || 0;

//     const payload: NewProductPayload = {
//       name: name.trim(),
//       brand: brand.trim(),
//       sku: sku.trim(),
//       size: size.trim(),
//       color: color.trim(),
//       location: location.trim(),
//       stock: stockValue,
//       price: priceValue,
//       cost: costValue,
//       condition,
//       stockDate: stockDate.toISOString(),
//     };

//     await onSave(payload);
//     resetForm();
//     onClose();
//   }

//   function handleClose() {
//     resetForm();
//     onClose();
//   }

//   function handleDateChange(event: any, selectedDate?: Date) {
//     setShowDatePicker(Platform.OS === "ios");
//     if (selectedDate) {
//       setStockDate(selectedDate);
//     }
//   }

//   return (
//     <AppModal visible={visible} onClose={handleClose}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>Adicionar Produto</Text>

//         {/* Informações Básicas */}
//         <Text style={styles.sectionTitle}>Informações Básicas</Text>

//         <Text style={styles.label}>Nome *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Ex: Air Jordan 1 High"
//           value={name}
//           onChangeText={setName}
//         />

//         <Text style={styles.label}>Marca *</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Ex: Nike"
//           value={brand}
//           onChangeText={setBrand}
//         />

//         <Text style={styles.label}>SKU</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Ex: AJ1-001-42"
//           value={sku}
//           onChangeText={setSku}
//         />

//         {/* Detalhes do Produto */}
//         <Text style={styles.sectionTitle}>Detalhes</Text>

//         <Text style={styles.label}>Tamanho</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Ex: 42 ou 9.5 US"
//           value={size}
//           onChangeText={setSize}
//         />

//         <Text style={styles.label}>Cor</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Ex: Preto/Vermelho"
//           value={color}
//           onChangeText={setColor}
//         />

//         <Text style={styles.label}>Condição</Text>
//         <View style={styles.conditionRow}>
//           <TouchableOpacity
//             style={[
//               styles.conditionBtn,
//               condition === "Novo" && styles.conditionBtnActive,
//             ]}
//             onPress={() => setCondition("Novo")}
//           >
//             <Text
//               style={[
//                 styles.conditionText,
//                 condition === "Novo" && styles.conditionTextActive,
//               ]}
//             >
//               Novo
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.conditionBtn,
//               condition === "Usado" && styles.conditionBtnActive,
//             ]}
//             onPress={() => setCondition("Usado")}
//           >
//             <Text
//               style={[
//                 styles.conditionText,
//                 condition === "Usado" && styles.conditionTextActive,
//               ]}
//             >
//               Usado
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.label}>Localização</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Ex: Prateleira A3"
//           value={location}
//           onChangeText={setLocation}
//         />

//         {/* Estoque e Valores */}
//         <Text style={styles.sectionTitle}>Estoque e Valores</Text>

//         <Text style={styles.label}>Quantidade em Estoque</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="0"
//           value={stock}
//           onChangeText={setStock}
//           keyboardType="number-pad"
//         />

//         <Text style={styles.label}>Preço de Venda (R$)</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="0,00"
//           value={price}
//           onChangeText={setPrice}
//           keyboardType="decimal-pad"
//         />

//         <Text style={styles.label}>Custo (R$)</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="0,00"
//           value={cost}
//           onChangeText={setCost}
//           keyboardType="decimal-pad"
//         />

//         <Text style={styles.label}>Data de Entrada no Estoque</Text>
//         <TouchableOpacity
//           style={styles.dateButton}
//           onPress={() => setShowDatePicker(true)}
//         >
//           <Text style={styles.dateText}>
//             {stockDate.toLocaleDateString("pt-BR")}
//           </Text>
//           <Text style={styles.dateIcon}>📅</Text>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={stockDate}
//             mode="date"
//             display={Platform.OS === "ios" ? "spinner" : "default"}
//             onChange={handleDateChange}
//             maximumDate={new Date()}
//           />
//         )}

//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveText}>Salvar Produto</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </AppModal>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 20,
//     color: "#000",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000",
//     marginTop: 16,
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#666",
//     marginBottom: 6,
//     marginTop: 8,
//   },
//   input: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 8,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     fontSize: 15,
//     color: "#000",
//   },
//   conditionRow: {
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 4,
//   },
//   conditionBtn: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   conditionBtnActive: {
//     backgroundColor: "#000",
//   },
//   conditionText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#666",
//   },
//   conditionTextActive: {
//     color: "#FFF",
//   },
//   dateButton: {
//     backgroundColor: "#F5F5F5",
//     borderRadius: 8,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 4,
//   },
//   dateText: {
//     fontSize: 15,
//     color: "#000",
//   },
//   dateIcon: {
//     fontSize: 16,
//   },
//   saveButton: {
//     marginTop: 24,
//     marginBottom: 10,
//     backgroundColor: "#000",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   saveText: {
//     color: "#FFF",
//     fontWeight: "600",
//     fontSize: 15,
//   },
// });
