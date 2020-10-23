<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <!-- <el-input v-model="form.empname" placeholder="请输入工号"></el-input> -->
          <el-select v-model="search.depid" placeholder="请选择部门">
            <el-option v-for="item in deps" :key="item.deptid" :label="item.deptname" :value="item.deptid"></el-option>
          </el-select>
          <el-input v-model="search.empname" placeholder="请输入姓名"></el-input>

          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
          <el-button type="info" class="com-btn" @click="reset">重置</el-button>
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加员工</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="工号">
            <template slot-scope="scope">{{ scope.row.empcode }}</template>
          </el-table-column>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">{{ scope.row.empname }}</template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="部门">
            <template slot-scope="scope">
              <span>{{ scope.row.dept.deptname }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="属性">
            <template slot-scope="scope">
              <span>{{ scope.row.empattr }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="手机">
            <template slot-scope="scope">
              <span>{{ scope.row.mobilephone || '/' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="邮箱">
            <template slot-scope="scope">
              <span>{{ scope.row.email || '/'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="编号">
            <template slot-scope="scope">
              <span>{{ scope.row.jlybh || '/'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作" width="200">
            <template slot-scope="scope">
              <span class="detail handle" @click="dispatch(true, scope.row)" style="margin-right: 20px">编辑</span>
              <span class="" v-if="scope.row.forbidden==1">启用</span>
              <span class="detail handle" @click="handle(false, scope.row.empid)" v-if="scope.row.forbidden==0">停用</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
            :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" @closed="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <!-- <el-form-item label="公司">
          <span class="text">上海分公司</span>
        </el-form-item> -->
        <el-form-item label="部门" prop="deptid">
          <el-select v-model="form.deptid" placeholder="请选择">
            <el-option v-for="item in deps" :key="item.deptid" :label="item.deptname" :value="item.deptid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="empcode">
          <el-input v-model="form.empcode" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="empname">
          <el-input v-model="form.empname" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="属性" prop="empattr">
          <el-select v-model="form.empattr" placeholder="请选择">
            <el-option v-for="item in attrs" :key="item.id" :label="item.val" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工级别" prop="emplevel">
          <el-select v-model="form.emplevel" placeholder="请选择">
            <el-option v-for="item in levels" :key="item.id" :label="item.val" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="form.education" placeholder="请选择">
            <el-option v-for="item in edus" :key="item.id" :label="item.val" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在职时间" prop="hiredate">
          <el-date-picker v-model="form.hiredate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机" prop="mobilephone">
          <el-input v-model="form.mobilephone" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="记录仪编号" prop="jlybh">
          <el-input v-model="form.jlybh" placeholder="请输入记录仪编号"></el-input>
        </el-form-item>
        <el-form-item label="是否在册" prop="register">
          <el-radio v-model="form.register" :label="0">在册</el-radio>
          <el-radio v-model="form.register" :label="1">非在册</el-radio>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="title2" :visible.sync="dialog2" class="dialog" :close-on-click-modal="false" @closed="clearForm(2)">
      <el-form :model="form2" :rules="rules2" ref="form2" label-width="100px" class="dialog-form">
        <!-- <el-form-item label="公司">
          <span class="text">上海分公司</span>
        </el-form-item> -->
        <!-- <el-form-item label="姓名">
          <span class="text">zoo</span>
        </el-form-item> -->
        <el-form-item label="离岗时间" prop="leavedate">
          <el-date-picker v-model="form2.leavedate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="离岗原因" prop="leavereason">
          <el-input v-model="form2.leavereason" placeholder="请填写原因"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取消</el-button>
        <el-button type="primary" @click="submit2">保存</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="提示" :visible.sync="dialog3" width="30%">
      <span>确定启用吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button type="primary" @click="start">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
  export default {
    name: "Employees",
    data() {
      return {
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        deps: [],
        attrs: [{ id: 1, val: '服务人员' }, { id: 2, val: '服务主管' }, { id: 3, val: '内情人员' }, { id: 4, val: '分销商' }, { id: 5, val: '业务员' }, { id: 6, val: '装饰公司' }],
        levels: [{ id: 1, val: '部长' }, { id: 2, val: '主管' }, { id: 3, val: '负责人（产业未下发文件）' }, { id: 4, val: '组长' }, { id: 5, val: '高级技师' }, { id: 6, val: '中级技师' }, { id: 7, val: '初级技师' }, { id: 8, val: '见习技师' }, { id: 9, val: '内勤主管' }, { id: 10, val: '服务内勤' }],
        edus: [{ id: 1, val: '初中' }, { id: 2, val: '高中/中专' }, { id: 3, val: '大专' }, { id: 4, val: '本科' }, { id: 5, val: '硕士' }, { id: 6, val: '博士及以上' }, { id: 7, val: '其他' }],
        search: {
          depid: '',
          empname: ''
        },
        selected: '',
        form: {
          empcode: "",
          // empid: "",
          empname: "",
          deptid: "",
          empattr: '',
          emplevel: '',
          education: '',
          hiredate: '',
          mobilephone: '',
          forbidden: 0,
          email: '',
          // destempid: '',
          register: 0,
          jlybh: '',
        },
        form2: {
          empid: "",
          leavereason: "",
          leavedate: "",
        },
        list: null,
        listLoading: true,
        dialog: false,
        dialog2: false,
        dialog3: false,
        title: "",
        title2: "停用",
        rules: {
          deptid: [
            { required: true, message: "请选择部门", trigger: "blur" },
          ],
          empcode: [
            { required: true, message: "请输入工号", trigger: "blur" },
          ],
          empname: [
            { required: true, message: "请输入姓名", trigger: "blur" },
          ],
          empattr: [
            { required: true, message: "请选择属性", trigger: "blur" },
          ],
          emplevel: [
            { required: true, message: "请选择级别", trigger: "blur" },
          ],
          education: [
            { required: true, message: "请选择学历", trigger: "blur" },
          ],
          hiredate: [
            { required: true, message: "请选择在职时间", trigger: "blur" },
          ]
        },
        rules2: {
          leavedate: [
            { required: true, message: "请选择日期", trigger: "blur" },
          ],
          leavereason: [
            { required: true, message: "请填写原因", trigger: "blur" },
          ]
        },
      };
    },
    watch: {
      pageIndex(index) {
        if (index) this.fetchData(index);
      },
    },
    created() {
      this.fetchData();
      this.initDeps();
    },
    methods: {
      async initDeps() {
        let rs = await this.$http({
          url: `/admin/departmentlist`,
          method: 'get',
          params: {
            forbidden: -1
          },
        });

        this.deps = rs.data
      },
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/emplist?empname=${this.search.empname}&deptid=${this.search.depid}&forbidden=-1&page.pageIndex=${this.pageIndex}`,
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
      reset() {
        this.search = {
          depid: '',
          empname: ''
        }
      },
      clearForm(n = '') {
        this.$refs[`form${n}`].resetFields();
      },
      async submit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.dialog = false;

            let rs = await this.$http({
              url: `/admin/${this.isModify ? 'doempmod' : 'doempnew'}`,
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
      async submit2() {
        this.$refs.form2.validate(async (valid) => {
          if (valid) {
            this.dialog2 = false;

            let rs = await this.$http({
              url: `/admin/doempforbidden`,
              method: "post",
              data: this.form2
            });

            if (rs.success == 'true') this.$message({
              message: '保存成功',
              type: 'success'
            })

            this.$refs.form2.resetFields();
            this.fetchData()
          }
        });

      },
      cancel() {
        this.dialog = false;
        this.$refs.form.resetFields();
      },
      cancel2() {
        this.dialog2 = false;
        this.$refs.form2.resetFields();
      },
      dispatch(isModify, data) {
        this.isModify = isModify;
        this.dialog = true;
        this.title = isModify ? "编辑员工" : "新增员工";

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.empid = data.empid
        }
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/empdetail?empid=${data.empid}`,
          method: "get"
        });

        for (let i in this.form) {
          this.form[i] = rs.data[0][i]
        }
      },
      handle(flag, id) {
        if (flag) {
          this.dialog3 = true
        } else {
          this.dialog2 = true;
          this.form2.empid = id
        }
      },
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