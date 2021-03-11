const reader = new FileReader();

export function getBase64FromFile(file) {
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
