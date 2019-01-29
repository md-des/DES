var CryptoJS = require("crypto-js");
const  g = {};
// DES对称加密
g.encryptDES = function(data, key) {
  //把私钥转换成16进制的字符串
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  //模式为ECB padding为Pkcs7
  var encrypted = CryptoJS.DES.encrypt(data, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });
  //加密出来是一个16进制的字符串
  return encrypted.ciphertext.toString();
}
// DES对称解密
g.decryptDES = function(ciphertext, key) {
  //把私钥转换成16进制的字符串
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  //把需要解密的数据从16进制字符串转换成字符byte数组
  var decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
  }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });
  //以utf-8的形式输出解密过后内容
  var result_value = decrypted.toString(CryptoJS.enc.Utf8);
  return result_value;
}
export default{
  ...g
}