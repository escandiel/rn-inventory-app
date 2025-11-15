import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SALES_COLLECTION } from "../constants/collection-name";

export async function deleteSale(id: string) {
  const ref = doc(db, SALES_COLLECTION, id);
  await deleteDoc(ref);
}
