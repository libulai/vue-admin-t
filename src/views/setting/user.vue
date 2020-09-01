<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="form.order" placeholder="请输入姓名"></el-input>
          <el-input v-model="form.order" placeholder="请输入登录账号"></el-input>
          <el-button type="warning" class="com-btn">查询</el-button>
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
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column align="center" label="登录账号">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="用户姓名" align="center">
            <template slot-scope="scope">
              {{ scope.row.pageviews }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="绑定员工" width="380">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="启用状态">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作">
            <template>
              <span class="detail handle" @click="dispatch(true)">编辑</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" width="1000px">

      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="登陆账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入用户登录账号"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入用户登录密码"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="form.order" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="绑定员工">
          <el-select v-model="form.account" placeholder="选择员工">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态">
          <el-radio v-model="form.radio" label="1">备选项</el-radio>
          <el-radio v-model="form.radio" label="2">备选项</el-radio>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-transfer v-model="value" :data="data"></el-transfer>
        </el-form-item>
        <el-form-item label="角色">
          <el-transfer v-model="value" :data="data"></el-transfer>
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
  import { getList } from "@/api/table";

  export default {
    data() {
      return {
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
          radio: 1
        },
        list: null,
        listLoading: true,
        currentPage: 10,
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
    methods: {
      fetchData() {
        this.listLoading = true;
        getList().then((response) => {
          this.list = response.data.items;
          this.listLoading = false;
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      submit() {
        this.dialog = false;
        this.$refs.form.resetFields()
      },
      cancel() {
        this.dialog = false;
        this.$refs.form.resetFields()
      },
      dispatch(isModify) {
        this.dialog = true;
        this.title = isModify ? "编辑用户" : "添加用户"
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