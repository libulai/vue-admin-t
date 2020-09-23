<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="search.ordercode" placeholder="请输入订单号"></el-input>
          <el-input v-model="search.plot" placeholder="请输入小区名称"></el-input>
          <el-select v-model="search.orderState" placeholder="选择工单状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form.orderState" placeholder="选择区域">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top:20px">
          <!-- <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> -->
          <el-date-picker v-model="search.startDate" type="date" placeholder="开始时间" value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-date-picker v-model="search.endDate" type="date" placeholder="结束时间" value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-select v-model="search.orderState" placeholder="选择工单类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
          <el-button type="info" class="com-btn">重置</el-button>
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" :disabled="btnState" @click="dialog1Click">分派</el-button>
          <el-button type="warning" class="com-btn" :disabled="btnState" @click='dialog3 = true'>派单</el-button>
          <el-button type="info" class="com-btn" :disabled="btnState" @click='dialog2 = true'>取消派单</el-button>
        </div>

        <div>
          <!-- todo -->
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column align="center" label="订单号" min-width="110">
            <template slot-scope="scope">
              {{ scope.row.ordercode }}
            </template>
          </el-table-column>
          <el-table-column label="客户名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.customer.customername }}
            </template>
          </el-table-column>
          <el-table-column label="联系方式" align="center" min-width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.customer.contacterphone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上门时间" align="center" min-width="120">
            <template slot-scope="scope">
              {{ scope.row.reservedate }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="客户地址" min-width="250" align="center">
            <template slot-scope="scope">
              {{ scope.row.customer.address }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="服务类型">
            <template slot-scope="scope">
              <span>{{ scope.row.pttype }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="状态">
            <template slot-scope="scope">
              <span>{{ status(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="服务人员">
            <template slot-scope="scope">
              <span>{{ scope.row.trackuser ? scope.row.trackuser.username : '/'}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作">
            <template>
              <span class="detail handle">详情</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
            :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <!-- 分派 -->
    <el-dialog title="分派" :visible.sync="dialog1" width="550px">
      <el-form :model="form" :rules="rules3" ref="form" label-width="150px" class="dialog3-ruleForm">
        <el-form-item label="选择人员" prop="scorea">
          <el-select v-model="form.trackuserid" placeholder="选择">
            <el-option v-for="item in tracks" :key="item.userid" :label="item.username" :value="item.userid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit1">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 取消派单 -->
    <el-dialog title="取消派单" :visible.sync="dialog2" width="450px" class="dialog">
      <span>是否取消派单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 派单 -->
    <el-dialog title="派单" :visible.sync="dialog3" width="450px" class="dialog">
      <span>是否进行派单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button type="primary" @click="submit3">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "Dispatch",
    data() {
      let tom = moment().add(1, 'days').format('YYYY-MM-DD')
      return {
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        btnState: true,
        dialog1: false,
        dialog2: false,
        dialog3: false,
        selection: [],
        tracks: [],
        search: {
          startDate: tom,
          endDate: tom,
          address: '',
          ordercode: '',
          areaid: '',
          pttype: '',
          status: '',
          trackusername: '',
        },
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
          dispatchorderids: "",
          trackuserid: ''
        },
        list: null,
        listLoading: true,
      };
    },
    computed: {
      status(val) {
        return function (val) {
          const MAP = {
            1: '已登记', 2: '已派单', 3: '正在服务',
            4: '已完成', 5: '已复核', 6: '已关闭', 22: '时间已确认'
          }
          return MAP[val]
        }
      }
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
      cancel() {
        this.$refs.form.resetFields();
      },
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/kl/arrangeklorderlist?startDate=${this.search.startDate}&trackusername=${this.search.trackusername}&status=${this.search.status}&pttype=${this.search.pttype}&areaid=${this.search.areaid}&ordercode=${this.search.ordercode}&endDate=${this.search.endDate}&address=${this.search.address}&page.pageIndex=${this.pageIndex}`,
          method: "get"
        });

        this.list = rs.data;
        this.pageTotal = rs.total;
        this.listLoading = false;
      },
      async dialog1Click() {
        this.dialog1 = true
        let rs = await this.$http({
          url: `/admin/trackers`,
          method: "get"
        });

        this.tracks = rs.data
      },
      async submit3() {
        let rs = await this.$http({
          url: `/kl/klorderdispatch`,
          params: {
            dispatchorderids: this.selection.join(',')
          },
          method: "get"
        });

        if (rs.success == 'true') this.$message({
          message: '保存成功',
          type: 'success'
        })

        this.dialog3 = false
        this.fetchData()
      },
      async submit2() {
        let rs = await this.$http({
          url: `/kl/klorderdispatchcancel`,
          params: {
            dispatchorderids: this.selection.join(',')
          },
          method: "get"
        });

        if (rs.success == 'true') this.$message({
          message: '保存成功',
          type: 'success'
        })

        this.dialog2 = false
        this.fetchData()
      },
      async submit1() {
        let rs = await this.$http({
          url: `/kl/klorderarrangesave`,
          params: {
            dispatchorderids: this.selection.join(','),
            trackuserid: this.form.trackuserid
          },
          method: "get"
        });

        if (rs.success == 'true') this.$message({
          message: '保存成功',
          type: 'success'
        })

        this.dialog1 = false
        this.$refs.form.resetFields();
        this.fetchData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
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
        /* width: 20%; */
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