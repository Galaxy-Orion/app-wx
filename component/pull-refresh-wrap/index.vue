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
      :scroll-top="scrollTop"
      @scroll="scrollChange"
    >
      <view class="content">
        <slot name="content"></slot>
      </view>

      <load-more
        v-if="!infiniteDisabled"
        :isloading="isInfiniting"
        :isEnd="isAll"
      ></load-more>
    </scroll-view>
  </view>
</template>

<script>
import { loadMore } from "@/component/loadMore";
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
  components: { loadMore },
  data() {
    return {
      isRefreshing: false, // 是否在刷新中
      isInfiniting: this.infiniting, // 是否在加载中
      triggered: true,
      scrollTop: 0,
      timer: null,
      isAll: false,
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
      const _self = this;
      if (
        !this.isInfiniting &&
        !this.infiniteDisabled &&
        !_self.noClick &&
        !this.isAll
      ) {
        _self.noClick = true;
        this.isInfiniting = true;
        this.$emit("onScrollEnd", (isAll, backTop) => {
          this.isAll = isAll ? true : false;
          if (backTop) {
            this.scrollTop = 0;
          }
          this.isInfiniting = false;
        });
        const timer = setTimeout(() => {
          clearTimeout(timer);
          _self.noClick = false;
        }, 1000);
      }
    },
    scrollChange(e) {
      clearTimeout(this.timer);
      this.timer = null;
      this.timer = setTimeout(() => {
        this.scrollTop = e.detail.scrollTop;
        clearTimeout(this.timer);
        this.timer = null;
      }, 250);
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
  .content {
    width: 100%;
  }
}
.load-more {
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
