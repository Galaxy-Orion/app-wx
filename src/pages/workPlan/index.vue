<!--
 * @Author: 梁智堂
 * @Date: 2021-09-10 15:47:50
 * @Description: 
-->
<template>
  <AppComponent
    :bg="getBg"
    :navBarName="curYear + '年排班安排'"
    @titleClick="selectYear"
  >
    <view class="work-plan" slot="content">
      <!-- <view class="search-nav">
        <text @click="openYearPop" class="year-name">年份：{{ curYear }}</text>
      </view> -->
      <view class="week-list">
        <view class="week-item" v-for="(item, i) in week" :key="i">
          {{ item }}
        </view>
      </view>
      <view class="plan-list">
        <refresh
          refresher
          @on-refresh="refresh"
          navbgColor="primary"
          @onScrollEnd="onScrollEnd"
          ref="refreshView"
          :infiniteDisabled="true"
        >
          <view class="slot-dom" slot="content">
            <view class="month-day" v-for="i in 12" :key="i">
              <view class="month-title_name">
                <text>{{ MonthList[i].ym }}</text>
              </view>
              <view class="day-list">
                <view class="month-cover">
                  {{ MonthList[i].month }}
                </view>
                <view
                  class="day-item"
                  :class="day.type != 11 ? checkDateByValue(day) : ''"
                  v-for="(day, di) in MonthList[i].dayList"
                  :key="di"
                >
                  {{ day.day || "" }}
                </view>
              </view>
            </view>
            <!-- <view class="month-day" v-for="i in 12" :key="i">{{ i }}</view> -->
          </view>
        </refresh>
      </view>
      <u-select
        v-model="pickerVis"
        :list="list"
        :default-value="[1]"
        @confirm="yearChange"
      ></u-select>
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
      todayVal: "",
      MonthList: [],
      infiniteDisabled: false,

      indicatorStyle: `height: 50px;`,
      pickerVis: false,
      list: [
        { value: "2020", label: "2020年" },
        { value: "2021", label: "2021年" },
        { value: "2022", label: "2022年" },
      ],
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
    checkDateByValue() {
      return (obj) => {
        if (obj.value < this.todayVal) {
          return "is-past_date";
        } else if (obj.value == this.todayVal) {
          return "is-today";
        }
      };
    },
  },
  created() {
    const y = new Date().getFullYear();
    let m = new Date().getMonth() + 1;
    let d = new Date().getDate();
    if (m < 10) {
      m = "0" + m;
    }
    if (d < 10) {
      d = "0" + d;
    }
    this.todayVal = y + "" + m + "" + d;
    this.createMonthList();
  },
  mounted() {},

  methods: {
    createMonthList() {
      const arr = [];
      for (let i = 0; i < 12; i++) {
        arr.push({ month: i, id: i });
      }
      const dateList = this.createDate(this.curYear, arr);
      this.MonthList = dateList;
    },
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
      this.createMonthList();
      let timer = setTimeout(() => {
        clearTimeout(timer);
        complete(); // 结束下拉刷新
      }, 0);
    },
    onScrollEnd(callBack) {
      const maxYear = parseInt(new Date().getFullYear()) + 1;
      if (this.curYear < maxYear) {
        this.curYear = parseInt(this.curYear) + parseInt(1);
        const arr = [];
        for (let i = 0; i < 12; i++) {
          arr.push({ month: i, id: i });
        }
        const dateList = this.createDate(this.curYear, arr);
        // this.MonthList = this.MonthList.concat(dateList);
        this.MonthList = dateList;
        let isEnd = this.curYear == maxYear;
        this.$nextTick(() => {
          callBack && callBack(isEnd, true);
        }, 100);
      } else {
        this.infiniteDisabled = true;
      }
    },
    selectYear() {
      this.pickerVis = true;
    },
    yearChange(arr) {
      this.pickerVis = false;
      this.curYear = arr[0].value;
      this.createMonthList();
    },
  },
};
</script>
<style lang="less" scoped>
@color: #dcdcdc;
@color2: #f3f3f3;
@color3: #2cc2ff;
@color4: #adadad;
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
  height: calc(100% - 40px);
  // padding: 10px 0;
  overflow: hidden;

  .month-day {
    width: 100%;
    // min-height: 600px; //临时测试
    .month-title_name {
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
    // border-top: 1px solid yellow; //临时测试
    margin-top: 10px;
  }
}
.slot-dom {
  width: 100%;
}
.picker-view {
  width: 100%;
  height: 300px;
  // margin-top: 20rpx;
  .item {
    line-height: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
.pop-dialog {
  width: 100%;
  background: #fff;
}
.cl {
  width: 100%;
  height: 200px;
  text-align: center;
  line-height: 200px;
}
.is-past_date {
  color: @color4;
}
.is-today {
  background: @color3;
  color: #fff;
}
</style>
