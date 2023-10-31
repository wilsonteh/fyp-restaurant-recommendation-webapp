import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "./config";

export const db = getFirestore(app);

export const insertDoc = async (collectionName: string, data: any) => {
  let collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, data);
  return docRef;
};  