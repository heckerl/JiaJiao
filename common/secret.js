const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("ydd123456789qwertyuiopasdfghjklm");  //十六位十六进制数作为密钥

//解密方法
function Decrypt(word) {
	let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
	let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	let decrypt = CryptoJS.AES.decrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
	let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}

//加密方法
function Encrypt(word) {
	let srcs = CryptoJS.enc.Utf8.parse(word);
	let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
	return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export default {
	Decrypt ,
	Encrypt
}