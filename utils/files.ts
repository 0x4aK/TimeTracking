export function readFile(file: File, encoding: string = "UTF-8"): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => resolve(target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file, encoding);
  });
}
