import {
  DocumentData,
  FirestoreError,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "./config";
import { FirebaseError } from "firebase/app";
import { user } from "@nextui-org/react";

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
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents;

  } catch (e) {
    console.error("Error reading documents:", e);
    throw e;
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  updatedData: any
) => {

  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log(`Document with id ${docId} with ${updatedData} is updated!`);

  } catch (e) {
    console.error("Error updating document", e);
    throw e;
  }
  
}

export const checkIsFavourited = async (userId: string, restaurantId: string) => {
  const collectionRef = collection(db, "favourites");
  const q = query(
    collectionRef, 
    where("userId", "==", userId), 
    where("restaurantId", "==", restaurantId)
  );
  const snapShot = await getDocs(q)
  let isFavourited = !snapShot.empty;
  return isFavourited;
}