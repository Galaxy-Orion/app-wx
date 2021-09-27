/*
 * @Author: 梁智堂
 * @Date: 2021-08-10 14:39:01
 * @Description:
 */
import { des_encrypt, des_decrypt } from "@/util/crypto.js";
//判断是否是JSON格式字符串
const isJSON = (str) => {
  let isJson = false;
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        isJson = true;
      } else {
        isJson = false;
      }
    } catch (e) {
      isJson = false;
    }
  }
  return isJson;
};
const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

//判断二维码是否合法
const CheckQrcode = (val) => {
  /**
   * code 0:不是合法的二维码；1：二维码过期（60s间隔）；2：合法二维码
   */
  const res = des_decrypt(val, "key");
  if (res && isJSON(res)) {
    const obj = JSON.parse(res);
    if (obj.dateTime && Date.now() - obj.dateTime < 60000) {
      return { code: 2, data: obj, msg: "" };
    } else {
      return { code: 1, data: null, msg: "二维码已过期！" };
    }
  } else {
    return { code: 0, data: null, msg: "无效的二维码！" };
  }
};
//加密
const DesEncrypt = (val) => {
  if (typeof val != "string") {
    return null;
  }
  return des_encrypt(val);
};

export { CheckQrcode, DesEncrypt, generateUUID };
