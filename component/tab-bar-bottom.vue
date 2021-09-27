<!--
 * @Author: 梁智堂
 * @Date: 2021-08-04 17:49:03
 * @Description: 
-->
<template>
  <view class="tab-bar-contain">
    <view class="tab-content">
      <slot></slot>
    </view>
    <view class="tabbar-container" v-show="!isHideBottom">
      <view
        :style="{ color: currentIndex == index ? '#2cc2ff' : '#333333' }"
        v-for="(item, index) in tabbarList"
        :key="index"
        class="tab-bar"
        @tap="item.isOther ? false : switchTab(index)"
      >
        <view class="icon-text" v-if="!item.isOther">
          <view class="icon-contain">
            <text
              :class="'cus-icon iconfont icon-' + item.icon"
              :style="{
                fontSize: item.size + 'px',
              }"
            ></text>
          </view>
          <view
            class="title"
            :style="{ color: currentIndex == index ? '#2cc2ff' : '#333333' }"
            >{{ item.title }}</view
          >
        </view>
        <view class="icon-contain" v-else @tap="switchTab(index)">
          <view class="other-icon">
            <view class="other-icon_bg">
              <view class="radius-icon">
                <text
                  :class="'cus-icon iconfont icon-' + item.icon"
                  :style="{ fontSize: item.size + 'px' }"
                ></text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      topMenu: {
        top: 0,
        height: 0,
      },
      isHideBottom: false,
      currentIndex: 0,
      windowHeight: 0,
      tabbarList: [
        { title: "首页", icon: "shouye", size: 30 },
        { title: "热门", icon: "remen", size: 30 },
        { title: "加入", icon: "gengduo", isOther: true, size: 30 },
        { title: "订单", icon: "yixianshi-", size: 30 },
        { title: "我的", icon: "wode", size: 30 },
      ],
    };
  },
  created() {
    const topMenu = uni.getMenuButtonBoundingClientRect();
    this.topMenu.top = topMenu.top;
    this.topMenu.height = topMenu.height;
  },
  mounted() {
    uni.getSystemInfo({
      success: (res) => {
        // console.log(res.windowHeight);
        this.windowHeight = res.windowHeight;
      },
    });
    uni.onWindowResize((res) => {
      if (res.size.windowHeight < this.windowHeight) {
        this.isHideBottom = true;
      } else {
        this.isHideBottom = false;
      }
    });
  },
  methods: {
    switchTab(index) {
      this.currentIndex = index;
      this.$emit("getCurrentIndex", index);
    },
  },
};
</script>

<style>
.tab-bar-contain {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f0f0f0;
  padding-bottom: 75px;
}
.top-menu {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  /* background: #fff; */
  font-size: 26rpx;
}
.tab-content {
  width: 100%;
  /* height: calc(100% - 75px); */
  height: 100%;
  overflow-y: auto;
}
.tabbar-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
  text-align: center;
  width: 100%;
  /* padding: 10px 0; */
  background-color: #fff;
  /* box-shadow: 0 -1.5px 3px #eee; */
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
}
.tab-bar {
  position: relative;
  display: flex;
  flex-flow: column;
}
.icon-contain {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.other-icon {
  position: absolute;
  top: -5%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: rgba(0, 0, 0, 0.1); */
}
.other-icon_bg {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  overflow: hidden;
  transform: scale(1.4);
}
.radius-icon {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px #eee;
  overflow: hidden;
  /* transform: scale(1.2); */
}
.cus-icon {
  font-size: 20px;
}
.title {
  font-size: 12px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 30px;
}
</style>
