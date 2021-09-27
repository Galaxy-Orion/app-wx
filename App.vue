<script>
import Vue from "vue";
export default {
  onLaunch: function() {
    // console.log("App Launch");
    uni.getSystemInfo({
      success: function(e) {
        Vue.prototype.statusBar = e.statusBarHeight;
        // #ifndef MP
        if (e.platform == "android") {
          Vue.prototype.customBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.customBar = e.statusBarHeight + 45;
        }
        // #endif

        // #ifdef MP-WEIXIN
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.customBar =
          custom.bottom + custom.top - e.statusBarHeight;
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      },
    });
  },
  onShow: function() {
    // console.log("App Show");
  },
  onHide: function() {
    // console.log("App Hide");
  },
};
</script>
<style lang="scss">
@import "uview-ui/index.scss";
</style>
<style>
/*引入iconfont样式 */
@import url("./static/font/iconfont.css");
view {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
