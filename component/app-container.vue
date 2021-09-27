<!--
 * @Author: 梁智堂
 * @Date: 2021-08-13 15:50:29
 * @Description: 
-->
<template>
  <view class="app-container">
    <header-bar
      v-if="!hideHeader"
      :isBack="true"
      titleTintColor="#fff"
      :bgColor="{ background: bg }"
    >
      <view class="header" slot="header">
        <template v-if="setHeader"><slot name="cusHeader"></slot></template>
        <view v-else class="header-flex">
          <view class="header-back_icon">
            <text
              @click="goBack"
              class="iconfont icon-jiantouyou rote-180"
            ></text>
          </view>
          <view @click="titleClick" class="header-title"
            ><text>{{ navBarName }}</text></view
          >
          <view class="header-back_icon">
            <!-- <text class="iconfont icon-jiantouyou"></text> -->
          </view>
        </view>
      </view>
    </header-bar>
    <view :style="style">
      <slot name="content"></slot>
    </view>
  </view>
</template>
<script>
import HeaderBar from "@/component/header-bar.vue";
export default {
  props: {
    bg: {
      type: String,
      default: null,
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
    setHeader: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    navBarName: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },
  components: { "header-bar": HeaderBar },
  computed: {
    style() {
      let _style = `width:100%;overflow:hidden;height:100%;padding-top:${this.customBar}px`;
      return _style;
    },
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    titleClick() {
      this.$emit("titleClick");
    },
  },
};
</script>
<style lang="less" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* background: #adadad; */
}
.header {
  width: 100%;
  height: 100%;
  .header-flex {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
    font-size: 16px;
    .header-back_icon {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .rote-180 {
        transform: rotate(180deg);
        font-size: 25px;
      }
    }

    .header-title {
      flex: 1;
      height: 100%;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
