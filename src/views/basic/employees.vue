<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="form.order" placeholder="请输入工号"></el-input>
          <el-input v-model="form.order" placeholder="请输入姓名"></el-input>
          <el-button type="warning" class="com-btn">查询</el-button>
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
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          fit
          highlight-current-row
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column align="center" label="工号">
            <template slot-scope="scope">{{ scope.$index }}</template>
          </el-table-column>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">{{ scope.row.empname }}</template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="部门">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="属性">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="手机">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="邮箱">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="编号">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作" width="200">
            <template>
              <span class="detail handle" @click="dispatch(true)" style="margin-right: 20px">编辑</span>
              <!-- <span class="detail handle" @click="handle(true)">启用</span> -->
              <span class="detail handle" @click="handle(false)">停用</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageIndex"
            :page-size="pageSize" 
            layout="prev, pager, next, jumper"
            :total="pageTotal"
          ></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="公司">
          <span class="text">上海分公司</span>
        </el-form-item>
        <el-form-item label="工号" prop="account">
          <el-input v-model="form.account" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="password">
          <el-input v-model="form.password" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-select v-model="form.account" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工级别">
          <el-select v-model="form.account" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="form.account" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在职时间">
          <el-date-picker v-model="form2.plot" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.password" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.password" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="记录仪编号">
          <el-input v-model="form.password" placeholder="请输入记录仪编号"></el-input>
        </el-form-item>
        <el-form-item label="是否在册">
          <el-radio v-model="form.radio" label="1">在册</el-radio>
          <el-radio v-model="form.radio" label="2">非在册</el-radio>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="title2" :visible.sync="dialog2" class="dialog" :close-on-click-modal="false">
      <el-form :model="form2" :rules="rules" ref="form2" label-width="100px" class="dialog-form">
        <el-form-item label="公司">
          <span class="text">上海分公司</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span class="text">zoo</span>
        </el-form-item>
        <el-form-item label="离岗时间">
          <el-date-picker v-model="form2.plot" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="离岗原因">
          <el-input v-model="form2.password" placeholder="请填写原因"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取消</el-button>
        <el-button type="primary" @click="submit2">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  name: "Employees",
  data() {
    return {
      pageSize: 15,
      pageTotal: 0,
      pageIndex: 1,
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
        order: "",
        plot: "",
        account: "",
        password: "",
        radio: 1,
      },
      form2: {
        order: "",
        plot: "",
        account: "",
        password: "",
      },
      list: null,
      listLoading: true,
      dialog: false,
      dialog2: false,
      title: "",
      title2: "停用",
      rules: {
        account: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    pageIndex() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      let rs = await this.$http({
        url: `/admin/emplist`,
        method: "post",
        data: {
          forbidden: 0,
          pageIndex: this.pageIndex,
        },
      });
      console.log(rs);
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
    submit() {
      this.dialog = false;
      this.$refs.form.resetFields();
    },
    submit2() {
      this.dialog2 = false;
      this.$refs.form2.resetFields();
    },
    cancel() {
      this.dialog = false;
      this.$refs.form.resetFields();
    },
    cancel2() {
      this.dialog2 = false;
      this.$refs.form2.resetFields();
    },
    dispatch(isModify) {
      this.dialog = true;
      this.title = isModify ? "编辑员工" : "新增员工";
    },
    handle(flag) {
      if (flag) {
      } else {
        this.dialog2 = true;
      }
    },
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