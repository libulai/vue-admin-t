<template>
  <div class="appointment">
    <!-- 基本信息 -->
    <div class="basic-info">
      <h4>基本信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>经销商名称</span>
            <span class="light">{{data.fwpzhname || '无'}}</span>
          </div>
          <div>
            <span>客户类型</span>
            <span class="light">{{data.customer?data.customer.customertype: ''}}</span>
          </div>
          <div>
            <span>预约类型</span>
            <span class="light">{{data.pttype}}</span>
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

          <!-- <div>
            <span>预估施工面积</span>
            <span class="light">- m²</span>
          </div> -->
        </div>

        <div class="list-items">
          <div>
            <span>小区名称</span>
            <span class="light">{{data.communityname}}</span>
          </div>
          <div>
            <span>地址-门牌号</span>
            <span class="light">{{data.address}}</span>
          </div>
          <div v-if="data.pttype=='施工单'">
            <span>施工类型</span>
            <span class="light">{{data.sgtype}}</span>
          </div>
          <div v-if="data.pttype=='外部验收单'">
            <span>验收类型</span>
            <span class="light">{{data.ystype}}</span>
          </div>

        </div>
      </div>
    </div>

    <div class="basic-info">
      <h4>联系方式</h4>
      <div>
        <div class="list-items">
          <div>
            <span>现场联系人</span>
            <span class="light">{{data.receipt && data.receipt.receipt44 || '无'}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.receipt && data.receipt.receipt45 || '无'}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>业主</span>
            <span class="light">{{data.ownername || '无'}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.ownerphone || '无'}}</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>项目经理姓名</span>
            <span class="light">{{data.receipt && data.receipt.receipt13 || '无'}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.receipt && data.receipt.receipt14 || '无'}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 施工信息 -->
    <div class="">
      <h4>工程信息</h4>
      <div>
        <div class="list-items">
          <!-- <div>
            <span>施工物料模板</span>
            <span class="light">-</span>
          </div> -->
          <div>
            <span>预约时间</span>
            <span class="light">{{data.reservedate && data.reservedate.split(' ')[0] || '无'}}</span>
          </div>
          <div>
            <span>具体时间</span>
            <span class="light">{{times(data.reservetime) || '无'}}</span>
          </div>
          <!-- <div>
            <span>现场照片</span>
            <span class="light">-</span>
          </div> -->
          <div v-if="data.pttype==292 || data.pttype=='施工单'">
            <span>是否需要挡水台</span>
            <span class="light">{{data.dst}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>备注</span>
            <span class="light">{{data.orderdesc || '无'}}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="type==2">
      <el-button type="warning" class="com-btn com-btn" @click="check('是')" v-if="data.status ==4 && data.pttype=='施工单'">复核通过</el-button>
      <!-- <el-button type="info" class="com-btn com-btn" @click="check('否')">复核退回</el-button> -->
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
    times(type) {
      return function (type) {
        let times = {
          1: "上午",
          2: "下午",
          3: '无'
        }
        return times[type]
      }
    },
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

  },
  methods: {
    async check(flag) {
      let rs = await this.$http({
        url: `/kl/doklordercheck?orderids=${this.data.orderid}&check=${flag}`,
        method: "get"
      });

      if (rs.success == 'true') this.$message({
        message: '保存成功',
        type: 'success'
      })

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