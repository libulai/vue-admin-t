<template>
  <div class="orderState" style="margin-top: 10px">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row border>

      <el-table-column align="center" label="物料名称">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="物料规格" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="所属公司" align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column label="积分数值" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template>
          <span class="detail handle" @click="dialog1 = true">设置积分</span>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="设置积分" :visible.sync="dialog1">

      <el-form :model="form" :rules="rules3" ref="form" label-width="100px" class="dialog3-ruleForm">
        <el-form-item label="分值" prop="score">
          <el-input v-model="form.score" placeholder="设置积分"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getList } from "@/api/table";

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        dialog1: false,
        form: {
          score: ''
        },
        rules3: {
          score: [
            { required: true, message: "必须是数值", trigger: "blur" }
          ]
        }
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
      },
      cancel(){
        this.dialog1 = false;
        this.$refs.form.resetFields()
      },
      submit() {
        this.dialog1 = false;
        this.$refs.form.resetFields()
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>