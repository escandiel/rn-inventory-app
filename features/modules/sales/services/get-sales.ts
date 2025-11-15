import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SALES_COLLECTION } from "../constants/collection-name";
import { Sale } from "../types/sales";

export async function getSales(): Promise<Sale[]> {
  const q = query(
    collection(db, SALES_COLLECTION),
    orderBy("createdAt", "desc"),
  );
  const snap = await getDocs(q);

  return snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      customer: (data.customer ?? null) as string | null,
      items: Number(data.items ?? 0),
      total: Number(data.total ?? 0),
      method: data.method,
      status: data.status,
      createdAt: String(data.createdAt),
      updatedAt: String(data.updatedAt ?? data.createdAt),
    } as Sale;
  });
}
