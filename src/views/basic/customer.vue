<template>
  <div class="app-container">

    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 数据筛选</h3>
        </div>
        <div class="content-box">
          <div>
            <el-input v-model="form.order" placeholder="请输入姓名"></el-input>

            <el-input v-model="form.plot" placeholder="请输入联系电话"></el-input>

            <el-select v-model="form.orderState" placeholder="选择类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="form.orderState" placeholder="选择区域">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div style="margin-top:20px">
            <el-date-picker v-model="form.plot" type="date" placeholder="创建日期">
            </el-date-picker>

            <el-input v-model="form.plot" placeholder="请输入维护业务员"></el-input>

            <el-button type="warning" class="com-btn">查询</el-button>
          </div>
        </div>
      </div>

      <div class="content-wrap" style="margin-top:20px">
        <div class="content-title">
          <div>
            <el-button type="primary" class="com-btn">添加客户</el-button>

            <el-button class="com-btn" disabled>批量删除</el-button>
          </div>
        </div>

        <div>
          <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column align="center" label="客户类型">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="客户名称" align="center">
              <template slot-scope="scope">
                {{ scope.row.pageviews }}
              </template>
            </el-table-column>
            <el-table-column label="联系人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" align="center">
              <template slot-scope="scope">
                {{ scope.row.pageviews }}
              </template>
            </el-table-column>
            <el-table-column label="会员卡号" align="center">
              <template slot-scope="scope">
                {{ scope.row.pageviews }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="历史贡献A分">
              <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单据贡献A分">
              <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="180">
              <template>
                <span class="detail handle" @click="dispatch" style="margin-right: 20px">详情</span>
                <span class="detail handle" @click="dispatch(true)">编辑</span>
                <span class="handle" style="margin-left:20px">删除</span>
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
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog big-form" :close-on-click-modal="false" width="1200px">
      <div class="wrap">
        <el-form :model="form" ref="form" label-width="130px" class="dialog-form" :inline="true">
          <h3>基本信息</h3>
          <el-form-item label="客户名称">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-select v-model="form.order" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="地址" class="cust-item">
            <el-input v-model="form.password" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="合作时间">
            <el-date-picker v-model="form.plot" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="历史试压情况" class="cust-item">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>

          <h3 style="margin-top: 15px">补充信息</h3>
          <el-form-item label="主要出货渠道">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="form.order" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="form.order" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="常合作经销商">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="常合作家装公司">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="工人数量">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="水工等级">
            <el-select v-model="form.order" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省/市/县">
            <el-select v-model="form.order" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="form.password" placeholder="请填写"></el-input>
          </el-form-item>
        </el-form>


      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getList } from "@/api/table";

  export default {
    name: 'Customer',
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
          orderState: "",
          time: "",
        },
        dialog: false,
        title: '新增客户',
        list: null,
        listLoading: true,
        currentPage: 10
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
      dispatch() {
        this.dialog = true
      },
      cancel() {
        this.dialog = false;
        this.$refs.form.resetFields()
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