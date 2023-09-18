// utility functions 

export function extractLocation(str: string) {
  let split = str.split(',');
  let trimmed = split.map(part => part.trim());

  // Take the last two elements and join them with a comma and space
  const result = trimmed.slice(-2).join(', ');
  return result;
}