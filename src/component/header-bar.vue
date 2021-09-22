<!--
 * @Author: 梁智堂
 * @Date: 2021-08-13 15:49:30
 * @Description: 
-->
<template>
  <view :style="style" class="header-bar_content">
    <view
      class="innder-header"
      :style="[
        {
          height: customBarH + 'px',
          'padding-top': statusBarH + 'px',
          color: titleTintColor,
        },
        bgColor,
      ]"
    >
      <slot name="header"></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarH: this.statusBar,
      customBarH: this.customBar,
    };
  },
  props: {
    isBack: { type: [Boolean, String], default: true },
    titleTintColor: { type: String, default: "#fff" },
    bgColor: Object,
    center: { type: [Boolean, String], default: false },
    search: { type: [Boolean, String], default: false },
    searchRadius: { type: [Boolean, String], default: false },
    fixed: { type: [Boolean, String], default: false },
  },
  computed: {
    style() {
      let _style = `height: ${this.customBarH}px;`;
      return _style;
    },
  },
  created() {
    // console.log(this.customBar);
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style>
.header-bar_content {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.innder-header {
  /* position: fixed; */
  /* top: 0; */
  width: 100%;
  /* left: 0; */
}
</style>
