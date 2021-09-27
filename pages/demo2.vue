<!--
 * @Author: 梁智堂
 * @Date: 2021-08-16 13:11:31
 * @Description: 
-->
<template>
  <view>
    <view
      class="container"
      :style="{ 'padding-bottom': `${52 + inputBottom}px` }"
    >
      <view class="header">我是头部</view>
      <scroll-view class="content" :scroll-y="true" :scroll-top="scrollTop">
        <view>
          <view class="message" v-for="(item, index) in records" :key="index">
            <view class="message-content">{{ item.content }}</view>
            <view class="message-time">{{ item.updateTime }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="bottom-textarea" :style="{ bottom: inputBottom + 'px' }">
      <view class="textarea-container">
        <textarea
          v-model="recordInput"
          :maxlength="-1"
          :auto-height="true"
          :show-confirm-bar="false"
          :cursor-spacing="10"
          :fixed="true"
          :adjust-position="false"
          @focus="focusTextarea"
          @blur="blurTextarea"
        />
      </view>
      <button @click="addRecord" class="primary-btn">记录</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      records: [],
      recordInput: "",
      itemAverageHeight: 500, //每条数据平均高度，为确保能滚到底部，可以设置大一些
      scrollTop: 1000,
      inputBottom: 0,
    };
  },
  methods: {
    getList() {
      uni.showNavigationBarLoading();
      for (let i = 1; i < 200; i++) {
        this.records.push({
          content: i + "_content",
          updateTime: i + "_updateTime",
        });
      }
      console.log(this.records);
      if (this.records.length > 0) {
        this.scrollTop = this.itemAverageHeight * this.records.length;
      }
      uni.hideNavigationBarLoading();
      return false;
      //   获取记录信息
      this.$api
        .getRecords()
        .then((res) => {
          this.records = res.reverse().map((item) => ({
            ...item,
            content: item.content.replace(/\n/g, "<br/>"),
          }));
          if (this.records.length > 0)
            this.scrollTop = this.itemAverageHeight * this.records.length;
        })
        .finally(() => {
          uni.hideNavigationBarLoading();
        });
    },
    addRecord() {
      const trueValue = this.recordInput.trim();
      this.$api.addRecord(trueValue).then(() => {
        this.records.push({
          content: trueValue.replace(/\n/g, "<br/>"),
          updateTime: new Date(),
        });
        this.recordInput = "";
        this.scrollTop = this.scrollTop + this.itemAverageHeight; //滚到底部
      });
    },
    focusTextarea(e) {
      this.inputBottom = e.detail.height;
      this.scrollTop += 1; //滚到底部
    },
    blurTextarea(e) {
      this.inputBottom = 0;
      this.scrollTop += 1; //滚到底部
    },
  },
  onLoad(options) {
    this.getList();
  },
};
</script>

<style lang="less">
@left-right-margin: 40rpx;
.container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 52px;
  display: flex;
  flex-direction: column;
  .header {
    flex-shrink: 0;
    padding: 0px @left-right-margin 32rpx @left-right-margin;
  }
  .content {
    flex-grow: 1;
    overflow: auto;
    .message {
      margin: 0px @left-right-margin 32rpx;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .message-content {
        width: auto;
        max-width: calc(100vw - 80rpx);
        word-wrap: break-word;
        box-sizing: border-box;
        padding: 32rpx;
        line-height: 48rpx;
        background: pink;
        border-radius: 16rpx 0px 16rpx 16rpx;
      }
      .message-time {
        line-height: 32rpx;
        margin-top: 16rpx;
      }
    }
  }
}
.bottom-textarea {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #f2f2f2;
  border-top: 2rpx solid rgba(226, 226, 226, 1);
  padding: 6px 20px;
  display: flex;
  align-items: flex-end;
  .textarea-container {
    flex: 1;
    min-height: 80rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 8rpx;
    box-sizing: border-box;
    padding: 20rpx 16rpx;
    > textarea {
      max-height: 250rpx;
      font-size: 36rpx;
      color: rgba(8, 8, 8, 1);
      width: auto;
    }
  }

  > button {
    flex-shrink: 0;
    height: 80rpx;
    margin: 0;
    margin-left: 16rpx;
  }
}
</style>
