import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SALES_COLLECTION } from "../constants/collection-name";
import { NewSalePayload, Sale } from "../types/sales";

export async function createSale(data: NewSalePayload): Promise<Sale> {
  const now = new Date().toISOString();

  const docRef = await addDoc(collection(db, SALES_COLLECTION), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: docRef.id,
    customer: data.customer ?? null,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
}
