<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加区域</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="区域名称">
            <template slot-scope="scope">{{ scope.row.areaname }}</template>
          </el-table-column>
          <el-table-column label="施工主管" align="center">
            <template slot-scope="scope">{{ scope.row.arrangeuserid1name }}</template>
          </el-table-column>
          <el-table-column align="center" label="验收主管">
            <template slot-scope="scope">
              <span>{{ scope.row.arrangeuserid2name }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="所属公司">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="启用状态">
            <template slot-scope="scope">
              <span>{{ scope.row.forbidden==0?'启用':'关闭' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <span class="detail handle" @click="dispatch(true, scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" @closed="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="区域名称" prop="areaname">
          <el-input v-model="form.areaname" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="施工主管" prop="arrangeuserid1">
          <el-select v-model="form.arrangeuserid1" placeholder="请选择">
            <el-option v-for="item in arrangeuserid1" :key="item.userid" :label="item.username" :value="item.userid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验收主管" prop="arrangeuserid2">
          <el-select v-model="form.arrangeuserid2" placeholder="请选择">
            <el-option v-for="item in arrangeuserid2" :key="item.userid" :label="item.username" :value="item.userid"></el-option>
          </el-select>
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
    name: "Area",
    data() {
      return {
        isModify: false,
        arrangeuserid1:[],
        arrangeuserid2:[],
        form: {
          areaname: "",
          arrangeuserid1: "",
          arrangeuserid2: "",
          // averagemeters: 0,
          forbidden: 0,
          areaid: 0
        },
        list: null,
        listLoading: true,
        dialog: false,
        title: "",
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
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/arealist?forbidden=-1`,
          method: "get",
        });

        this.list = rs.data;
        this.listLoading = false;
      },
      async submit() {
        this.dialog = false;
        let rs = await this.$http({
          url: `/admin/doareasave`,
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
      clearForm() {
        this.$refs.form.resetFields();
      },
      cancel() {
        this.dialog = false;
        this.$refs.form.resetFields();
      },
      dispatch(isModify, data) {
        this.isModify = isModify;
        this.dialog = true;
        this.title = isModify ? "编辑区域" : "添加区域";

        this.getAdmin();

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.areaid = data.areaid
        }
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/areadetail?areaid=${data.areaid}`,
          method: "get"
        });

        for (let i in this.form) {
          this.form[i] = rs.data[0][i]
        }
      },
      async getAdmin() {
        let rs = await this.$http({
          url: `/admin/arrangers`,
          method: "get"
        });

        this.arrangeuserid1 = this.arrangeuserid2 = rs.data
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