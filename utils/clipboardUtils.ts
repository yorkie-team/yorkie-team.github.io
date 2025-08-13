export function cleanCliValue(value: string): string {
  const lines = value.split('\n');
  
  return lines
    .map(line => {
      // Remove $ prefix (dollar sign followed by space) commonly used in CLI documentation
      if (line.startsWith('$ ')) {
        return line.substring(2);
      }
      return line;
    })
    .join('\n');
}
