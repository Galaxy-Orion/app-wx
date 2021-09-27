<!--
 * @Author: 梁智堂
 * @Date: 2021-08-05 17:47:07
 * @Description: 备份
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
          <cover-view class="scan-code-content">
            <cover-view class="space-box-top"></cover-view>
            <cover-view class="camera-box">
              <cover-view class="space-box-col"></cover-view>
              <cover-view class="scan-code-camera">
                <cover-view
                  class="cover-corner cover-left-top_line"
                ></cover-view>
                <cover-view
                  class="cover-corner cover-left-top_vertical"
                ></cover-view>
                <cover-view
                  class="cover-corner cover-right-top_line"
                ></cover-view>
                <cover-view
                  class="cover-corner cover-right-top_vertical"
                ></cover-view>
                <cover-view
                  class="cover-corner cover-left-bottom_line"
                ></cover-view>
                <cover-view
                  class="cover-corner cover-left-bottom_vertical"
                ></cover-view>
                <cover-view
                  class="cover-corner cover-right-bottom_line"
                ></cover-view>
                <cover-view
                  class="cover-corner cover-right-bottom_vertical"
                ></cover-view>
                <cover-view
                  class="scan-animation"
                  :animation="animation"
                ></cover-view>
              </cover-view>
              <cover-view class="space-box-col"></cover-view>
            </cover-view>
          </cover-view>
          <cover-view class="scan-res-list">
            <cover-view class="scan-res-content-box">
              <cover-view class="scan-res-radius">
                {{ value.length }}
              </cover-view>
            </cover-view>
            <cover-view class="scan-flash-icon-box">
              <cover-image
                v-show="flash == 'off'"
                class="flash-icon"
                src="../static/img/flash-close.png"
                @click="flashSwitch('on')"
              ></cover-image>
              <cover-image
                v-show="flash == 'on'"
                class="flash-icon"
                src="../static/img/flash-open.png"
                @click="flashSwitch('off')"
              ></cover-image>
            </cover-view>
            <cover-view class="scan-flash-icon-box">
              <cover-image
                class="close-icon"
                src="../static/img/close-icon.png"
                @click="closeScan"
              ></cover-image>
            </cover-view>
          </cover-view>
        </cover-view>
      </camera>
      <!-- 这里可以处理其他内容 -->
    </view>
  </view>
</template>

<script>
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
      const ani = () => {
        animation.translateY(0).step({ duration: 3000 });
        // if (m) {
        //   animation.translateY(250).step({ duration: 3000 });
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
          const codeList = this.value;
          if (!codeList.includes(res)) {
            codeList.push(res);
            this.$emit("input", codeList);
          } else {
            uni.showToast({
              title: "重复扫码",
              duration: 2000,
            });
          }
          // 扫码间隔两秒
          let timer = setTimeout(() => {
            clearTimeout(timer);
            that.scanFunctionIsUseable = true;
            that.isStop = false;
          }, 2000);
        }, 100);
      }
    },
    //扫码错误
    cameraError(e) {
      console.log(e);
    },
    //闪光灯开关切换
    flashSwitch(val) {
      this.flash = val;
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
  position: relative;
  display: flex;
  flex-direction: column;
}
.scan-code-content {
  width: 100%;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
}
.space-box-top {
  width: 100%;
  height: 20rpx;
  background: var(--bgColor);
}
.camera-box {
  width: 100%;
  height: 500rpx;
  display: flex;
  flex-direction: row;
}
.space-box-col {
  flex: 1;
  height: 100%;
  background: var(--bgColor);
}
.scan-code-camera {
  width: 500rpx;
  height: 500rpx;
  position: relative;
}
.cover-corner {
  position: absolute;
  background: var(--cornorBg);
}
.cover-left-top_line {
  left: 0;
  top: 0;
  width: var(--cornerBorderMax);
  height: var(--cornerBorderMin);
}
.cover-left-top_vertical {
  left: 0;
  top: 0;
  width: var(--cornerBorderMin);
  height: var(--cornerBorderMax);
}

.cover-right-top_line {
  right: 0;
  top: 0;
  width: var(--cornerBorderMax);
  height: var(--cornerBorderMin);
}
.cover-right-top_vertical {
  right: 0;
  top: 0;
  width: var(--cornerBorderMin);
  height: var(--cornerBorderMax);
}

.cover-left-bottom_line {
  left: 0;
  bottom: 0;
  width: var(--cornerBorderMin);
  height: var(--cornerBorderMax);
}
.cover-left-bottom_vertical {
  left: 0;
  bottom: 0;
  width: var(--cornerBorderMax);
  height: var(--cornerBorderMin);
}

.cover-right-bottom_line {
  right: 0;
  bottom: 0;
  width: var(--cornerBorderMin);
  height: var(--cornerBorderMax);
}
.cover-right-bottom_vertical {
  right: 0;
  bottom: 0;
  width: var(--cornerBorderMax);
  height: var(--cornerBorderMin);
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
.scan-res-list {
  width: 100%;
  flex: 1;
  background: var(--bgColor);
  display: flex;
  flex-direction: column;
}
.res-code {
  width: 100%;
  font-size: 16px;
  line-height: 30px;
  color: #fff;
  overflow: hidden;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
}
.scan-res-content-box {
  width: 100%;
  flex: 1.5;
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
