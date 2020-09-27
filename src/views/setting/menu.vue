<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-select v-model="search.menu" placeholder="请选择菜单">
            <el-option v-for="item in first" :key="item.menuid" :label="item.menuname" :value="item.menuid"></el-option>
          </el-select>
          <el-button type="warning" class="com-btn" @click="searchMenu">查询</el-button>
          <el-button type="info" class="com-btn" @click="reset">重置</el-button>
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加菜单</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="菜单名称">
            <template slot-scope="scope">
              {{ scope.row.menuname }}
            </template>
          </el-table-column>
          <el-table-column label="菜单级别" align="center">
            <template slot-scope="scope">
              {{ scope.row.menulevel -1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="菜单图标">
            <template slot-scope="scope">
              <span>{{ scope.row.menuicon }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="菜单url">
            <template slot-scope="scope">
              <span>{{ scope.row.menuurl? scope.row.menuurl: '/' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作">
            <template slot-scope="scope">
              <span class="detail handle" @click="dispatch(true, scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" width="1000px" @closed="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="菜单名称" prop="rolename">
          <el-input v-model="form.rolename" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="rolelevel">
          <el-input v-model.number="form.rolelevel" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="rolelevel">
          <i class="icon el-icon-s-help"></i>
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
    name: 'Menu',
    data() {
      return {
        search: {
          menu: ""
        },
        first: [],
        isModify: false,
        menus: [],
        buttons: [],
        form: {
          menuname: "",
          menuicon: '',
          pmenuid: 0,
          menuurl: '',
          menuinterface: ''
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
      reset() {
        this.search.menu = ''
      },
      searchMenu() {
        try {
          let l = this.first.filter(i => {
            if (i.menuid == this.search.menu) {
              return i
            }
          })
          this.list = l[0].subMenus
        } catch (error) {
          this.list = this.first
        }
      },
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/menurolelist`,
          method: "get"
        });

        this.list = rs.data;
        this.first = rs.data
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
          url: `/admin/${this.isModify ? 'domenumod' : 'domenunew'}`,
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
        this.title = isModify ? "编辑菜单" : "添加菜单"
        this.isModify = isModify;

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.menuid = data.menuid
        }
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/menudetail?menuid=${data.menuid}`,
          method: "get"
        });

        for (let i in this.form) {
          this.form[i] = rs.data[0][i]
        }

        // Object.assign(this.form, rs.data[0])
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

  .icon{
    font-size: 60px;
    color: #0b3190;
    cursor: pointer;
  }
</style>