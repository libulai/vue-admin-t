<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="search.commnuityname" placeholder="请输入小区名称"></el-input>
          <el-input v-model="search.formalname" placeholder="请输入正式名称"></el-input>
          <el-select v-model="search.areaid" placeholder="请选择区域">
            <el-option v-for="item in areas" :key="item.areaid" :label="item.areaname" :value="item.areaid"></el-option>
          </el-select>

          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
          <el-button type="info" class="com-btn" @click="reset">重置</el-button>
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加小区</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="小区名称">
            <template slot-scope="scope">{{ scope.row.communityname }}</template>
          </el-table-column>
          <el-table-column label="正式名称" align="center">
            <template slot-scope="scope">{{ scope.row.formalname }}</template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="助记码">
            <template slot-scope="scope">
              <span>{{ scope.row.mnemonic }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="区域">
            <template slot-scope="scope">
              <span>{{ scope.row.area.areaname }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="交房时间" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.deliverdate || '/' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="小区类型">
            <template slot-scope="scope">
              <span>{{ scope.row.communitytype}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="总户数">
            <template slot-scope="scope">
              <span>{{ scope.row.totalhouseholds}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作" width="200">
            <template slot-scope="scope">
              <span class="detail handle" @click="dispatch(true, scope.row)" style="margin-right: 20px">编辑</span>
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
        <el-form-item label="小区名称" prop="communityname">
          <el-input v-model="form.communityname" placeholder="请输入小区名称"></el-input>
        </el-form-item>
        <el-form-item label="正式名称" prop="formalname">
          <el-input v-model="form.formalname" placeholder="请输入正式名称"></el-input>
        </el-form-item>
        <el-form-item label="助记码" prop="mnemonic">
          <el-input v-model="form.mnemonic" placeholder="请输入助记码"></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="areaid">
          <el-select v-model="form.areaid" placeholder="请选择">
            <el-option v-for="item in areas" :key="item.areaid" :label="item.areaname" :value="item.areaid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交房时间" prop="deliverdate">
          <el-date-picker v-model="form.deliverdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH-mm-ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="小区类型" prop="communitytype">
          <el-input v-model="form.communitytype" placeholder="请输入小区类型"></el-input>
        </el-form-item>
        <el-form-item label="总户数" prop="totalhouseholds">
          <el-input v-model.number="form.totalhouseholds" placeholder="请输入总户数"></el-input>
        </el-form-item>
        <el-form-item label="服务户数" prop="pthouseholds">
          <el-input v-model.number="form.pthouseholds" placeholder="请输入服务户数"></el-input>
        </el-form-item>
        <el-form-item label="工装户数" prop="gzhouseholds">
          <el-input v-model.number="form.gzhouseholds" placeholder="请输入工装户数"></el-input>
        </el-form-item>
        <el-form-item label="已装户数" prop="yzhouseholds">
          <el-input v-model.number="form.yzhouseholds" placeholder="请输入已装户数"></el-input>
        </el-form-item>
        <el-form-item label="主要接单公司" prop="distributor">
          <el-input v-model="form.distributor" placeholder="请输入主要接单公司"></el-input>
        </el-form-item>
        <el-form-item label="补充属性" prop="bcsx">
          <el-input v-model="form.bcsx" placeholder="请输入补充属性"></el-input>
        </el-form-item>
        <el-form-item label="可用状态" prop="forbidden">
          <el-radio v-model="form.forbidden" :label="0">可用</el-radio>
          <el-radio v-model="form.forbidden" :label="1">不可用</el-radio>
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
  name: "Plot",
  data() {
    return {
      pageSize: 15,
      pageTotal: 0,
      pageIndex: 1,
      areas: [],
      search: {
        commnuityname: '',
        formalname: '',
        areaid: ''
      },
      selected: '',
      form: {
        communityname: '',
        mnemonic: '',
        areaid: '',
        deliverdate: '',
        totalhouseholds: '',
        pthouseholds: '',
        gzhouseholds: '',
        yzhouseholds: '',
        forbidden: 0,
        distributor: '',
        communitytype: '',
        formalname: '',
        bcsx: ''
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
        url: `/admin/arealist`,
        method: 'get'
      });

      this.areas = rs.data
    },
    async fetchData() {
      this.listLoading = true;
      let rs = await this.$http({
        url: `/admin/communitylist?commnuityname=${this.search.commnuityname}&depid=${this.search.depid}&areaid=${this.search.areaid}&page.pageIndex=${this.pageIndex}`,
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
        commnuityname: '',
        formalname: '',
        areaid: ''
      }
    },
    clearForm(n = '') {
      this.$refs[`form${n}`].resetFields();
    },
    async submit() {
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
    },
    cancel() {
      this.dialog = false;
      this.$refs.form.resetFields();
    },
    dispatch(isModify, data) {
      this.isModify = isModify;
      this.dialog = true;
      this.title = isModify ? "编辑员工" : "新增员工";

      if (this.isModify) {
        this.getDepInfos(data)
        this.form.communityid = data.communityid
      }
    },
    async getDepInfos(data) {
      let rs = await this.$http({
        url: `/admin/communitydetail?communityid=${data.communityid}`,
        method: "get"
      });

      for (let i in this.form) {
        this.form[i] = rs.data[0][i]
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
</style>