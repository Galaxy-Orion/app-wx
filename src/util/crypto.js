/*
 * @Author: 梁智堂
 * @Date: 2021-08-10 14:25:13
 * @Description:crypto 加解密
 */
import CryptoJS from "./crypto-js.js";

/*
    DES(Data Encryption Standard)和TripleDES是对称加密的两种实现。
    DES和TripleDES基本算法一致，只是TripleDES算法提供的key位数更多，加密可靠性更高。
    DES使用的密钥key为8字节，初始向量IV也是8字节。
    TripleDES使用24字节的key，初始向量IV也是8字节。
*/
//des加密 DES-EDE3-CBC
var keyvi = "lzt";

function des_encrypt(message) {
  var key = CryptoJS.MD5(keyvi).toString();
  var iv = CryptoJS.MD5(keyvi).toString();
  var crypto_key = CryptoJS.enc.Utf8.parse(key);
  var crypto_iv = CryptoJS.enc.Utf8.parse(iv.substr(0, 8));

  var encode_str = CryptoJS.TripleDES.encrypt(message, crypto_key, {
    iv: crypto_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encode_str.toString();
}
//des解密 DES-EDE3-CBC
function des_decrypt(message) {
  var key = CryptoJS.MD5(keyvi).toString();
  var iv = CryptoJS.MD5(keyvi).toString();
  var crypto_key = CryptoJS.enc.Utf8.parse(key);
  var crypto_iv = CryptoJS.enc.Utf8.parse(iv.substr(0, 8));
  var decrypt_str = CryptoJS.TripleDES.decrypt(message, crypto_key, {
    iv: crypto_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypt_str.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  des_encrypt: des_encrypt,
  des_decrypt: des_decrypt,
};
