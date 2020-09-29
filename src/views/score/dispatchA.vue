<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-date-picker v-model="search.startDate" type="date" placeholder="开始时间" value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-date-picker v-model="search.endDate" type="date" placeholder="结束时间" value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-select v-model="search.status" placeholder="发放状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
          <!-- <el-button class="com-btn" @click="exportt">导出</el-button> -->
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" :disabled="btnState" @click="dispatch()">发放积分</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column align="center" label="订单号">
            <template slot-scope="scope">
              {{ scope.row.ordercode }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="技师名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.pageviews }}
            </template>
          </el-table-column>
          <el-table-column label="技师电话" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="积分" align="center">
            <template slot-scope="scope">
              {{ scope.row.scorea }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" align="center" label="备注">
            <template slot-scope="scope">
              {{ scope.row.orderdesc }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="发放状态">
            <template slot-scope="scope">
              <span>{{ scope.row.scoreastatus==1?'已发放':'未发放' }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" prop="created_at" label="发放类型">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="发放时间">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column> -->
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
            :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog class="dialog" title="积分发放确认" :visible.sync="dialog3" width="30%">
      <span>确定发放对应积分</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
  export default {
    name: 'DispatchA',
    data() {
      let tom = moment().add(15, 'days').format('YYYY-MM-DD')
      let yes = moment().add(-15, 'days').format('YYYY-MM-DD')
      return {
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        btnState: true,
        selection: [],
        search: {
          startDate: yes,
          endDate: tom,
          status: 0
        },
        options: [
          {
            value: 0,
            label: "未发放",
          },
          {
            value: 1,
            label: "已发放",
          },
        ],
        form: {
          orderids: "",
        },
        list: null,
        listLoading: true,
        dialog3: false,
      };
    },
    watch: {
      pageIndex(index) {
        if (index) this.fetchData(index);
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleSelectionChange(val) {
        this.selection = val.map(i => i.orderid)
        this.btnState = val.length == 0
      },
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/kl/klorderscorealist`,
          method: "post",
          data: this.search,
        });

        this.list = rs.data;
        this.pageTotal = rs.total;
        this.listLoading = false;
      },
      async exportt() {

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
      },
      async submit() {
        this.dialog3 = false;

        let rs = await this.$http({
          url: `/kl/doklordescoreasave?orderids=${this.selection.join(',')}`,
          method: "get"
        });

        if (rs.success == 'true') this.$message({
          message: '保存成功',
          type: 'success'
        })

        this.fetchData()
      },
      dispatch(isModify, data) {
        this.dialog3 = true;
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

  ::v-deep .dialog {
    .el-dialog {
      width: 450px !important;
    }
  }
</style>