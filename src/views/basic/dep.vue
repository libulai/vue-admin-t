<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加部门</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="部门名称">
            <template slot-scope="scope">{{ scope.row.deptname }}</template>
          </el-table-column>
          <el-table-column label="部门编号" align="center">
            <template slot-scope="scope">{{ scope.row.deptcode }}</template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.forbidden == 1? '禁用':'可用' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span class="detail handle" @click="dispatch(true, scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>

        <!-- <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
            :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div> -->
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" @closed="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <!-- <el-form-item label="公司">
          <span class="text">上海分公司</span>
        </el-form-item> -->
        <el-form-item label="部门编号" prop="deptcode">
          <el-input v-model="form.deptcode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="forbidden">
          <el-radio v-model="form.forbidden" :label="0">启用</el-radio>
          <el-radio v-model="form.forbidden" :label="1">停用</el-radio>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Dep",
    data() {
      return {
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        isModify: false,
        form: {
          deptcode: "",
          deptname: "",
          forbidden: 0,
          // deptid: ""
        },
        list: null,
        listLoading: true,
        currentPage: 10,
        dialog: false,
        title: "",
        rules: {
          deptcode: [
            { required: true, message: "请输入部门编号", trigger: "blur" },
          ],
          deptname: [
            { required: true, message: "请输入部门名称", trigger: "blur" },
          ],
        },
      };
    },
    watch: {
      pageIndex: {
        handler: function (index) {
          if (index) this.fetchData(index);
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/departmentlist`,
          method: 'get',
          params: {
            forbidden: -1
          },
        });

        this.list = rs.data;
        this.pageTotal = rs.total;
        this.listLoading = false;
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
      },
      async submit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.dialog = false;
            let rs = await this.$http({
              url: `/admin/${this.isModify ? 'dodeptmod' : 'dodeptnew'}`,
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
      },
      cancel() {
        this.dialog = false;
        this.$refs.form.resetFields();
      },
      clearForm() {
        this.$refs.form.resetFields();
      },
      dispatch(isModify, data) {
        this.isModify = isModify;
        this.dialog = true;
        this.title = isModify ? "编辑部门" : "添加部门";

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.deptid = data.deptid
        }
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/deptdetail?deptid=${data.deptid}`,
          method: "get"
        });

        for (let i in this.form) {
          this.form[i] = rs.data[0][i]
        }

        // this.form.deptcode = Number(this.form.deptcode)
      }
    },
  };
</script>

<style lang="scss" scoped>
  .content-box {
    &>div {
      display: flex;
      .el-input,
      .el-select,
      .el-date-editor {
        width: 20%;
        margin-right: 30px;
      }
    }
  }
</style>