// utility functions 

export function extractLocation(str: string) {
  let split = str.split(',');
  let trimmed = split.map(part => part.trim());

  // Take the last two elements and join them with a comma and space
  const result = trimmed.slice(-2).join(', ');
  return result;
}

export function thousandSeparator(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getFractionalPart(number: number): number {
  const fractionalPart = number.toString().split('.')[1];
  return parseInt(fractionalPart || "0", 10);
}