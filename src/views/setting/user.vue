<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="search.username" placeholder="请输入姓名"></el-input>
          <el-input v-model="search.usercode" placeholder="请输入登录账号"></el-input>
          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加用户</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="登录账号">
            <template slot-scope="scope">
              {{ scope.row.usercode }}
            </template>
          </el-table-column>
          <el-table-column label="用户姓名" align="center">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column label="绑定员工" align="center">
            <template slot-scope="scope">
              {{ scope.row.employee ? scope.row.employee.empname : '/' }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="启用状态">
            <template slot-scope="scope">
              <span>{{ forbidden(scope.row.forbidden) }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作">
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

    <el-dialog :title="title" :visible.sync="dialog" class="dialog dialog1" :close-on-click-modal="false" width="1000px" @closed="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="登陆账号" prop="usercode">
          <el-input v-model="form.usercode" placeholder="请输入用户登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="passwd" v-if="!isModify">
          <el-input v-model="form.passwd" placeholder="请输入用户登录密码"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="form.username" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="绑定员工" prop="empid">
          <el-input placeholder="选择员工" v-model="productInfo.productname" class="input-with-select select-btn" disabled>
            <el-button slot="append" @click="dialog2Open">请选择</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="forbidden">
          <el-radio v-model="form.forbidden" :label="0">启用</el-radio>
          <el-radio v-model="form.forbidden" :label="1">关闭</el-radio>
        </el-form-item>
        <el-form-item label="所属公司" prop="comids">
          <el-transfer v-model="form.comids" :data="comp"></el-transfer>
        </el-form-item>
        <el-form-item label="角色" prop="roleids">
          <el-transfer v-model="form.roleids" :data="role"></el-transfer>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择员工" :visible.sync="dialog2" width="400px" class="dialog2">
      <div class="select-dialog">
        <el-table v-loading="listLoading2" :data="list2" element-loading-text="Loading" fit highlight-current-row border @current-change="selectItem">
          <el-table-column align="center" label="姓名">
            <template slot-scope="scope">{{ scope.row.empname }}</template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange2" :current-page.sync="pageIndex2"
            :page-size="pageSize" layout="prev, pager, next" :total="pageTotal2"></el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        pageIndex2: 1,
        pageTotal2: 0,
        isModify: false,
        comp: [],
        role: [],
        productInfo: {},
        list2: [],
        search: {
          usercode: "",
          username: "",
        },
        form: {
          usercode: "",
          username: "",
          forbidden: 0,
          passwd: "",
          // userid: '',
          empid: '',
          comids: [],
          roleids: []
        },
        list: null,
        listLoading: true,
        listLoading2: true,
        dialog: false,
        dialog2: false,
        title: '',
        rules: {
          usercode: [
            { required: true, message: "请输入账号", trigger: "blur" }
          ],
          comids: [
            { required: true, message: "请选择公司", trigger: "blur" }
          ],
          roleids: [
            { required: true, message: "请选择角色", trigger: "blur" }
          ],
          empid: [
            { required: true, message: "请选择员工", trigger: "blur" }
          ],
          username: [
            { required: true, message: "请输入姓名", trigger: "blur" }
          ],
          passwd: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
          ]
        }
      };
    },
    created() {
      this.fetchData();
    },
    computed: {
      forbidden() {
        return function (val) {
          return val == 0 ? '启用' : '关闭'
        }
      }
    },
    watch: {
      pageIndex(index) {
        if (index) this.fetchData(index);
      },
      pageIndex2(index) {
        if (index) this.dialog2Open(index);
      }
    },
    methods: {
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/userlist?usercode=${this.search.usercode}&username=${this.search.username}&page.pageIndex=${this.pageIndex}`,
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
      handleCurrentChange2(val) {
        this.pageIndex2 = val;
      },
      async submit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.dialog = false;

            this.form.comids = this.form.comids.length == 0 ? '' : this.form.comids.join(',')
            this.form.roleids = this.form.roleids.length == 0 ? '' : this.form.roleids.join(',')

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
            this.productInfo.productname = ''
            this.fetchData()
          }
        });

      },
      clearForm() {
        this.$refs.form.resetFields();
        this.productInfo.productname = ''
      },
      cancel() {
        this.dialog = false;
        this.$refs.form.resetFields()
        this.productInfo.productname = ''
      },
      async dispatch(isModify, data) {
        this.dialog = true;
        this.title = isModify ? "编辑用户" : "添加用户"
        this.isModify = isModify;

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.userid = data.userid
          this.getComp()
          this.getRole()
        }

        await this.initComp()
        this.initRole()
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/userdetail?userid=${data.userid}`,
          method: "get"
        });

        for (let i in this.form) {
          this.form[i] = rs.data[0][i]
        }

        this.productInfo.productname = rs.data[0].employee.empname

        // this.form.comids = rs.data[0].comids.split(',')
        // this.form.roleids = rs.data[0].roleids.split(',')
      },
      async initComp(data) {
        let rs = await this.$http({
          url: `/admin/companynouserlist`,
          method: "get"
        });

        const generateData = _ => {
          let data = [];
          let d = rs.data
          for (let i = 0; i < d.length; i++) {
            data.push({
              key: d[i].comid,
              label: d[i].comname
            });
          }
          return data;
        };

        this.comp = generateData()
      },
      async initRole(data) {
        let rs = await this.$http({
          url: `/admin/rolenouserlist`,
          method: "get"
        });

        const generateData = _ => {
          let data = [];
          let d = rs.data
          for (let i = 0; i < d.length; i++) {
            data.push({
              key: d[i].roleid,
              label: d[i].rolename
            });
          }
          return data;
        };

        this.role = generateData()
      },
      async dialog2Open() {
        this.dialog2 = true
        this.listLoading2 = true;
        let rs = await this.$http({
          url: `/admin/emplist?forbidden=-1&page.pageIndex=${this.pageIndex2}`,
          method: 'get'
        });

        this.list2 = rs.data;
        this.pageTotal2 = rs.total;
        this.listLoading2 = false;
      },
      async getRole() {
        let rs = await this.$http({
          url: `/admin/roleuserlist`,
          method: "get",
          params: {
            userid: this.form.userid
          }
        });

        this.form.roleids = rs.data.map(i => i.roleid)
      },
      async getComp() {
        let rs = await this.$http({
          url: `/admin/companyuserlist`,
          method: "get",
          params: {
            userid: this.form.userid
          }
        });

        this.form.comids = rs.data.map(i => i.comid)
      },
      selectItem(val) {
        if (!val) return
        this.dialog2 = false
        this.form.empid = val.empid
        this.productInfo.productname = val.empname
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

  ::v-deep .dialog1 {
    .el-dialog {
      width: 1000px !important;
    }
  }

  ::v-deep .dialog2 {
    .el-dialog {
      width: 400px !important;
    }
  }
</style>