// utility functions 
import { getImageSize } from "react-image-size";

export function extractLocation(str: string) {
  let split = str.split(',');
  let trimmed = split.map(part => part.trim());

  // Take the last two elements and join them with a comma and space
  const result = trimmed.slice(-2).join(', ');
  return result;
};

export function thousandSeparator(number: number): string {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function getFractionalPart(number: number): number {
  const fractionalPart = number.toString().split('.')[1];
  return parseInt(fractionalPart || "0", 10);
};

// to get image dimension - used for reivew img & img preview 
export const getImageDimension = async (imageUrl: string) => {
  try {
    const dimensions = await getImageSize(imageUrl);
    return dimensions

  } catch (e) {
    console.error("Error fetching image dimension", e);
  }
}

// to store data in LocalStorage
export function storeInLocalStorage<T>(key: string, data: T): void {
  try {
    // Convert the data to a JSON string
    const dataString = JSON.stringify(data);

    localStorage.setItem(key, dataString);
    console.log(`Data stored in LocalStorage with key "${key}"`);
    
  } catch (e) {
    console.error('Error storing data in LocalStorage:', e);
  }
}

export function getRandomFromArray(arr: any[]) {
  if (arr.length === 0) {
    return undefined; // or you can return null, throw an error, etc.
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

