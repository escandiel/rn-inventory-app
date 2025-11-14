import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewProductPayload } from "../types/new-product-payload";
import { COLLECTION_NAME } from "../constants/collection-name";

export type UpdateProductPayload = Partial<NewProductPayload>;

export async function updateProduct(
  id: string,
  data: UpdateProductPayload,
): Promise<void> {
  const productRef = doc(db, COLLECTION_NAME, id);

  await updateDoc(productRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}
