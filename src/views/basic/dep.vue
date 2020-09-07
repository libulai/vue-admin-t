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

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
            :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" @close="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="公司">
          <span class="text">上海分公司</span>
        </el-form-item>
        <el-form-item label="部门编号" prop="deptcode">
          <el-input v-model.number="form.deptcode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptname">
          <el-input v-model="form.deptname" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="启用状态">
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
  import { getList } from "@/api/table";

  export default {
    name: "Dep",
    data() {
      return {
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        isModify: false,
        options: [
          {
            value: "选项1",
            label: "黄金糕",
          },
          {
            value: "选项2",
            label: "双皮奶",
          },
        ],
        form: {
          deptcode: "",
          deptname: "",
          forbidden: 0,
          deptid: ""
        },
        list: null,
        listLoading: true,
        currentPage: 10,
        dialog: false,
        title: "",
        rules: {
          deptcode: [
            { required: true, message: "请输入部门编号", trigger: "blur" },
            { type: 'number', message: '请输入数字' }
          ],
          deptname: [
            { required: true, message: "请输入部门名称", trigger: "blur" },
          ],
        },
      };
    },
    watch: {
      pageIndex(index) {
        this.fetchData(index);
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/departmentlist`,
          method: "post",
          data: {
            forbidden: -1,
            pageIndex: this.pageIndex,
          },
        });
        console.log(rs);
        this.list = rs.data;
        this.pageTotal = rs.total || 7;
        this.listLoading = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        console.log(`当前页: ${val}`);
      },
      async submit() {
        this.dialog = false;
   
        let rs = await this.$http({
          url: `/admin/${this.isModify ? 'dodeptmod' : 'dodeptnew'}`,
          method: "post",
          data: this.form
        });

        this.$refs.form.resetFields();
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
          url: `/admin/deptdetail`,
          method: "post",
          data: {
            deptid: data.deptid,
            // comid: data.comid
          },
        });


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