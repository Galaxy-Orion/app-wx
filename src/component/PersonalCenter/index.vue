<!--
 * @Author: 梁智堂
 * @Date: 2021-08-18 15:00:47
 * @Description: 个人中心
-->
<template>
  <view class="shop-personal">
    <refresh
      refresher
      infiniting
      @on-refresh="refresh"
      class="page-content"
      navbgColor="primary"
    >
      <view class="shop-personal_info">
        <view
          class="per-img_box"
          style="background-image:url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F18%2F20150818213048_vAdhz.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631929914&t=4dceddc2da53963ffea09cdb9533e7e6')"
        >
          <view class="level-icon">
            <text class="font-size_30 iconfont icon-canpinhuihuiyuanv2"></text>
          </view>
        </view>
        <view class="per-name_info">
          <view class="per_name">{{ name }}</view>
          <view class="per_other">
            <view class="per_level">白金会员</view>
            <view class="per_level">
              <text class="iconfont icon-wode icon-size"></text>
              兼职
            </view>
          </view>
        </view>
      </view>
      <view class="per-grade_identfy">
        <view class="grade-item per-grade">
          <view class="grade-item_first">0</view>
          <view class="grade-item_second">可用积分</view>
        </view>
        <view class="grade-item per-identfy">
          <view class="grade-item_first">100</view>
          <view class="grade-item_second">信用积分</view>
        </view>
      </view>
      <view class="sys-notify">
        <view class="scroll">
          <text class="iconfont icon-tongzhi icon-size"></text>
          <text>系统通知：</text>
          <text>
            活动上新啦，点击可查看！！！
          </text>
        </view>
      </view>
      <view class="menu-row">
        <view class="menu-item" @click="showWorkPlan">
          <view class="row-icon-left">
            <text class="iconfont icon-paiban row-icon is-admin"></text>
          </view>
          <view class="row-title">排班</view>
          <view class="row-icon-right">
            <text class="iconfont icon-jiantouyou size-25 jiantou"></text>
          </view>
        </view>
        <view class="menu-item" @click="showTaskList">
          <view class="row-icon-left">
            <text class="iconfont icon-renwu row-icon is-admin"></text>
          </view>
          <view class="row-title">任务</view>
          <view class="row-icon-right">
            <text class="iconfont icon-jiantouyou size-25 jiantou"></text>
          </view>
        </view>
        <view class="menu-item">
          <view class="row-icon-left">
            <text class="iconfont icon-gongzi row-icon is-admin"></text>
          </view>
          <view class="row-title">工资</view>
          <view class="row-icon-right">
            <text class="iconfont icon-jiantouyou size-25 jiantou"></text>
          </view>
        </view>
        <view class="menu-item">
          <view class="row-icon-left">
            <text class="iconfont icon-pingfen row-icon is-admin"></text>
          </view>
          <view class="row-title">评分</view>
          <view class="row-icon-right" :class="getGradeClass">
            {{ salaryGrade }}{{ getEvaluate }}
          </view>
        </view>
      </view>
      <view class="menu-row">
        <view class="menu-item">
          <view class="row-icon-left">
            <text class="iconfont icon-icon-test row-icon youhuiquan"></text>
          </view>
          <view class="row-title">优惠券</view>
          <view class="row-icon-right">
            <text class="iconfont icon-jiantouyou size-25 jiantou"></text>
          </view>
        </view>
        <view class="menu-item">
          <view class="row-icon-left">
            <text class="iconfont icon-huodong row-icon huodong"></text>
          </view>
          <view class="row-title">活动</view>
          <view class="row-icon-right">
            <text class="iconfont icon-jiantouyou size-25 jiantou"></text>
          </view>
        </view>
        <view class="menu-item">
          <view class="row-icon-left">
            <text class="iconfont icon-shangcheng row-icon shangcheng"></text>
          </view>
          <view class="row-title">积分商城</view>
          <view class="row-icon-right">
            <text class="iconfont icon-jiantouyou size-25 jiantou"></text>
          </view>
        </view>
        <view class="menu-item">
          <view class="row-icon-left">
            <text class="iconfont icon-xiaoxi row-icon xiaoxi"></text>
          </view>
          <view class="row-title">消息</view>
          <view class="row-icon-right">
            <text class="iconfont icon-jiantouyou size-25 jiantou"></text>
          </view>
        </view>
        <view class="menu-item">
          <view class="row-icon-left">
            <text class="iconfont icon-fankui row-icon fankui"></text>
          </view>
          <view class="row-title">反馈</view>
          <view class="row-icon-right">
            <text class="iconfont icon-jiantouyou size-25 jiantou"></text>
          </view>
        </view>
      </view>
    </refresh>
  </view>
