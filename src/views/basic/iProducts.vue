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
          <el-table-column align="center" label="编码">
            <template slot-scope="scope">{{ scope.row.materialcode }}</template>
          </el-table-column>
          <el-table-column align="center" label="名称">
            <template slot-scope="scope">{{ scope.row.productname }}</template>
          </el-table-column>
          <el-table-column align="center" label="类别">
            <template slot-scope="scope">{{ scope.row.type }}</template>
          </el-table-column>
          <el-table-column align="center" label="属性">
            <template slot-scope="scope">{{ scope.row.attribute }}</template>
          </el-table-column>
          <el-table-column label="规格" align="center">
            <template slot-scope="scope">{{ scope.row.specs }}</template>
          </el-table-column>
          <el-table-column align="center" label="单位">
            <template slot-scope="scope">{{ scope.row.unit }}</template>
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

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" @closed="clearForm">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="物料编码" prop="materialcode">
          <el-input v-model="form.materialcode" placeholder="请输入物料编码"></el-input>
        </el-form-item>
        <el-form-item label="物料名称" prop="productname">
          <el-input v-model="form.productname" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="物料类别" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option v-for="item in types" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料属性" prop="attribute">
          <el-select v-model="form.attribute" placeholder="请选择">
            <el-option v-for="item in attributes" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料规格" prop="specs">
          <el-input v-model="form.specs" placeholder="请输入物料规格"></el-input>
        </el-form-item>
        <el-form-item label="物料单位" prop="unit">
          <el-select v-model="form.unit" placeholder="请选择">
            <el-option v-for="item in units" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
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
        isModify: false,
        form: {
          productname: "",
          specs: "",
          attribute: "",
          unit: "",
          type: "",
          materialcode: ""
        },
        types: ['防水普通-通用', '防水普通-柔韧', '防水多次通用', '防水多彩-柔韧', '堵漏宝', '防水辅料', '防水其他', '墙固、地固'],
        attributes: ['主材', '辅材'],
        units: ['桶', '包', '套', '组', '罐', '个', '只'],
        list: null,
        listLoading: true,
        dialog: false,
        title: "",
        rules: {
          productname: [
            { required: true, message: "请输入物料名称", trigger: "blur" },
          ],
          specs: [
            { required: true, message: "请输入物料规格", trigger: "blur" },
          ],
          attribute: [
            { required: true, message: "请选择物料属性", trigger: "blur" },
          ],
          unit: [
            { required: true, message: "请选择物料单位", trigger: "blur" },
          ],
          type: [
            { required: true, message: "请选择物料类别", trigger: "blur" },
          ],
          materialcode: [
            { required: true, message: "请输入物料编码", trigger: "blur" },
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
          url: `/admin/productkllist?page.pageIndex=${this.pageIndex}`,
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
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.dialog = false;
            let rs = await this.$http({
              url: `/admin/${this.isModify ? 'doproductklmod' : 'doproductklnew'}`,
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
        this.title = isModify ? "编辑物料" : "添加物料";

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.id = data.id
        }
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/productkldetail?id=${data.id}`,
          method: "get"
        });

        for (let i in this.form) {
          this.form[i] = rs.data[0][i]
        }

        // this.form.deptcode = Number(this.form.deptcode)
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