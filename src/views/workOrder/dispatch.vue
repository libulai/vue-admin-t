<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="form.order" placeholder="请输入订单号"></el-input>
          <el-input v-model="form.plot" placeholder="请输入小区名称"></el-input>
          <el-select v-model="form.orderState" placeholder="选择工单状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="form.orderState" placeholder="选择区域">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top:20px">
          <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <el-select v-model="form.orderState" placeholder="选择工单类型">
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
          <el-button class="com-btn" type="primary" :disabled="btnState">分派</el-button>
          <el-button type="warning" class="com-btn" :disabled="btnState" @click='dialog3 = true'>派单</el-button>
          <el-button type="info" class="com-btn" :disabled="btnState">取消派单</el-button>
        </div>

        <div>
          <!-- todo -->
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column align="center" label="订单号">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="客户名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.pageviews }}
            </template>
          </el-table-column>
          <el-table-column label="联系方式" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上门时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.pageviews }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="客户地址" min-width="360" align="center">
            <template slot-scope="scope">
              {{ scope.row.title }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="服务类型">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="服务人员">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
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
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="submit1">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 取消派单 -->
    <el-dialog title="取消派单" :visible.sync="dialog2" width="450px">
      <span>是否取消派单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 派单 -->
    <el-dialog title="派单" :visible.sync="dialog3" width="450px">
      <span>是否进行派单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button type="primary" @click="submit3">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Dispatch",
    data() {
      return {
        pageSize: 15,
        pageTotal: 0,
        pageIndex: 1,
        btnState: true,
        dialog1: false,
        dialog2: false,
        dialog3: false,
        selection: [],
        search: {
          startDate: '',
          endDate: '',
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
          order: "",
          plot: "",
          orderState: "",
          time: "",
        },
        list: null,
        listLoading: true,
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
        this.selection = val.map(i => i.id)
        this.btnState = val.length == 0
      },
      async fetchData() {
        console.log(this.form.time)
        this.listLoading = true;
        let rs = await this.$http({
          url: `/kl/arrangeklorderlist?startDate=${this.search.startDate}&trackusername=${this.search.trackusername}&status=${this.search.status}&pttype=${this.search.pttype}&areaid=${this.search.areaid}&ordercode=${this.search.ordercode}&endDate=${this.search.endDate}&address=${this.search.address}&page.pageIndex=${this.pageIndex}`,
          method: "get"
        });

        this.list = rs.data;
        this.pageTotal = rs.total;
        this.listLoading = false;
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
        width: 20%;
        margin-right: 30px;
      }
    }
  }
</style>