<!--
 * @Author: 梁智堂
 * @Date: 2021-08-10 13:48:47
 * @Description: 
-->
<template>
  <view class="qrimg">
    <tki-qrcode
      ref="qrcode"
      :val="val"
      :size="size"
      :unit="unit"
      :background="background"
      :foreground="foreground"
      :pdground="pdground"
      :iconSize="iconsize"
      :lv="lv"
      :onval="onval"
      :loadMake="loadMake"
      :showLoading="showLoading"
      :loadingText="loadingText"
      @result="qrR"
    />
    <cover-view
      class="code-cover"
      :class="isLoading ? 'grey' : ''"
      @click="resfreshCodeView"
    ></cover-view>
  </view>
</template>
<script>
import tkiQrcode from "tki-qrcode";
import iconUrl from "../static/img/flash-open.png";
export default {
  components: {
    tkiQrcode,
  },
  props: {
    val: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      redCode: "#eb5472",
      greenCode: "#28a52b",
      yellowCode: "",
      size: 250,
      background: "#ffffff",
      foreground: "#28a52b",
      pdground: "#28a52b",
      // icon: iconUrl,
      iconsize: 30,
      lv: 3,
      onval: true,
      unit: "px",
      loadMake: true,
      src: "",
      showLoading: false,
      loadingText: "生成中",
      isLoading: true,
      clickTime: 0,
    };
  },
  mounted() {},
  watch: {
    val: {
      deep: true,
      handler(n, o) {
        if (n != o) {
          this.isLoading = true;
        }
      },
    },
  },
  methods: {
    qrR(val) {
      this.isLoading = false;
    },
    resfreshCodeView() {
      if (!this.isLoading) {
        this.isLoading = true;
        this.$emit("refresh");
      }
      // let dt = Date.now();
      // return () => {
      //   const nt = Date.now();
      //   let subTime = nt - dt;
      //   if (!this.clickTime || subTime > 1000) {
      //     this.isLoading = true;
      //     this.$emit("refresh");
      //   } else {
      //     dt = Date.now();
      //   }
      //   this.clickTime += 1;
      // };
    },
  },
};
</script>
<style>
.qrimg {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.code-cover {
  width: 250px;
  height: 250px;
  position: absolute;
  top: 23px;
  left: calc(50% - 125px);
}
.grey {
  background: rgba(0, 0, 0, 0.8);
}
</style>
