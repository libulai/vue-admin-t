<template>
  <div class="app-container">
    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 数据筛选</h3>
        </div>
        <div class="content-box">
          <div>
            <el-input v-model="search.customername" placeholder="请输入姓名"></el-input>
            <el-input v-model="search.contacterphone" placeholder="请输入联系电话"></el-input>
            <el-select v-model="search.customertype" placeholder="选择类型">
              <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="search.areaid" placeholder="选择区域">
              <el-option v-for="item in areas" :key="item.areaid" :label="item.areaname" :value="item.areaid"></el-option>
              </el-option>
            </el-select>
          </div>
          <div style="margin-top:20px">
            <el-date-picker v-model="search.startDate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-date-picker v-model="search.endDate" type="date" placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
            <!-- <el-input v-model="search.plot" placeholder="请输入维护业务员"></el-input> -->
            <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
            <el-button type="info" class="com-btn" @click="reset">重置</el-button>
          </div>
        </div>
      </div>

      <div class="content-wrap" style="margin-top:20px">
        <div class="content-title">
          <div>
            <el-button type="primary" class="com-btn" @click="dispatch(false)">添加客户</el-button>

            <el-button class="com-btn" disabled>批量删除</el-button>
          </div>
        </div>

        <div>
          <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column align="center" label="客户类型">
              <template slot-scope="scope">
                {{ scope.row.customertype }}
              </template>
            </el-table-column>
            <el-table-column label="客户名称" align="center">
              <template slot-scope="scope">
                {{ scope.row.customername }}
              </template>
            </el-table-column>
            <el-table-column label="联系人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.contacter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" align="center">
              <template slot-scope="scope">
                {{ scope.row.contacterphone }}
              </template>
            </el-table-column>
            <el-table-column label="会员卡号" align="center" min-width="200">
              <template slot-scope="scope">
                {{ scope.row.cardNum }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" min-width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.createtime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="历史贡献A分">
              <template slot-scope="scope">
                <span>{{ scope.row.historyscore }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单据贡献A分">
              <template slot-scope="scope">
                <span>{{ scope.row.totalscore }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="130">
              <template slot-scope="scope">
                <!-- <span class="detail handle" @click="dispatch" style="margin-right: 20px">详情</span> -->
                <span class="detail handle" @click="dispatch(true, scope.row)">编辑</span>
                <span class="detail handle" style="margin-left:20px">删除</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
              :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog big-form" :close-on-click-modal="false" width="1200px">
      <div class="wrap">
        <el-form :model="form" ref="form" label-width="130px" class="dialog-form" :inline="true">
          <h3>基本信息</h3>
          <el-form-item label="客户名称" prop="customername">
            <el-input v-model="form.customername" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="客户类型" prop="customertype">
            <el-select v-model="form.customertype" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="contacter">
            <el-input v-model="form.contacter" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop='contacterphone'>
            <el-input v-model="form.contacterphone" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop='birthday'>
            <el-input v-model="form.birthday" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="籍贯" prop='nativeplace'>
            <el-input v-model="form.nativeplace" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="地址" class="cust-item" prop='address'>
            <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="合作时间" prop='cooptime'>
            <el-date-picker v-model="form.cooptime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="历史试压情况" class="cust-item" prop='pthistorydesc'>
            <el-input v-model="form.pthistorydesc" placeholder="请填写"></el-input>
          </el-form-item>

          <h3 style="margin-top: 15px">补充信息</h3>
          <el-form-item label="会员卡号" prop='cardNum'>
            <el-input v-model="form.cardNum" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.order" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="form.workerstype" placeholder="请选择">
              <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="常合作经销商" prop='coopdealer'>
            <el-input v-model="form.coopdealer" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="常合作家装公司" prop='coopdec'>
            <el-input v-model="form.coopdec" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="工人数量" prop='workerscount'>
            <el-input v-model="form.workerscount" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="水工等级">
            <el-select v-model="form.order" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省/市/县" prop='ssx'>
            <el-cascader size="large" :options="ssxOptions" v-model="ssx" @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="身份证" prop='cardid'>
            <el-input v-model="form.cardid" placeholder="请填写"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { regionData, CodeToText, TextToCode  } from 'element-china-area-data'
  export default {
    name: 'Customer',
    data() {
      return {
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        search: {
          startDate: '',
          contacterphone: '',
          customertype: '',
          areaid: '',
          customername: '',
          yzxx: 0,
          endDate: ''
        },
        ssxOptions: regionData,
        ssx: [],
        areas: [],
        options: [
          {
            value: "业主",
          },
          {
            value: "水工",
          },
          {
            value: "经销商",
          },
          {
            value: "工长",
          },
          {
            value: "装饰公司",
          },
        ],
        types: [{
          value: '工长'
        }, {
          value: '水工'
        }, {
          value: '安装工'
        }],
        form: {
          customertype: "",
          customername: "",
          contacter: "",
          contacterphone: "",
          // firstname: '',
          nativeplace: '',
          cooptime: '',
          pthistorydesc: '',
          cardid: '',
          workerstype: '',
          coopdealer: '',
          coopdec: '',
          workerscount: '',
          address:'',
          cardNum:'',
          birthday:'',

          economize: '',
          city: '',
          county: ''
        },
        dialog: false,
        title: '新增客户',
        list: null,
        listLoading: true
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
          url: `/admin/customerlist?startDate=${this.search.startDate}&endDate=${this.search.endDate}&contacterphone=${this.search.contacterphone}&customertype=${this.search.customertype}&areaid=${this.search.areaid}&customername=${this.search.customername}&yzxx=${this.search.yzxx}&page.pageIndex=${this.pageIndex}`,
          method: "get"
        });

        this.list = rs.data;
        this.pageTotal = rs.total;
        this.listLoading = false;
      },
      reset() {
        this.search = {
          startDate: '',
          contacterphone: '',
          customertype: '',
          areaid: '',
          customername: '',
          yzxx: 0,
          endDate: ''
        }
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
      },
      dispatch(isModify, data) {
        this.isModify = isModify;
        this.dialog = true;
        this.title = isModify ? "编辑客户" : "新增客户";

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.customerid = data.customerid
        }
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/customerdetail?customerid=${data.customerid}`,
          method: "get"
        });

        for (let i in this.form) {
          this.form[i] = rs.data[0][i]
        }
        this.handlessx()
      },
      handlessx(){
        let form = this.form
        this.ssx = [TextToCode[form.economize].code, TextToCode[form.economize][form.city].code, TextToCode[form.economize][form.city][form.county].code]
      },
      cancel() {
        this.dialog = false;
        this.$refs.form.resetFields();
      },
      clearForm() {
        this.$refs.form.resetFields();
      },
      handleChange() {
        let form = this.form;
        form.economize = CodeToText[this.ssx[0]]
        form.city = CodeToText[this.ssx[1]]
        form.county = CodeToText[this.ssx[2]]
      },
      async submit() {
        this.dialog = false;

        let rs = await this.$http({
          url: `/admin/${this.isModify ? 'docustomermod' : 'docustomernew'}`,
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
        width: 18%;
        margin-right: 30px;
      }
    }
  }
</style>