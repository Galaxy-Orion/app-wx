<!--
 * @Author: 梁智堂
 * @Date: 2021-08-24 15:12:41
 * @Description: 
-->
<template>
  <view class="page-contain">
    <refresh
      refresher
      infiniting
      @on-refresh="refresh"
      @on-infinite="infiniteScroll"
      class="page-content"
      navTitle="首页"
      navbgColor="primary"
    >
      <view class="cu-list menu sm-border card-menu">
        <view class="cu-item arrow" v-for="(item, index) of list" :key="index">
          <view class="content">
            <text class="cuIcon-circlefill text-grey"></text>
            <text class="text-grey">图标{{ item }} + 标题</text>
          </view>
        </view>
      </view>
    </refresh>
  </view>
</template>
<script>
import Refresh from "../component/pull-refresh-wrap";
export default {
  components: {
    refresh: Refresh,
  },
  data() {
    return {
      triggered: false,
      list: [1, 2, 3, 4, 5, 6, 7],
    };
  },
  onLoad() {},
  methods: {
    refresh({ complete }) {
      setTimeout(() => {
        this.list.push(
          ...[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
          ]
        ); // 模拟数据请求
        complete(); // 结束下拉刷新
      }, 1000);
    },
    infiniteScroll({ setStatus }) {
      setTimeout(() => {
        for (let i = 1; i < 20; i++) {
          this.list.push(...[Math.round(Math.random() * 10 + 50)]); // 模拟数据请求
        }
        console.log(this.list.length);
        // this.list.push(...[Math.round(Math.random() * 10 + 50)]); // 模拟数据请求
        setStatus("noMore", this.list.length > 50 ? true : false);
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.page-contain {
  width: 100%;
  height: 100vh;
  .view-page-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
