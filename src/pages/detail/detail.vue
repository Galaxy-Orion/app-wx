<!--
 * @Author: 梁智堂
 * @Date: 2021-08-04 16:56:34
 * @Description: 
-->
<template>
  <view class="shop-detail-contain">
    <ScanCamera v-if="showScan" v-model="codeList" @scanEnd="closeScan" />
    <button @click="startScan" v-if="!showScan">扫码</button>
    <button @click="generateQrcode" v-if="!showScan">生成二维码</button>

    <view class="scan-code-list">
      {{ codeList.join("、") }}
    </view>
    <view class="scan-code-list"> 初始扫码结果：{{ scanCode }} </view>
    <tkiQrcode :val="val" v-show="val" @refresh="refreshCodeView" />
  </view>
</template>

<script>
import ScanCamera from "@/component/scan-camera";
import tkiQrcode from "@/component/tki-qrcode";
import { DesEncrypt } from "@/util/common.js";
import { CheckQrcode } from "@/util/common.js";
export default {
  data() {
    return {
      showScan: false,
      codeList: [],
      val: "",
      code: "",
      scanCode: null,
    };
  },

  components: {
    ScanCamera,
    tkiQrcode,
  },

  computed: {},

  mounted() {},

  methods: {
    //开启扫码
    startScan() {
      function playMusic() {
        let innerAudioContext = null;
        innerAudioContext = uni.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = require("@/static/music/scan.mp3");
        innerAudioContext.onPlay(() => {
          console.log("开始播放");
        });
      }
      uni.scanCode({
        scanType: ["qrCode"],
        success: (res) => {
          playMusic();
          this.scanCode = res.result;
          let obj = CheckQrcode(res.result);
          // console.log("条码类型：" + res.scanType);
          // console.log("条码内容：" + res.result);

          if (obj.code == 0 || obj.code == 1) {
            uni.showModal({
              title: "",
              content: obj.msg,
              showCancel: false,
            });
            // uni.showToast({
            //   title: obj.msg,
            //   duration: 3000,
            //   icon: "error",
            // });
          } else {
            const codeList = this.codeList;
            if (!codeList.includes(obj.data.id)) {
              codeList.push(obj.data.id);
              this.codeList = codeList;
            } else {
              uni.showModal({
                title: "",
                content: "重复扫码！",
                showCancel: false,
              });
            }
          }
        },
        fail: (e) => {
          uni.showToast({
            title: e.msg,
            duration: 3000,
            icon: "error",
          });
        },
        complete: () => {},
      });
    },
    //关闭扫码
    closeScan() {
      this.showScan = false;
    },
    //生成二维码
    generateQrcode() {
      // var aaa = console.log(des_decrypt(aaa, "key"));
      const timesamp = Date.now();
      this.code = Math.random();
      const obj = {
        id: this.code,
        dateTime: timesamp,
      };
      this.val = DesEncrypt(JSON.stringify(obj));
    },
    //刷新二维码
    refreshCodeView() {
      const timesamp = Date.now();
      const obj = {
        id: this.code,
        dateTime: timesamp,
      };
      this.val = DesEncrypt(JSON.stringify(obj));
    },
  },
};
</script>
<style>
.shop-detail-contain {
  width: 100vw;
  height: 100vh;
  background: #edeef0;
  overflow: hidden;
}
.scan-code-list {
  width: 100%;
}
.qrimg {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
