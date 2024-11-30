import CryptoJS from "crypto-js";

const APP_SECRET_KEY = "TELEGRAM_APP_CLONE_SECRET_KEY";

function toBase64UrlSafe(base64:string) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  
  // Utility function to convert URL-safe Base64 back to standard Base64
  function fromBase64UrlSafe(base64Url:string) {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if necessary
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    return base64;
  }

export function encrypt(data:string){
    const ciphertext = CryptoJS.AES.encrypt(data,APP_SECRET_KEY).toString();
    return toBase64UrlSafe(ciphertext)
}
export function decrypt(ciphertext:string){
    const base64Ciphertext = fromBase64UrlSafe(ciphertext);
    return CryptoJS.AES.decrypt(base64Ciphertext,APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
}