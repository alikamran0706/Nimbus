import CryptoJS from "crypto-js"

const SECRET_KEY = "Nimbus_KEY_123"; 

export const encryptId = (id: string) => {
  return CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
};

export const decryptId = (cipher: string) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
