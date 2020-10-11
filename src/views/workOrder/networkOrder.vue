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
          <el-select v-model="search.status" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
          <!-- <el-button class="com-btn">导出</el-button> -->
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" :disabled="btnState" @click="dialog = true">作废</el-button>
          <el-button type="info" class="com-btn" :disabled="btnState" @click="dialog2 = true">取消作废</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column align="center" label="订单号">
            <template slot-scope="scope">
              {{ scope.row.chatordercode }}
            </template>
          </el-table-column>
          <el-table-column label="客户名称" align="center">
            <template slot-scope="scope">
              {{ scope.row.ownername }}
            </template>
          </el-table-column>
          <el-table-column label="联系方式" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.ownerphone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="施工时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.processtime }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="客户地址" align="center">
            <template slot-scope="scope">
              {{ scope.row.communityname + scope.row.address}}
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
          <el-table-column align="center" prop="created_at" label="操作">
            <template slot-scope="scope">
              <span class="detail handle" @click="produce(scope.row)">生成工单</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="作废" :visible.sync="dialog" width="450px" class="dialog">
      <span>是否作废该订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="取消作废" :visible.sync="dialog2" width="450px" class="dialog">
      <span>是否取消作废该订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'NetworkOrder',
  data() {
    let tom = moment().add(1, 'days').format('YYYY-MM-DD')
    return {
      pageSize: 10,
      pageTotal: 0,
      pageIndex: 1,
      btnState: true,
      dialog: false,
      dialog2: false,
      selection: [],
      search: {
        startDate: tom,
        endDate: tom,
        status: 1, //1-制单 2-已登记 3-已作废
      },
      options: [
        {
          value: 1,
          label: "制单",
        },
        {
          value: 2,
          label: "已登记",
        },
        {
          value: 3,
          label: "已作废",
        },
      ],
      list: null,
      listLoading: true,
    };
  },
  watch: {
    pageIndex(index) {
      if (index) this.fetchData(index);
    },
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
  created() {
    this.fetchData();
  },
  methods: {
    produce(data) {
      this.$router.push({ name: `OrderDetailEdit`, query: { data:JSON.stringify(data), detailType: 3 } })
    },
    handleSelectionChange(val) {
      this.selection = val.map(i => i.chatorderid)
      this.btnState = val.length == 0
    },
    async fetchData() {
      this.listLoading = true;
      let rs = await this.$http({
        url: `kl/klwechatorderlist`,
        method: "post",
        data: {...this.search, pageIndex:this.pageIndex}
      });
      
      this.list = rs.data;
      this.pageTotal = rs.total;
      this.listLoading = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    async submit() {
      let rs = await this.$http({
        url: `/wechat/wechatcancelorder`,
        params: {
          chatorderids: this.selection.join(',')
        },
        method: "get"
      });

      if (rs.success == 'true') this.$message({
        message: '保存成功',
        type: 'success'
      })

      this.dialog = false
      this.fetchData()
    },
    async submit2() {
      let rs = await this.$http({
        url: `/wechat/wechatnocancelorder`,
        params: {
          chatorderids: this.selection.join(',')
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

::v-deep .dialog {
  .el-dialog {
    width: 450px !important;
  }
}
</style>