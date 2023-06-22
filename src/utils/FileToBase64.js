export const toBase64 = async (file) => {
  if (!file) return;
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };
  });
};

export const fromBase64 = (base64) => {
  const decoded = fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
      return blob;
    });
  return decoded;
};
