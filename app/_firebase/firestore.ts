import {
  DocumentData,
  QueryFieldFilterConstraint,
  WhereFilterOp,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "./config";

export const db = getFirestore(app);

export const insertDoc = async (collectionName: string, data: any) => {
  let collectionRef = collection(db, collectionName);
  const docRef = await addDoc(collectionRef, data);
  return docRef;
};

export const fetchAllDocs = async (collectionName: string) => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  
  try {
    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    return documents;
  } catch (e) {
    console.error("Error reading documents:", e);
    throw e;
  }
};

export const fetchDocsWithCondition = async (
  collectionName: string,
  queries: QueryFieldFilterConstraint[]
) => {
  
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...queries)

  try {
    const querySnapshot = await getDocs(q);
    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    return documents;
  } catch (e) {
    console.error("Error reading documents:", e);
    throw e;
  }
};
