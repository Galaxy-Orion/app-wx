<!--
 * @Author: 梁智堂
 * @Date: 2021-09-23 10:33:11
 * @Description: 工资信息
-->
<template>
  <AppComponent bg="#2cc2ff" navBarName="工资信息">
    <view class="salray-list" slot="content">
      <view class="anchor-check">
        <text class="c" @click="goBack">返回顶部{{ st }}</text>
      </view>
      <view class="list" ref="roof">
        <scroll-view
          scroll-y
          class="view-page-content"
          :refresher-enabled="refresher"
          :refresher-threshold="threshold"
          :refresher-triggered="triggered"
          :scroll-anchoring="anchoring"
          :lower-threshold="lowerEnd"
          :scroll-top="st"
          @scroll="scrollChange"
        >
          <view class="anchor"></view>
          <view class="children-item" v-for="i in 80" :key="i">{{ i }}</view>
        </scroll-view>
      </view>
    </view>
  </AppComponent>
</template>

<script>
import AppComponent from "@/component/app-container.vue";
export default {
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
      st: 0,
      timer: null,
    };
  },

  components: {
    AppComponent,
  },

  computed: {},

  //mounted: {},

  methods: {
    goBack() {
      this.st = 0;
      return false;
      console.log(this.$refs);
      let theNode = uni.createSelectorQuery().select(".list");
      console.log(theNode);
      uni
        .createSelectorQuery()
        .select(".list")
        .boundingClientRect((res) => {
          console.log(res);
          //最外层盒子的节点：类或者id
          uni.pageScrollTo({
            duration: 100, //过渡时间
            scrollTop: 0, //返回顶部的top值
          });
        })
        .exec();
      return false;
      uni
        .createSelectorQuery()
        .select(".list")
        .boundingClientRect((data) => {
          console.log(data);
          //目标位置的节点：类或者id

          //   uni
          //     .createSelectorQuery()
          //     .select(".anchor")
          //     .boundingClientRect((res) => {
          //       console.log(res);
          //       //最外层盒子的节点：类或者id
          //       uni.pageScrollTo({
          //         duration: 100, //过渡时间
          //         scrollTop: -300, //返回顶部的top值
          //       });
          //     })
          //     .exec();
        })
        .exec();
    },
    scrollChange(e) {
      clearTimeout(this.timer);
      this.timer = null;
      this.timer = setTimeout(() => {
        this.st = e.detail.scrollTop;
        clearTimeout(this.timer);
        this.timer = null;
      }, 250);
    },
  },
};
</script>
<style lang="less" scoped>
.salray-list {
  width: 100%;
  padding: 8px 10px;
  background: #f8f8f8;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.anchor-check {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list {
  width: 100%;
  flex: 1;
  overflow: hidden;
  .view-page-content {
    width: 100%;
    height: 100%;
  }
}
.children-item {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bolder;
}
</style>
