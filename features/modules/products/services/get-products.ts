import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTION_NAME } from "../constants/collection-name";
import { Product } from "../types/product-model";

export async function getProducts(): Promise<Product[]> {
  const productsRef = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as Omit<Product, "id">;

    return {
      id: docSnap.id,
      ...data,
    };
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  const productRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(productRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data() as Omit<Product, "id">;

  return {
    id: docSnap.id,
    ...data,
  };
}
