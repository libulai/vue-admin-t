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
            <template slot-scope="scope">{{ scope.row.productname }}</template>
          </el-table-column>
          <el-table-column label="规格" align="center">
            <template slot-scope="scope">{{ scope.row.specs }}</template>
          </el-table-column>
          <el-table-column align="center" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.productdesc }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span>{{ scope.row.productnum }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.forbidden==0?'可用':'停用' }}</span>
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
        <el-form-item label="名称" prop="productid">
          <!-- <el-select v-model="form.productid" placeholder="请选择（可搜索）" filterable>
            <el-option v-for="item in products" :key="item.id" :label="item.productname" :value="item.id" @click.native="changeVal(item)"></el-option>
          </el-select> -->
          <el-input placeholder="选择产品" v-model="productInfo.productname" class="input-with-select select-btn" disabled>
            <el-button slot="append" @click="dialog2Open">请选择</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="规格" prop="specs">
          <el-input v-model="productInfo.specs" disabled placeholder="自动解析"></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="productnum">
          <el-input v-model="form.productnum" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="productdesc">
          <el-input v-model="form.productdesc" placeholder="请输入"></el-input>
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

    <el-dialog title="选择产品" :visible.sync="dialog2" width="400px" class="dialog2" :close-on-click-modal="false" v-if="dialog2" @closed="clearSearch">
      <div class="select-dialog">
        <div style="display: flex;margin-bottom: 20px;">
          <el-input v-model="searchname" placeholder="名称" style="margin-right: 20px"></el-input>
          <el-button type="warning" class="com-btn" @click="dialog2Open">查询</el-button>
        </div>

        <el-table v-loading="listLoading2" :data="list2" element-loading-text="Loading" fit highlight-current-row border @current-change="selectItem">
          <el-table-column align="center" label="编号">
            <template slot-scope="scope">{{ scope.row.materialcode }}</template>
          </el-table-column>
          <el-table-column align="center" label="名称">
            <template slot-scope="scope">{{ scope.row.productname }}</template>
          </el-table-column>
          <el-table-column align="center" label="规格">
            <template slot-scope="scope">{{ scope.row.specs }}</template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange2" :current-page.sync="pageIndex2" :page-size="pageSize" layout="prev, pager, next" :total="pageTotal2"></el-pagination>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
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
      pageIndex2: 1,
      pageTotal2: 0,
      searchname: '',
      products: [],
      dialog2: false,
      productInfo: {},
      isModify: false,
      form: {
        productnum: "",
        productdesc: "",
        forbidden: 0,
        productid: ""
      },
      list: null,
      list2: null,
      listLoading: true,
      listLoading2: true,
      dialog: false,
      title: "",
      rules: {
        productid: [
          { required: true, message: "请选择物料", trigger: "blur" },
        ],
        productnum: [
          { required: true, message: "请输入序列号", trigger: "blur" },
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
    clearSearch() {
      this.searchname = ''
    },
    async fetchData() {
      this.listLoading = true;
      let rs = await this.$http({
        url: `/admin/productkldictionarylist?forbidden=-1&page.pageIndex=${this.pageIndex}`,
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
    handleCurrentChange2(val) {
      this.pageIndex2 = val;
    },
    changeVal(data) {
      this.productInfo = data
    },
    async dialog2Open() {
      this.dialog2 = true
      this.listLoading2 = true;
      let rs = await this.$http({
        url: `/admin/productklnewlist?productname=${this.searchname}&page.pageIndex=${this.pageIndex2}`,
        method: 'get'
      });

      this.list2 = rs.data;
      this.pageTotal2 = rs.total;
      this.listLoading2 = false;
    },
    selectItem(val) {
      if (!val) return
      this.dialog2 = false
      this.form.productid = val.id
      this.productInfo.productname = val.productname
      this.productInfo.specs = val.specs
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.dialog = false;
          let rs = await this.$http({
            url: `/admin/${this.isModify ? 'doproductkldictionarymod' : 'doproductkldictionarynew'}`,
            method: "post",
            data: this.form
          });

          if (rs.success == 'true') this.$message({
            message: '保存成功',
            type: 'success'
          })

          this.$refs.form.resetFields();
          this.productInfo = {}
          this.fetchData()
        }
      });
    },
    cancel() {
      this.dialog = false;
      this.$refs.form.resetFields();
      this.productInfo = {}
    },
    clearForm() {
      this.$refs.form.resetFields();
      this.productInfo = {}
      this.searchname = ''
    },
    dispatch(isModify, data) {
      this.isModify = isModify;
      this.dialog = true;
      this.title = isModify ? "编辑物料" : "添加物料";

      if (this.isModify) {
        this.getDepInfos(data)
        this.form.id = data.id
      }

      this.initProducts()
    },
    async initProducts() {
      let rs = await this.$http({
        url: `/admin/productkllist`,
        method: 'get'
      });

      this.products = rs.data
    },
    async getDepInfos(data) {
      let rs = await this.$http({
        url: `/admin/productkldictionarydetail?id=${data.id}`,
        method: "get"
      });

      for (let i in this.form) {
        this.form[i] = rs.data[0][i]
      }

      this.productInfo = {
        productname: rs.data[0].productname,
        specs: rs.data[0].specs
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

::v-deep .dialog2 {
  .el-dialog {
    width: 800px !important;
  }
}
</style>