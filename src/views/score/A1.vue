<template>
  <div class="orderState" style="margin-top: 10px">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row border>

      <el-table-column align="center" label="物料名称">
        <template slot-scope="scope">
          {{ scope.row.productname }}
        </template>
      </el-table-column>
      <el-table-column label="物料规格" align="center">
        <template slot-scope="scope">
          {{ scope.row.specs }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属公司" align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column> -->
      <el-table-column label="积分数值" align="center">
        <template slot-scope="scope">
          {{ scope.row.scorea }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <span class="detail handle" @click="dispatch(scope.row)">设置积分</span>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="设置积分" :visible.sync="dialog1">

      <el-form :model="form" :rules="rules3" ref="form" label-width="100px" class="dialog3-ruleForm">
        <el-form-item label="分值" prop="scorea">
          <el-input v-model.number="form.scorea" placeholder="设置积分"></el-input>
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
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        list: null,
        listLoading: true,
        dialog1: false,
        form: {
          scorea: '',
          scorec: '',
          id: ''
        },
        rules3: {
          scorea: [
            { type: 'number', required: true, message: "必须是数值", trigger: "blur" }
          ]
        }
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/productkldictionarylist?forbidden=-1&page.pageIndex=${this.pageIndex}`,
          method: 'get'
        });

        this.list = rs.data;
        this.pageTotal = rs.total;
        this.listLoading = false;
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/productkldictionarydetail?id=${data.id}`,
          method: "get"
        });

        this.form.scorec = rs.data[0].scorec
        this.form.scorea = rs.data[0].scorea
      },
      dispatch(data) {
        this.dialog1 = true;
        this.getDepInfos(data)
        this.form.id = data.id
      },
      cancel() {
        this.dialog1 = false;
        this.$refs.form.resetFields()
      },
      async submit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.dialog1 = false;
            let rs = await this.$http({
              url: `/admin/doproductkldictionaryscoremod`,
              method: "post",
              data: this.form
            });

            if (rs.success == 'true') this.$message({
              message: '保存成功',
              type: 'success'
            })

            this.$refs.form.resetFields();
            this.fetchData()
          }
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
</style>