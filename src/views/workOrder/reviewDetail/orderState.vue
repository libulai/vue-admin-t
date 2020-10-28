<template>
  <div class="orderState" style="margin-top: 10px">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row border>
      <el-table-column align="center" label="工单状态">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: null,
      listLoading: false,
    };
  },
  props: ['data', 'type'],
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      let rs = await this.$http({
        url: `/kl/klorderstatuslist?orderid=${this.data.orderid}`,
        method: "get"
      });

      this.listLoading = false
    }
  },
};
</script>

<style lang="scss" scoped>
</style>