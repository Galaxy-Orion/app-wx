<!--
 * @Author: 梁智堂
 * @Date: 2021-08-13 15:50:29
 * @Description: 
-->
<template>
  <view class="demo-class">
    <view class="fixed-position" :style="{ top: pt + 'px' }">
      <input placeholder="请输入内容" />
    </view>
    <scroll-view class="demo-content" :scroll-y="true">
      <input
        placeholder="请输入内容"
        v-for="i in 50"
        :key="i"
        :adjust-position="true"
        @focus="inputFocus"
        @blur="inputBlur"
      />
    </scroll-view>
    <!-- <view class="demo-content" ref="list">
      <input
        placeholder="请输入内容"
        v-for="i in 50"
        :key="i"
        :adjust-position="true"
        @focus="inputFocus"
      />
    </view> -->
  </view>
</template>
<script>
import AppComponent from "../component/app-container.vue";
export default {
  data() {
    return {
      paddingBottom: 0,
      pt: 0,
      scrollTop: 0,
    };
  },
  components: { AppComponent },
  computed: {},
  mounted() {
    // console.log(uni.getSystemInfoSync().windowHeight);
    // uni.onKeyboardHeightChange((res) => {
    //   console.log(res.height);
    // });
  },
  methods: {
    inputFocus(e) {
      // console.log(uni.getSystemInfoSync().windowHeight);
      let offsetTop = e.target.offsetTop;
      this.scrollTop = offsetTop;

      // if (e.detail.height) {
      //   this.pt = e.detail.height;
      // }
      // this.paddingBottom = paddingBottom;

      // setTimeout(() => {
      //   uni
      //     .createSelectorQuery()
      //     .select(".demo-content")
      //     .boundingClientRect((res) => {
      //       console.log(res);
      //       // const scrollH = res.top;
      //       uni.pageScrollTo({
      //         duration: 0, // 过渡时间
      //         scrollTop: 60, // 滚动的实际距离
      //       });
      //     })
      //     .exec();
      // }, 300);
    },
    inputBlur() {
      this.pt = 0;
    },
  },
};
</script>
<style>
.demo-class {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  padding-top: 60px;
}
.fixed-position {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.demo-content {
  width: 100%;
  height: 100%;
  overflow: auto;
  /* padding: 10px 20px; */
}
</style>
