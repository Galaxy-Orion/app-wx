<!--
 * @Author: 梁智堂
 * @Date: 2021-09-23 14:59:24
 * @Description: 
-->
<template>
  <view class="load-more">
    <template v-if="isloading">
      <view class="floatingBarsG">
        <view class="blockG rotateG_01"></view>
        <view class="blockG rotateG_02"></view>
        <view class="blockG rotateG_03"></view>
        <view class="blockG rotateG_04"></view>
        <view class="blockG rotateG_05"></view>
        <view class="blockG rotateG_06"></view>
        <view class="blockG rotateG_07"></view>
        <view class="blockG rotateG_08"></view>
      </view>
      <text class="loading-txt">加载中...</text>
    </template>
    <template v-if="!isloading && isEnd">
      <view class="divide-line divide-line_left"></view>
      <text class="divide-txt">没有更多数据了</text>
      <view class="divide-line divide-line_right"></view>
    </template>
    <template v-if="!isloading && !isEnd">
      <text class="more-txt">查看更多数据</text>
    </template>
  </view>
</template>
<script>
export default {
  props: {
    //是否加载中
    isloading: {
      type: Boolean,
      default: false,
    },
    //是否已全部加载完成
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.load-more {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #c0c0c0;
  flex-direction: row;
  .loading-txt {
    margin-left: -8px;
  }
  .divide-txt {
    padding: 0 8px;
  }
  .divide-line {
    flex: 1;
    height: 5px;
    background-image: linear-gradient(
        0deg,
        rgba(192, 192, 192, 0.5) 50%,
        transparent 50%
      ),
      linear-gradient(90deg, rgba(192, 192, 192, 0.5) 50%, transparent 50%);
    background-size: 30px 30px;
  }
  .divide-line_left {
    transform: skewX(35deg);
  }
  .divide-line_right {
    transform: skewX(-35deg);
  }
}
.floatingBarsG {
  position: relative;
  width: 60px;
  height: 75px;
  transform: scale(0.4);
}

.blockG {
  position: absolute;
  background-color: rgb(255, 255, 255);
  width: 10px;
  height: 23px;
  border-radius: 8px 8px 0 0;
  -o-border-radius: 8px 8px 0 0;
  -ms-border-radius: 8px 8px 0 0;
  -webkit-border-radius: 8px 8px 0 0;
  -moz-border-radius: 8px 8px 0 0;
  transform: scale(0.4);
  -o-transform: scale(0.4);
  -ms-transform: scale(0.4);
  -webkit-transform: scale(0.4);
  -moz-transform: scale(0.4);
  animation-name: fadeG;
  -o-animation-name: fadeG;
  -ms-animation-name: fadeG;
  -webkit-animation-name: fadeG;
  -moz-animation-name: fadeG;
  animation-duration: 1.2s;
  -o-animation-duration: 1.2s;
  -ms-animation-duration: 1.2s;
  -webkit-animation-duration: 1.2s;
  -moz-animation-duration: 1.2s;
  animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-direction: normal;
  -o-animation-direction: normal;
  -ms-animation-direction: normal;
  -webkit-animation-direction: normal;
  -moz-animation-direction: normal;
}

.rotateG_01 {
  left: 0;
  top: 27px;
  animation-delay: 0.45s;
  -o-animation-delay: 0.45s;
  -ms-animation-delay: 0.45s;
  -webkit-animation-delay: 0.45s;
  -moz-animation-delay: 0.45s;
  transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
}

.rotateG_02 {
  left: 8px;
  top: 10px;
  animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  -ms-animation-delay: 0.6s;
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
}

.rotateG_03 {
  left: 25px;
  top: 3px;
  animation-delay: 0.75s;
  -o-animation-delay: 0.75s;
  -ms-animation-delay: 0.75s;
  -webkit-animation-delay: 0.75s;
  -moz-animation-delay: 0.75s;
  transform: rotate(0deg);
  -o-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
}

.rotateG_04 {
  right: 8px;
  top: 10px;
  animation-delay: 0.9s;
  -o-animation-delay: 0.9s;
  -ms-animation-delay: 0.9s;
  -webkit-animation-delay: 0.9s;
  -moz-animation-delay: 0.9s;
  transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
}

.rotateG_05 {
  right: 0;
  top: 27px;
  animation-delay: 1.05s;
  -o-animation-delay: 1.05s;
  -ms-animation-delay: 1.05s;
  -webkit-animation-delay: 1.05s;
  -moz-animation-delay: 1.05s;
  transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
}

.rotateG_06 {
  right: 8px;
  bottom: 7px;
  animation-delay: 1.2s;
  -o-animation-delay: 1.2s;
  -ms-animation-delay: 1.2s;
  -webkit-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  transform: rotate(135deg);
  -o-transform: rotate(135deg);
  -ms-transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
}

.rotateG_07 {
  bottom: 0;
  left: 25px;
  animation-delay: 1.35s;
  -o-animation-delay: 1.35s;
  -ms-animation-delay: 1.35s;
  -webkit-animation-delay: 1.35s;
  -moz-animation-delay: 1.35s;
  transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
}

.rotateG_08 {
  left: 8px;
  bottom: 7px;
  animation-delay: 1.5s;
  -o-animation-delay: 1.5s;
  -ms-animation-delay: 1.5s;
  -webkit-animation-delay: 1.5s;
  -moz-animation-delay: 1.5s;
  transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
}

@keyframes fadeG {
  0% {
    background-color: #c0c0c0;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-o-keyframes fadeG {
  0% {
    background-color: #c0c0c0;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-ms-keyframes fadeG {
  0% {
    background-color: #c0c0c0;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-webkit-keyframes fadeG {
  0% {
    background-color: #c0c0c0;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}

@-moz-keyframes fadeG {
  0% {
    background-color: #c0c0c0;
  }

  100% {
    background-color: rgb(255, 255, 255);
  }
}
</style>