</template>
<script>
import Refresh from "../../component/pull-refresh-wrap";
export default {
  components: {
    refresh: Refresh,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFirstLoad: true,
      name: "",
      salaryGrade: 40,
    };
  },
  watch: {
    isShow: {
      deep: true,
      handler(n) {
        if (n && this.isFirstLoad) {
          this.getData();
        }
      },
    },
  },
  computed: {
    getGradeClass() {
      let cl = "";
      if (Number(this.salaryGrade) < Number(60)) {
        cl = "red-cl";
      } else if (
        Number(this.salaryGrade) >= Number(60) &&
        Number(this.salaryGrade) < Number(80)
      ) {
        cl = "yellow-cl";
      } else if (Number(this.salaryGrade) >= 80) {
        cl = "green-cl";
      }
      console.log(cl);
      return cl;
    },
    getEvaluate() {
      if (this.salaryGrade <= 30) {
        return "(差评严重)";
      } else if (this.salaryGrade > 30 && this.salaryGrade <= 50) {
        return "(低评)";
      } else if (this.salaryGrade > 90) {
        return "(优秀)";
      } else {
        return "";
      }
    },
  },
  created() {},
  methods: {
    getData() {
      this.isFirstLoad = false;
      const ran = Math.round(Math.random() * 10 + 50);
      this.name = "偏爱_" + ran;
      //   console.log("loading!!!!");
    },
    changePage() {
      uni.navigateTo({
        url: "/pages/refreshDemo",
      });
    },
    refresh({ complete }) {
      setTimeout(() => {
        this.getData();
        complete(); // 结束下拉刷新
      }, 1000);
    },
    showTaskList() {
      uni.navigateTo({
        url: "/pages/taskList/index",
      });
    },
    showWorkPlan() {
      uni.navigateTo({
        url: "/pages/workPlan/index",
      });
    },
  },
};
</script>
<style lang="less">
@perInfoHeight: 70px;
@mainBackground: #2cc2ff;
@menuBackground: #fff;
@linearGradientGold: linear-gradient(
  left,
  rgba(224, 134, 26, 0.9),
  rgba(224, 134, 26, 1)
);
@linearGradientWarn: linear-gradient(
  right,
  rgba(182, 69, 51, 0.9),
  rgba(182, 69, 51, 1)
);
.shop-personal {
  width: 100%;
  height: 100%;
  .shop-personal_info {
    width: 100%;
    background: @mainBackground;
    padding: 20px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    .per-img_box {
      width: @perInfoHeight;
      height: @perInfoHeight;
      border-radius: 50%;
      background: #fff;
      position: relative;
      background-size: 100%;
      background-repeat: no-repeat;
      .level-icon {
        width: 30px;
        height: 30px;
        position: absolute;
        bottom: -5px;
        right: -3px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-image: -webkit-linear-gradient(
          left,
          #fff 0%,
          #2cc2ff 25%,
          #fff 50%,
          #2cc2ff 75%,
          #fff 100%,
          // #2cc2ff 100%
        );
        -webkit-text-fill-color: transparent; /* 字体设置成透明色 */
        -webkit-background-clip: text; /* 裁剪背景，使文字作为裁剪区域向外裁剪 */
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation 1.5s linear infinite;
        .font-size_30 {
          font-size: 20px;
        }
      }
    }
    .per-name_info {
      padding-left: 5px;
      flex: 1;
      height: @perInfoHeight;
      display: flex;
      align-items: flex-start;
      justify-items: flex-start;
      flex-direction: column;
      .per_name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        align-items: flex-end;
        justify-items: flex-start;
        font-size: 20px;
        color: #fff;
        flex: 1;
      }
      .per_other {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-items: flex-start;
        font-size: 12px;
        .per_level {
          color: #fff;
          padding: 3px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-items: center;
          .icon-size {
            font-size: 16px;
          }
        }
        .per_level + .per_level {
          margin-left: 3px;
        }
      }
    }
  }
  .sys-notify {
    width: 100%;
    background: rgba(224, 134, 26, 03);
    font-size: 12px;
    color: #fff;
    padding: 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .scroll {
      width: 100%;
      animation: myMove 10s linear infinite;
      transform: translate(100%);
      animation-fill-mode: forwards;
      // white-space: nowrap;
      // overflow: -webkit-marquee;
      // -webkit-marquee-direction: left;
      // -webkit-marquee-speed: normal;
      // -webkit-marquee-style: scroll;
      // -webkit-marquee-repetition: infinite;
    }
  }
  .per-grade_identfy {
    padding: 10px 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: @mainBackground;
    .grade-item {
      flex: 1;
      height: 60px;
      border-radius: 8px;
      color: #fff;
    }
    .grade-item + .grade-item {
      margin-left: 10px;
    }
    .per-grade {
      background: @linearGradientGold;
    }
    .per-identfy {
      background: @linearGradientWarn;
    }
    .grade-item_first {
      width: 100%;
      height: 55%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      overflow: hidden;
    }
    .grade-item_second {
      width: 100%;
      height: 45%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      font-size: 14px;
      overflow: hidden;
    }
  }
  .menu-row {
    width: 100%;
    background: @menuBackground;
    .menu-item {
      width: 100%;
      padding: 0 10px;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .row-icon-left {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .row-icon {
        font-size: 23px;
      }
      .xiaoxi {
        color: #a3cf62;
      }
      .fankui {
        color: #dcdcdc;
      }
      .is-admin {
        color: #f4861a;
      }
      .youhuiquan {
        color: @mainBackground;
      }
      .shangcheng {
        color: #f4861a;
      }
      .huodong {
        color: #b64533;
      }
      .row-title {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 5px;
        font-size: 13px;
        letter-spacing: 1px;
      }
      .jiantou {
        color: #dcdcdc;
      }
      .row-icon-right {
        min-width: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    .menu-item:active {
      background: rgba(0, 0, 0, 0.3);
      opacity: 0.6;
    }
    .menu-item + .menu-item {
      border-top: 1px solid #eceff4;
    }
  }
  .menu-row + .menu-row {
    margin-top: 8px;
  }
}

.size-25 {
  font-size: 20px;
}
.red-cl {
  color: #b64533;
}
.yellow-cl {
  color: #e0861a;
}
.green-cl {
  color: #32cd32;
}
@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
/*文字无缝滚动*/
@keyframes myMove {
  0% {
    transform: translateX(100%);
  }

  // 50% {
  //   transform: translateY(-30px);
  // }

  100% {
    transform: translateX(-100%);
  }
}
</style>
