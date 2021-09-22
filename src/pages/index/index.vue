<template>
  <AppComponent :bg="getBg" :setHeader="true">
    <tab-bar
      :currentIndex="currentIndex"
      @getCurrentIndex="getCurrentIndex"
      slot="content"
    >
      <!-- 首页 -->
      <view v-show="currentIndex == 0" class="slot-content">
        <text style="color:red">首页</text>
      </view>
      <!-- 热门排行榜 -->
      <view v-show="currentIndex == 1" class="slot-content">
        排行榜
      </view>
      <!-- 分类 -->
      <view v-show="currentIndex == 2" class="slot-content">
        <Detail />
      </view>
      <!-- 订单信息 -->
      <view v-show="currentIndex == 3" class="slot-content">
        订单列表
      </view>
      <!-- 我的 -->
      <view v-show="currentIndex == 4" class="slot-content">
        <PersonalCenter :isShow="currentIndex == 4" />
      </view>
    </tab-bar>
  </AppComponent>
</template>

<script>
import AppComponent from "@/component/app-container.vue";
import PersonalCenter from "@/component/PersonalCenter";
import Detail from "../detail/detail";
export default {
  data() {
    return {
      scanRes: null,
      scanType: null,
      currentIndex: 0,
      title: "Hello",

      showScan: false,
      codeList: [],
    };
  },
  created() {},
  onLoad() {},
  components: { AppComponent, PersonalCenter, Detail },
  computed: {
    getBg() {
      if (this.currentIndex == 4) {
        return "#2cc2ff";
      } else {
        return "#353535";
      }
    },
  },
  methods: {
    getCurrentIndex(e) {
      this.currentIndex = e;
    },
    scanCode() {
      const that = this;
      uni.scanCode({
        onlyFromCamera: true,
        success: function(res) {
          that.scanType = res.scanType;
          that.scanRes = res.result;
        },
      });
    },
    playMusic() {
      let innerAudioContext = null;
      innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.src = require("@/static/music/scan.mp3");
      innerAudioContext.onCanplay(() => {
        console.log("on：", Date.now());
      });
      innerAudioContext.onPlay(() => {
        console.log("play：", Date.now());
      });
      innerAudioContext.play();
    },
    //开启扫码
    startScan() {
      this.showScan = true;
    },
    //关闭扫码
    closeScan() {
      this.showScan = false;
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.slot-content {
  width: 100%;
  height: 100%;
}
</style>
