<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="search.rolename" placeholder="请输入角色名称"></el-input>
          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加角色</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="角色名称">
            <template slot-scope="scope">
              {{ scope.row.rolename }}
            </template>
          </el-table-column>
          <el-table-column label="级别" align="center">
            <template slot-scope="scope">
              {{ scope.row.rolelevel }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="是否对外">
            <template slot-scope="scope">
              <span>{{ scope.row.rolestatus==0?'是':'否' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作">
            <template>
              <span class="detail handle" @click="dispatch(true, scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" width="1000px" @closed="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename" placeholder="请输入用户登录账号"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="rolelevel">
          <el-input v-model.number="form.rolelevel" placeholder="请输入用户登录密码"></el-input>
        </el-form-item>
        <el-form-item label="是否对外" prop="rolestatus">
          <el-radio v-model="form.rolestatus" :label="0">是</el-radio>
          <el-radio v-model="form.rolestatus" :label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="菜单权限" prop="menuids">
          <el-transfer v-model="form.menuids" :data="menus"></el-transfer>
        </el-form-item>
        <el-form-item label="按钮权限" prop="buttonids">
          <el-transfer v-model="form.buttonids" :data="buttons"></el-transfer>
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
  name: 'Role',
  data() {
    return {
      pageSize: 15,
      pageTotal: 0,
      pageIndex: 1,
      search: {
        rolename: ""
      },
      isModify: false,
      menus: [],
      buttons: [],
      form: {
        rolename: "",
        rolelevel: "",
        rolestatus: 0,
        menuids: '',
        buttonids: ''
      },
      list: null,
      listLoading: true,
      dialog: false,
      title: '',
      rules: {
        account: [
          { required: true, message: "请输入当前密码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    pageIndex(index) {
      if (index) this.fetchData(index);
    },
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      let rs = await this.$http({
        url: `/admin/rolelist?rolename=${this.search.rolename}&page.pageIndex=${this.pageIndex}`,
        method: "get"
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

      this.form.comids = this.form.comids.join(',')
      this.form.roleids = this.form.roleids.join(',')

      let rs = await this.$http({
        url: `/admin/${this.isModify ? 'dousermod' : 'dousernew'}`,
        method: "post",
        data: this.form
      });

      if (rs.success == 'true') this.$message({
        message: '保存成功',
        type: 'success'
      })

      this.$refs.form.resetFields()
      this.fetchData()
    },
    clearForm() {
      this.$refs.form.resetFields();
    },
    cancel() {
      this.dialog = false;
      this.$refs.form.resetFields()
    },
    dispatch(isModify, data) {
      this.dialog = true;
      this.title = isModify ? "编辑角色" : "添加角色"
      this.isModify = isModify;

      if (this.isModify) {
        this.getDepInfos(data)
        this.form.roleid = data.roleid
        this.getComp()
        this.getRole()
      }

      this.getComp()
        this.getRole()

      this.initComp()
      this.initRole()
    },
    async getDepInfos(data) {
      let rs = await this.$http({
        url: `/admin/roledetail?roleid=${data.roleid}`,
        method: "get"
      });

      for (let i in this.form) {
        this.form[i] = rs.data[0][i]
      }

      // Object.assign(this.form, rs.data[0])
    },
    async initComp(data) {
      let rs = await this.$http({
        url: `/admin/buttonlist`,
        method: "get"
      });

      const generateData = _ => {
        let data = [];
        let d = rs.data
        for (let i = 0; i < d.length; i++) {
          data.push({
            key: d[i].buttonid,
            label: d[i].buttonname
          });
        }
        return data;
      };

      this.buttons = generateData()
    },
    async initRole(data) {
      let rs = await this.$http({
        url: `/admin/menulist`,
        method: "get"
      });

      const generateData = _ => {
        let data = [];
        let d = rs.data
        for (let i = 0; i < d.length; i++) {
          data.push({
            key: d[i].menuid,
            label: d[i].menuname
          });
        }
        return data;
      };

      this.menus = generateData()
    },
    async getComp() {
      let rs = await this.$http({
        url: `/admin/buttonrolelist`,
        method: "get",
        params: {
          roleid: this.form.roleid
        }
      });

      this.form.buttons = rs.data.map(i => i.comid)
    },
    async getRole() {
      let rs = await this.$http({
        url: `/admin/menurolelists`,
        method: "get",
        params: {
          roleid: this.form.roleid
        }
      });

      this.form.menus = rs.data.map(i => i.roleid)
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

::v-deep .dialog {
  .el-dialog {
    width: 1000px !important;
  }
}
</style>