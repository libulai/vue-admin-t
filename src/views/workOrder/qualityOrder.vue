<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="search.ordercode" placeholder="请输入订单号"></el-input>
          <el-input v-model="search.address" placeholder="请输入小区名称"></el-input>
          <el-select v-model="search.status" placeholder="选择工单状态">
            <el-option v-for="item in statuss" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
          </el-select>
          <el-input v-model="search.trackusername" placeholder="服务专员"></el-input>
        </div>
        <div style="margin-top:20px">
          <el-date-picker v-model="search.startDate" type="date" placeholder="开始时间" value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-date-picker v-model="search.endDate" type="date" placeholder="结束时间" value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-select v-model="search.pttype" placeholder="选择服务类型">
            <el-option v-for="item in pttype" :key="item.dicid" :label="item.dicvalue" :value="item.dicid">
            </el-option>
          </el-select>
          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
          <el-button type="info" class="com-btn" @click="reset">重置</el-button>
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" :disabled="btnState" @click="dialog1 = true">批量发放</el-button>
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
              {{ scope.row.address }}
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
              <!-- <span class="detail handle" style="margin-right: 10px">发放质保卡</span> -->
              <span class="detail handle" @click="go(scope.row.orderid)">详情</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog class="dialog" title="发放质保卡" :visible.sync="dialog1" width="30%">
      <span>您是否确认发放质保卡？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'QualityOrder',
  data() {
    let tom = moment().add(15, 'days').format('YYYY-MM-DD')
    let yes = moment().add(-15, 'days').format('YYYY-MM-DD')
    return {
      pageSize: 15,
      pageTotal: 0,
      pageIndex: 1,
      btnState: true,
      selection: [],
      dialog1: false,
      statuss: [{ id: 1, value: '已登记' }, { id: 2, value: '已派单' }, { id: 3, value: '正在服务' }, { id: 4, value: '已完成' }, { id: 5, value: '已复核' }, { id: 6, value: '已关闭' }, { id: 7, value: '时间已确认' }],
      pttype: [],
      tracks: [],
      search: {
        startDate: yes,
        endDate: tom,
        ordercode: '',
        pttype: '',
        ownerphone: '',
        contacterphone: '',
        areaid: '',
        address: '',
        status: '',
        trackusername: ''
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
    this.initDic()
  },
  methods: {
    reset() {
      let tom = moment().add(15, 'days').format('YYYY-MM-DD')
      let yes = moment().add(-15, 'days').format('YYYY-MM-DD')
      this.search = {
        startDate: yes,
        endDate: tom,
        address: '',
        ordercode: '',
        areaid: '',
        pttype: '',
        status: '',
        trackusername: '',
      }
    },
    async initDic() {
      let rs = await this.$http({
        url: `/admin/dictionarylist?dictype=40`,
        method: "get"
      });

      this.pttype = rs.data.map(i => {
        return {
          dicvalue: i.dicvalue,
          dicid: i.dicid
        }
      })
    },
    handleSelectionChange(val) {
      this.selection = val.map(i => i.orderid)
      this.btnState = val.length == 0
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    go(id) {
      this.$router.push({ name: `QualityOrderDetail`, query: { id, detailType: 6 } })
    },
    async submit() {
      this.dialog1 = false;

      let rs = await this.$http({
        url: `/kl/doklorderzbk?orderids=${this.selection.join(',')}`,
        method: "get"
      });

      if (rs.success == 'true') this.$message({
        message: '保存成功',
        type: 'success'
      })

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