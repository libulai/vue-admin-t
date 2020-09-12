<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加物料</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="名称">
            <template slot-scope="scope">{{ scope.row.deptname }}</template>
          </el-table-column>
          <el-table-column label="规格" align="center">
            <template slot-scope="scope">{{ scope.row.deptcode }}</template>
          </el-table-column>
          <el-table-column align="center" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.forbidden }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span>{{ scope.row.forbidden }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.forbidden }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span class="detail handle" @click="dispatch(true, scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" @closed="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="选择产品" prop="education">
          <el-select v-model="form.education" placeholder="请选择">
            <el-option v-for="item in products" :key="item.id" :label="item.val" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.deptcode" disabled placeholder="自动解析"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.deptcode" disabled placeholder="自动解析"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="deptcode">
          <el-input v-model="form.deptcode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="deptname">
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
      products:[],
      isModify: false,
      form: {
        deptcode: "",
        deptname: "",
        forbidden: 0,
        deptid: ""
      },
      list: null,
      listLoading: true,
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
        url: `/admin/productkldictionarylist`,
        method: 'get'
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

      this.initProducts()
    },
    async initProducts(){
      let rs = await this.$http({
        url: `/admin/productkllist`,
        method: 'get'
      });

      this.products = rs.data
    },
    async getDepInfos(data) {
      let rs = await this.$http({
        url: `/admin/deptdetail?deptid=${data.deptid}`,
        method: "get"
      });

      for (let i in this.form) {
        this.form[i] = rs.data[0][i]
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.content-box {
  & > div {
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