<template>
  <div class="app-container">
    <div class="content-wrap">
      <div style="position: relative;" v-loading="loading">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="预约信息" name="first">
            <appointment :data="data" :type="type" />
          </el-tab-pane>
          <el-tab-pane label="工单状态" name="second" v-if="type!=1 && type!=4">
            <order-state :data="data" :type="type"/>
          </el-tab-pane>
          <el-tab-pane label="施工详情单" name="third" v-if="type!=1 && type!=4 && (ttype=='施工单' || ttype==292)">
            <construction-detail :data="data" :type="type" :recepits="recepits"/>
          </el-tab-pane>
          <el-tab-pane label="验收详情单" name="fourth" v-if="type!=1 && type!=4 && (ttype=='外部验收单' || ttype==293)">
            <confirm :data="data" :type="type" :recepits="recepits"/>
          </el-tab-pane>
           <el-tab-pane label="售后详情单" name="sixth" v-if="type!=1 && type!=4 && (ttype=='售后检查单' || ttype==294)">
            <confirm :data="data" :type="type" :recepits="recepits"/>
          </el-tab-pane>
          <el-tab-pane label="维修详情单" name="seventh" v-if="type!=1 && type!=4 && (ttype=='售后处理单' || ttype==295)">
            <confirm :data="data" :type="type" :recepits="recepits"/>
          </el-tab-pane>
          <el-tab-pane label="核销记录" name="fifth" v-if="type==4 || type==2 || type==6">
            <record :data="data" :type="type" :recepits="recepits"/>
          </el-tab-pane>
        </el-tabs>

        <div class="back">
          <el-button type="warning" size="medium" @click="produce('294')" v-if="data.pttype==292 && type==4">生成售后单</el-button>
          <el-button type="warning" size="medium" @click="produce('295')" v-if="data.pttype==292 && type==4">生成维修单</el-button>
          <el-button class=" defalut-btn" size="medium" @click="back" icon="el-icon-back">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appointment from './appointment.vue'
import orderState from './orderState.vue'
import constructionDetail from './constructionDetail.vue'
import confirm from './confirm.vue'
import record from './record.vue'
import bus from '@/utils/bus'

export default {
  components: {
    appointment,
    orderState,
    confirm,
    record,
    constructionDetail
  },
  data() {
    return {
      loading: false,
      firstLoad: true,
      activeName: 'first',
      ttype:'', // 工单类型
      type: 1, // 1分派  2复核  3网络预约单  4工单信息管理  6质保卡 
      data: {},
      recepits:{}
    };
  },
  created() {
    this.initData(this.$route.query)

    bus.$on('go', rs => {
      this.initData(rs)
    })
  },
   beforeDestroy(){
      bus.$off('go');//组件销毁时关闭监听
  },
  methods: {
    async initData(data) {
      // if (!this.firstLoad) return
      // this.firstLoad = false
      this.type = data.detailType
      this.loading = true

      let rs = await this.$http({
        url: `/kl/klorderdetailforreceipt?orderid=${data.id}`,
        method: "get"
      });

      this.ttype = rs.data[0].pttype
      this.data = rs.data[0]

      rs = await this.$http({
        url: `/kl/klorderreceipt?orderid=${data.id}`,
        method: "get",
      });

      this.recepits = rs.data[0]

      this.loading = false
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    back() {
      this.$router.go(-1)
    },
    async produce(id) {
      let form = {
        ordercode: '',
        communityname: '',
        address: '',
        ownername: '',
        ownerphone: '',
        contacterphone: '',
        customername: '',
        reservedate: '',
        reservetime: '',
        fwpzhname: '',
        pressurerangeflag: 0,
        customertype: '业主',
        orderdesc: '',
        Receipt20: '',
        Receipt21: '',
        Receipt22: '',
        Receipt23: '',
        areaid: '',
        dst: '是',
        pttype: '',
        fwpzhstatus: 0,
        fwpzhisnormal: '',
        ystype: '',
        sgtype: ''
      }

      for (let i in form) {
        form[i] = this.data[i]
      }

      form.pttype = id

      let customer = this.data.customer
      form.contacterphone = customer.contacterphone
      form.customername = customer.customername
      form.customertype = customer.customertype

      let rs = await this.$http({
        url: `/kl/getklordercode`,
        method: "get",
      });

      form.ordercode = rs.data

      rs = await this.$http({
        url: `/kl/doklordersave`,
        method: "post",
        data: form
      });

      if (rs.success == 'true') this.$message({
        message: '保存成功',
        type: 'success'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  right: 0;
  top: -6px;
}
</style>