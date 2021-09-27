import Vue from "vue";
import App from "./App";
import TabBarBottom from "./component/tab-bar-bottom";
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = "app";

Vue.component("tab-bar", TabBarBottom);

const app = new Vue({
  ...App,
});
app.$mount();
