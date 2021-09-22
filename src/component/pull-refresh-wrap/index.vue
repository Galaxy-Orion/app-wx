<!--
 * @Author: 梁智堂
 * @Date: 2021-08-24 15:11:40
 * @Description: 
-->
<template>
  <!-- page-content -->
  <view class="page">
    <scroll-view
      scroll-y
      class="view-page-content"
      :refresher-enabled="refresher"
      :refresher-threshold="threshold"
      :refresher-triggered="triggered"
      @refresherrefresh="refreshing"
      :scroll-anchoring="anchoring"
      :lower-threshold="lowerEnd"
      @scrolltolower="scrolltolower"
    >
      <slot></slot>
      <!-- <load-more :status="loadMoreStatus" iconType="snow"></load-more> -->
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: "PageContent",
  props: {
    refresher: {
      //是否开启下拉刷新
      type: Boolean,
      default: false,
    },
    threshold: {
      //下拉距离
      type: Number,
      default: 100,
    },
    lowerEnd: {
      //下拉距离
      type: Number,
      default: 10,
    },
    anchoring: {
      type: Boolean,
      default: true,
    },
    infiniting: {
      type: Boolean,
      default: false,
    },
    infiniteDisabled: {
      //是否禁用上拉加载
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isRefreshing: false, // 是否在刷新中
      isInfiniting: this.infiniting, // 是否在加载中
      triggered: true,
    };
  },
  methods: {
    refreshing() {
      if (this.isRefreshing) return;
      this.isRefreshing = true;
      this.triggered = true;
      this.isInfiniting = true; // 若下拉刷新和上拉加载同时存在，则每次刷新需要重置上拉加载状态
      this.$emit("onRefresh", { complete: this.refresherComplete });
    },
    refresherComplete() {
      this.triggered = false;
      this.isRefreshing = false;
      this.isInfiniting = false;
      // this.infiniteDisabled = false;
    },
    scrolltolower() {
      if (!this.isInfiniting && !this.infiniteDisabled) {
        this.loadMoreStatus = this.infiniteDisabled ? "noMore" : "loading";
        this.$emit("onScrollEnd");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
}
.view-page-content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
