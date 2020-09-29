<template>
  <div class="appointment">
    <!-- 基本信息 -->
    <div class="basic-info">
      <h4>基本信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>经销商名称</span>
            <span class="light">{{data.fwpzhname}}</span>
          </div>
          <div>
            <span>装饰公司</span>
            <span class="light">-</span>
          </div>
          <div>
            <span>预约类型</span>
            <span class="light">{{pttypee(data.pttype)}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div style="width: 540px">
            <span>户型</span>
            <div class="rooms">
              <span class="light">{{data.Receipt20}} 厨</span>
              <span class="light">{{data.Receipt21}} 卫</span>
              <span class="light">{{data.Receipt22}} 阳台</span>
              <span class="light">{{data.Receipt23}} 其他</span>
            </div>
          </div>

          <div>
            <span>预估施工面积</span>
            <span class="light">- m²</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>小区名称</span>
            <span class="light">{{data.communityname}}</span>
          </div>
          <div>
            <span>楼号-门牌号</span>
            <span class="light">{{data.address}}</span>
          </div>
          <div v-if="data.pttype==293 || data.pttype==292">
            <span>施工/预约类型</span>
            <span class="light">{{types}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 施工信息 -->
    <div class="">
      <h4>施工信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>施工物料模板</span>
            <span class="light">-</span>
          </div>
          <div>
            <span>预约时间</span>
            <span class="light">{{data.reservedate}}</span>
          </div>
          <div>
            <span>现场照片</span>
            <span class="light">-</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div v-if="data.pttype==292">
            <span>是否需要挡水台</span>
            <span class="light">{{data.dst}}</span>
          </div>
          <div>
            <span>备注</span>
            <span class="light">{{data.orderdesc}}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="type==2">
      <el-button type="warning" class="com-btn com-btn" @click="check('是')">复核通过</el-button>
      <el-button type="info" class="com-btn com-btn" @click="check('否')">复核退回</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    // status(val) {
    //   return function (val) {
    //     const MAP = {
    //       1: '已登记', 2: '已派单', 3: '正在服务',
    //       4: '已完成', 5: '已复核', 6: '已关闭', 22: '时间已确认'
    //     }
    //     return MAP[val]
    //   }
    // },
    pttypee(val) {
      return function (val) {
        const MAP = {
          292: '施工单', 293: '外部验收单', 294: '售后检查单',
          295: '售后处理单'
        }
        return MAP[val]
      }
    },
    types() {
      try {
        let ttype = this.data.pttype
        let type = ttype == 292 ? this.data.sgtype : this.data.ystype
        let Map = {
          292: {
            1: '隔层墙地施工',
            2: '墙施工',
            3: '地施工',
            4: '同层底面施工',
            5: '同层墙地施工'
          },
          293: {
            1: '面层验收',
            2: '同层排水底层验收'
          }
        }

        return Map[ttype][type] || '-'
      } catch (error) {
        return '-'
      }
    }
  },
  props: ['data', 'type'],
  created() {
    console.log(this.data)
  },
  methods: {
    async check(flag) {
      let rs = await this.$http({
        url: `/kl/doklordercheck?orderids=${this.data.orderid}&check=${flag}`,
        method: "get"
      });

      this.$router.go(-1)
    }
  },
};
</script>

<style lang="scss" scoped>
.appointment {
  h4 {
    font-size: 15px;
    margin: 10px 0 20px 0;
  }
  .list-items {
    display: flex;
    margin-left: 10px;
    & > div {
      display: flex;
      flex-direction: column;
      width: 270px;
      font-size: 14px;
    }
    .light {
      color: #999;
      margin-top: 7px;
    }
  }
  .rooms {
    span {
      width: 100px;
      display: inline-flex;
    }
  }
}

.basic-info {
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 30px;
  margin-bottom: 30px;
}
</style>