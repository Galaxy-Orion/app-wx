<!--
 * @Author: 梁智堂
 * @Date: 2021-08-05 17:47:07
 * @Description: 
-->
<template>
  <view class="scan-view">
    <view class="scan-border">
      <camera
        mode="scanCode"
        device-position="back"
        :flash="flash"
        class="scan-camera"
        @error="cameraError"
        @scancode="takeCode"
      >
        <cover-view class="scan-border-box">
          <cover-view
            class="scan-animation"
            :animation="animation"
          ></cover-view>
          <cover-view class="code-res-count">
            已扫码：{{ value.length }}条
          </cover-view>
          <cover-view class="code-res-count" @click="flashSwitch">
            {{ flash == "on" ? "关灯" : "开灯" }}
          </cover-view>
          <cover-view class="code-res-count" @click="closeScan">
            结束扫码
          </cover-view>
        </cover-view>
      </camera>
      <!-- 这里可以处理其他内容 -->
    </view>
  </view>
</template>

<script>
import { CheckQrcode } from "@/util/common.js";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  name: "Scan",
  components: {},
  data() {
    return {
      animation: null, //相机动画
      flash: "off", //相机闪光灯开关
      scanFunctionIsUseable: true, //是否可以扫码
      isStop: false,
      timer: null,
    };
  },
  computed: {},
  onLoad(option) {},
  onUnload() {
    if (this.innerAudioContext) {
      this.innerAudioContext.destroy();
    }
  },
  mounted() {
    this.donghua();
  },
  methods: {
    //扫码动画
    donghua() {
      var that = this;
      // 控制向上还是向下移动
      let m = true;
      const animation = wx.createAnimation({});
      const { windowHeight } = uni.getSystemInfoSync();
      const ani = () => {
        animation.translateY((windowHeight / 3) * 2).step({ duration: 3000 });
        // if (m) {
        //   animation.translateY(windowHeight).step({ duration: 3000 });
        //   m = !m;
        // } else {
        //   animation.translateY(0).step({ duration: 3000 });
        //   m = !m;
        // }
        if (!that.isStop) {
          that.animation = animation.export();
        }
      };
      that.timer = setInterval(() => {
        ani();
      }, 3000);
    },
    //开始扫码
    takeCode(e) {
      // 提示音
      const that = this;
      // 校验扫描结果，并处理
      if (this.scanFunctionIsUseable) {
        let innerAudioContext = null;
        innerAudioContext = uni.createInnerAudioContext();
        innerAudioContext.src = require("@/static/music/scan.mp3");
        innerAudioContext.play();
        this.isStop = true;

        this.scanFunctionIsUseable = false;
        const timers = setTimeout(() => {
          //清除定时器
          clearTimeout(timers);
          // 对扫码结果进行处理
          let res = e.detail.result;
          let obj = CheckQrcode(res);
          if (obj.code == 0 || obj.code == 1) {
            uni.showToast({
              title: obj.msg,
              duration: 1000,
              icon: "error",
            });
          } else {
            const codeList = this.value;
            if (!codeList.includes(obj.data.id)) {
              codeList.push(obj.data.id);
              this.$emit("input", codeList);
            } else {
              uni.showToast({
                title: "重复扫码！",
                duration: 1000,
                icon: "error",
              });
            }
          }

          // 扫码间隔三秒
          let timer = setTimeout(() => {
            clearTimeout(timer);
            that.scanFunctionIsUseable = true;
            that.isStop = false;
          }, 3000);
        }, 800);
      }
    },
    //扫码错误
    cameraError(e) {
      console.log(e);
    },
    //闪光灯开关切换
    flashSwitch(val) {
      if (this.flash == "off") {
        this.flash = "on";
      } else {
        this.flash = "off";
      }
    },
    //关闭扫码
    closeScan() {
      const that = this;
      this.scanFunctionIsUseable = false;
      this.isStop = true;
      uni.showModal({
        title: "提示",
        content: "是否结束扫码？",
        cancelText: "否",
        confirmText: "确定",
        confirmColor: "#eb5472",
        success: function(res) {
          if (res.confirm) {
            that.flash = "off";
            that.animation = null;
            if (that.timer) {
              clearInterval(that.timer);
            }
            that.$emit("scanEnd");
          } else if (res.cancel) {
            that.scanFunctionIsUseable = true;
            that.isStop = false;
          }
        },
      });
    },
  },
};
</script>

<style>
.scan-view {
  z-index: 2021;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #b9bec4;
  position: fixed;
  align-items: center;
  justify-content: space-around;
  --cornerBorderMin: 8rpx;
  --cornerBorderMax: 80rpx;
  --bgColor: rgba(0, 0, 0, 0.3);
  --cornorBg: #08fdfe;
}
.scan-border {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.scan-camera {
  width: 100%;
  height: 100%;
}

.scan-border-box {
  width: 100%;
  height: 100%;
  /* background: red; */
  position: relative;
  display: flex;
  /* flex-direction: column; */
  align-items: flex-end;
  justify-content: center;
}

.scan-animation {
  position: absolute;
  top: -10rpx;
  left: 0;
  width: 100%;
  height: 8rpx;
  background-color: #08fdfe;
  border-radius: 50%;
}
/* 扫码结果条数 */
.code-res-count {
  flex: 1;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25rpx;
  line-height: 80rpx;
  text-align: center;
  color: var(--cornorBg);
  background: rgba(8, 253, 254, 0.1);
  /* background: */
}

.scan-res-list {
  width: 100%;
  background: var(--bgColor);
}
.scan-res-content-box {
  width: 100%;
  /* height: 150rpx; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.scan-res-radius {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  color: #222;
  text-align: center;
  line-height: 120rpx;
  font-size: 30rpx;
  transform: scale(1.5);
}
.scan-flash-icon-box {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flash-icon {
  width: 60rpx;
  height: 80rpx;
}
.close-icon {
  width: 60rpx;
  height: 60rpx;
}
</style>
