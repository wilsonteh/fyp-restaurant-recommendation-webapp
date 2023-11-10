import { StorageReference, getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "./config";

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
}

