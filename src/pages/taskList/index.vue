<!--
 * @Author: 梁智堂
 * @Date: 2021-09-06 15:55:00
 * @Description: 任务列表
-->
<template>
  <AppComponent :bg="getBg" navBarName="任务列表">
    <view class="task-list" slot="content">
      <refresh
        refresher
        infiniting
        @on-refresh="refresh"
        class="page-content"
        navbgColor="primary"
      >
        <view class="task-list_item" v-for="i in 20" :key="i">
          <view class="task-name">
            <view class="color-grey">剧本：</view>
            <view class="task-name_name"
              >剧本名字XXXXXXXXCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</view
            >
          </view>
          <view class="task-detail">
            <view class="task-detail_item">
              <text class="color-grey">时长：</text>
              <text>1小时10分钟</text>
            </view>
            <view class="task-detail_item text-right">
              <text class="color-grey">人数：</text>
              <text>8人</text>
            </view>
          </view>
          <view class="task-time">
            <text class="color-grey">场次：</text>
            <text>2021-09-10 12:00</text>
          </view>
          <view class="task-place">
            <text class="color-grey">场地：</text>
            <text>A-101</text>
          </view>
        </view>
      </refresh>
    </view>
  </AppComponent>
</template>
<script>
import AppComponent from "@/component/app-container.vue";
import Refresh from "@/component/pull-refresh-wrap";
export default {
  components: { AppComponent, Refresh },
  computed: {
    getBg() {
      return "#2cc2ff";
    },
  },
  methods: {
    refresh({ complete }) {
      setTimeout(() => {
        // this.getData();
        complete(); // 结束下拉刷新
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.task-list {
  width: 100%;
  padding: 8px 10px;
  background: #f8f8f8;
  height: 100%;
  overflow: hidden;
}
.task-list_item {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 10px #eceff4;
  padding: 10px;
  font-size: 14px;
  line-height: 16px;
  // margin: 10px auto;

  .task-name {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    .task-name_name {
      flex: 1;
      //   font-weight: bolder;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden; /*这个参数根据需求来决定要不要*/
      text-align: justify;
    }
  }
  .task-detail {
    width: 100%;
    margin: 5px auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .task-detail_item {
      flex: 1;
      text-align: left;
    }
    .text-right {
      text-align: right !important;
    }
  }
  .task-time {
    width: 100%;
    margin: 5px auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .task-place {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
.task-list_item + .task-list_item {
  margin-top: 8px;
}
.color-grey {
  color: rgba(0, 0, 0, 0.3);
}
</style>
