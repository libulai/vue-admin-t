<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="form.username" placeholder="请输入姓名"></el-input>
          <el-input v-model="form.usercode" placeholder="请输入登录账号"></el-input>
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
          <!-- <el-table-column type="selection" width="55">
          </el-table-column> -->

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
          <el-table-column class-name="status-col" label="绑定员工">
            <template slot-scope="scope">
              {{ scope.row.employee ? scope.row.employee.empname : '/'  }}
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

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" width="1000px" @closed="clearForm">

      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="登陆账号" prop="usercode">
          <el-input v-model="form.usercode" placeholder="请输入用户登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="passwd">
          <el-input v-model="form.passwd" placeholder="请输入用户登录密码"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="form.username" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="绑定员工">
          <el-select v-model="form.empid" placeholder="选择员工">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="启用状态">
          <el-radio v-model="form.forbidden" :label="0">启用</el-radio>
          <el-radio v-model="form.forbidden" :label="1">关闭</el-radio>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-transfer v-model="form.comids" :data="comp"></el-transfer>
        </el-form-item>
        <el-form-item label="角色">
          <el-transfer v-model="form.roleids" :data="role"></el-transfer>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
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
        isModify: false,
        comp: [],
        role: [],
        form: {
          usercode: "",
          username: "",
          forbidden: 0,
          passwd: "",
          userid: '',
          empid: '',
          comids: [],
          roleids: []
        },
        list: null,
        listLoading: true,
        dialog: false,
        title: '',
        rules: {
          usercode: [
            { required: true, message: "请输入当前密码", trigger: "blur" }
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
    },
    methods: {
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/userlist?usercode=${this.form.usercode}&username=${this.form.username}&page.pageIndex=${this.pageIndex}`,
          method: "get"
        });

        this.list = rs.data;
        this.pageTotal = rs.total;
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
        this.title = isModify ? "编辑用户" : "添加用户"
        this.isModify = isModify;

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.userid = data.userid
        }

        this.initComp()
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

        Object.assign(this.form, rs.data[0])
      },
      async initComp(data) {
        let rs = await this.$http({
          url: `/admin/companyuserlist`,
          method: "get",
          params: {
            userid: "",
          },
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
          url: `/admin/roleuserlist`,
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