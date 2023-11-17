import { StorageReference, getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "./config";
import { QueryFieldFilterConstraint, collection, query, getDocs, DocumentData } from "firebase/firestore";
import { db } from "./firestore";

export const storage = getStorage(app);

export const getImageUrls = async (imagePaths: string[]) => {
  try {
    const imageUrls = await Promise.all(
      imagePaths.map(async (imagePath) => {
        const imageRef = ref(storage, imagePath);
        return await getDownloadURL(imageRef);
      })
    );
    return imageUrls;

  } catch (e) {
    console.error('Error getting download url: ', e);
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
