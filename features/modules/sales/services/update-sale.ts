import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SALES_COLLECTION } from "../constants/collection-name";
import { UpdateSalePayload } from "../types/sales";

export async function updateSale(id: string, data: UpdateSalePayload) {
  const ref = doc(db, SALES_COLLECTION, id);
  const updatedAt = new Date().toISOString();

  await updateDoc(ref, {
    ...data,
    updatedAt,
  });
}
