<!--
 * @Author: 梁智堂
 * @Date: 2021-09-10 15:47:50
 * @Description: 
-->
<template>
  <AppComponent :bg="getBg" navBarName="排班安排">
    <view class="work-plan" slot="content">
      <view class="search-nav"></view>
      <view class="week-list">
        <view class="week-item" v-for="(item, i) in week" :key="i">
          {{ item }}
        </view>
      </view>
      <view class="plan-list">
        <refresh
          refresher
          @on-refresh="refresh"
          class="page-content"
          navbgColor="primary"
          @onScrollEnd="onScrollEnd"
          :infiniteDisabled="infiniteDisabled"
        >
          <view class="month-day" v-for="(m, i) in planList" :key="i">
            <view class="month-title">
              <text>{{ m.ym }}</text>
            </view>
            <view class="day-list">
              <view class="month-cover">
                {{ m.month }}
              </view>
              <view class="day-item" v-for="(day, di) in m.dayList" :key="di">
                {{ day.day || "" }}
              </view>
            </view>
          </view>
        </refresh>
      </view>
    </view>
  </AppComponent>
</template>

<script>
import AppComponent from "@/component/app-container.vue";
import Refresh from "@/component/pull-refresh-wrap";
export default {
  data() {
    return {
      week: ["一", "二", "三", "四", "五", "六", "日"],
      curYear: new Date().getFullYear(),
      planList: [],
      infiniteDisabled: false,
    };
  },

  components: {
    AppComponent,
    Refresh,
  },

  computed: {
    getBg() {
      return "#2cc2ff";
    },
  },
  created() {
    const y = new Date().getFullYear();
    const arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push({ month: i, id: i });
    }
    const dateList = this.createDate(y, arr);
    this.planList = dateList;
  },
  mounted() {},

  methods: {
    createDate(y, arr) {
      let dateList = [];
      arr.forEach((item, o) => {
        //获取当前月的总天数
        const _d = new Date(y, o + 1, 0);
        const days = _d.getDate();
        let mm = "";
        if (parseInt(o) + parseInt(1) < 10) {
          mm = "0" + (parseInt(o) + parseInt(1));
        } else {
          mm = parseInt(o) + parseInt(1);
        }
        let ym = y + "-" + mm;
        let dayList = [];
        for (let i = 1; i <= days; i++) {
          const index = new Date(y, o, i).getDay();
          const obj = this.getWeekType(index);
          let dd = i;
          if (dd < 10) {
            dd = "0" + dd;
          }
          const ymd = ym + "-" + dd;
          obj.day = i;
          obj.date = ymd;
          obj.value = y + "" + mm + "" + dd;
          dayList.push(obj);
        }
        //设置第一行空白占位数量，取数组第一个元素，根据星期几来判断空白位的数量
        const firstDay = dayList[0].type;
        let spaceList = [];
        for (let j = 1; j < firstDay; j++) {
          spaceList.push({
            type: 11,
            week: "",
          });
        }
        dayList = spaceList.concat(dayList);
        // if (dayList.length < 42) {
        //   //判断是否够六行数据 （6*7）
        //   let lastSpaceLen = 42 - dayList.length;
        //   let lastSpaceList = [];
        //   for (let l = 0; l < lastSpaceLen; l++) {
        //     lastSpaceList.push({
        //       type: 11,
        //       week: "",
        //     });
        //   }
        //   dayList = dayList.concat(lastSpaceList);
        // }

        dateList.push({ ym: ym, dayList, id: item.id, month: parseInt(mm) });
      });
      return dateList;
    },
    //判断天数对应星期几
    getWeekType(d) {
      let obj = null;
      switch (d) {
        case 1:
          obj = {
            type: 1,
            week: "星期一",
          };
          break;
        case 2:
          obj = {
            type: 2,
            week: "星期二",
          };
          break;
        case 3:
          obj = {
            type: 3,
            week: "星期三",
          };
          break;
        case 4:
          obj = {
            type: 4,
            week: "星期四",
          };
          break;
        case 5:
          obj = {
            type: 5,
            week: "星期五",
          };
          break;
        case 6:
          obj = {
            type: 6,
            week: "星期六",
          };
          break;
        default:
          obj = {
            type: 7,
            week: "星期日",
          };
      }
      return obj;
    },
    refresh({ complete }) {
      const minYear = parseInt(new Date().getFullYear()) - 5;
      console.log(minYear);
      if (this.curYear > minYear) {
        const arr = [];
        for (let i = 0; i < 12; i++) {
          arr.push({ month: i, id: i });
        }
        this.curYear = this.curYear - 1;
        const dateList = this.createDate(this.curYear, arr);
        this.planList = dateList.concat(this.planList);
      } else {
        uni.showModal({
          title: "",
          content: `只支持查看5年之前的安排！`,
          showCancel: false,
        });
      }

      let timer = setTimeout(() => {
        clearTimeout(timer);
        complete(); // 结束下拉刷新
      }, 0);
    },
    onScrollEnd() {
      const maxYear = parseInt(new Date().getFullYear()) + 1;
      if (this.curYear < maxYear) {
        this.curYear = parseInt(this.curYear) + parseInt(1);
        const arr = [];
        for (let i = 0; i < 12; i++) {
          arr.push({ month: i, id: i });
        }
        const dateList = this.createDate(this.curYear, arr);
        this.planList = this.planList.concat(dateList);
      } else {
        this.infiniteDisabled = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
@color: #dcdcdc;
@color2: #f3f3f3;
.work-plan {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.search-nav {
  width: 100%;
  height: 60px;
}
.week-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 40px;
  border-bottom: 1px solid #eceff4;
  .week-item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    // color: #dcdcdc;
    color: @color;
  }
}
.plan-list {
  width: 100%;
  height: calc(100% - 100px);
  // padding: 10px 0;
  overflow: hidden;

  .month-day {
    width: 100%;

    .month-title {
      width: 100%;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      background: @color2;
    }
    .day-list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      position: relative;
      z-index: 20;
      .month-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 120px;
        font-weight: bolder;
        z-index: 0;
        color: @color2;
      }

      .day-item {
        width: 100%;
        height: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        z-index: inherit;
      }
    }
  }
  .month-day + .month-day {
    margin-top: 10px;
  }
}
</style>
