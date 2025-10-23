import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.PASSWORD_SECRET;

export const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET).toString();
};

export const decrypt = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
}
