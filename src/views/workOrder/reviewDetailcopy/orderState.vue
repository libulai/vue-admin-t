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
  import { getList } from "@/api/table";

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getList().then((response) => {
          this.list = response.data.items;
          this.listLoading = false;
        });
      }
    },
  };
</script>

<style lang="scss" scoped>

</style>