// utility functions 

export function extractLocation(str: string) {
  let split = str.split(',');
  let trimmed = split.map(part => part.trim());

  // Take the last two elements and join them with a comma and space
  const result = trimmed.slice(-2).join(', ');
  return result;
};

export function thousandSeparator(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function getFractionalPart(number: number): number {
  const fractionalPart = number.toString().split('.')[1];
  return parseInt(fractionalPart || "0", 10);
};

// Reusable function to store data in LocalStorage
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