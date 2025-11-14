import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTION_NAME } from "../constants/collection-name";

export async function deleteProduct(id: string): Promise<void> {
  const productRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(productRef);
}
