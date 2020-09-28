<template>
  <div class="app-container" style="padding:0">
    <div class="content-wrap">
      <div style="position: relative;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="预约信息" name="first">
            <appointment />
          </el-tab-pane>
          <el-tab-pane label="工单状态" name="second">
            <order-state />
          </el-tab-pane>
          <el-tab-pane label="施工详情单" name="third">
            <construction-detail />
          </el-tab-pane>
          <el-tab-pane label="验收详情单" name="fourth">
            <confirm />
          </el-tab-pane>
        </el-tabs>

        <el-button class="back defalut-btn" size="medium" @click="back" icon="el-icon-back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import appointment from './appointment.vue'
import orderState from './orderState.vue'
import constructionDetail from './constructionDetail.vue'
import confirm from './confirm.vue'
import bus from '@/utils/bus'

export default {
  components: {
    appointment,
    orderState,
    confirm,
    constructionDetail
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  created() {
    this.initData(this.$route.query)
   
    bus.$on('go', rs => {
      console.log(rs)
      this.initData(rs)
    })
  },
  methods: {
    async initData(data) {
      let rs = await this.$http({
        url: `/kl/klorderdetailforreceipt?orderid=${data.id}`,
        method: "get"
      });


    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    back() {
      this.$router.push({ path: '/workOrder/review' })
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