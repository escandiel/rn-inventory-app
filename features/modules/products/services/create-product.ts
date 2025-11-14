import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "../types/product-model";
import { COLLECTION_NAME } from "../constants/collection-name";
import { NewProductPayload } from "../types/new-product-payload";

export async function createProduct(data: NewProductPayload): Promise<Product> {
  const now = new Date().toISOString();

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: docRef.id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
}
