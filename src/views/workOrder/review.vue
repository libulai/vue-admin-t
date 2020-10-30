<template>
  <div class="app-container">
    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 数据筛选</h3>
        </div>
        <div class="content-box">
          <div>
            <el-input v-model="search.ordercode" placeholder="请输入订单号"></el-input>
            <el-input v-model="search.address" placeholder="请输入小区地址"></el-input>
            <!-- <el-select v-model="search.status" placeholder="选择工单状态">
              <el-option v-for="item in statuss" :key="item.id" :label="item.value" :value="item.id">
              </el-option>
            </el-select> -->
             <el-input v-model="search.ownerphone" placeholder="业主电话"></el-input>
            <el-input v-model="search.trackusername" placeholder="服务专员"></el-input>
          </div>
          <div style="margin-top:20px">
            <el-date-picker v-model="search.startDate" type="date" placeholder="开始时间" value-format="yyyy-MM-dd">
            </el-date-picker>
            <el-date-picker v-model="search.endDate" type="date" placeholder="结束时间" value-format="yyyy-MM-dd">
            </el-date-picker>
           
            <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
            <el-button type="info" class="com-btn" @click="reset">重置</el-button>
          </div>
        </div>
      </div>

      <div class="content-wrap" style="margin-top:20px">
        <div class="content-title">
          <div>
            <el-button type="warning" class="com-btn" :disabled="btnState" @click="check">批量复核</el-button>
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
                {{ scope.row.processtime && scope.row.processtime.split(' ')[0]}}
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
                <span class="detail handle" @click="go(scope.row.orderid)">详情</span>
                <!-- <span class="handle" style="margin-left:30px">删除</span> -->
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

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
  import moment from 'moment'
  import { urlQueryChange, GetRequest, setLocalStorage, getLocalStorage } from '../../utils/searchQuery'

  export default {
    name: 'Review',
    data() {
      let tom = moment().add(15, 'days').format('YYYY-MM-DD')
      let yes = moment().add(-15, 'days').format('YYYY-MM-DD')
      return {
        pageSize: 10,
        pageTotal: 0,
        pageIndex: 1,
        btnState: true,
        selection: [],
        statuss: [{ id: 4, value: '已完成' }, { id: 5, value: '已复核' }],
        pttype: [],
        tracks: [],
        search: {
          startDate: yes,
          endDate: tom,
          address: '',
          ordercode: '',
          areaid: undefined,
          ownerphone: '',
          contacterphone: '',
          status: 4,
          trackusername: '',
        },
        form: {
          order: "",
          plot: "",
          orderState: "",
          time: "",
        },
        list: null,
        listLoading: true,
        reviewPage: true,
        num: 0
      };
    },
    watch: {
      pageIndex(index) {
        if (index) this.fetchData(index);
      },
      search: {
        deep: true,
        handler(val) {
          // urlQueryChange(val)
          setLocalStorage('review', val)
        }
      }
    },
    computed: {
      status(val) {
        return function (val) {
          const MAP = {
            4: '已完成', 5: '已复核'
          }
          return MAP[val]
        }
      }
    },
    created() {
      this.initDic()

      // if (!window.location.href.includes('?')) urlQueryChange(this.search)

      this.querysTransforSearch()

      this.fetchData();
    },
    methods: {
      querysTransforSearch() {
        let rs = getLocalStorage('review')
        if (rs) {
          for (let i in this.search) {
            this.search[i] = rs[i]
          }
        }
      },
      // queryTransforSearch() {
      //   console.log(window.location.href)
      //   let querys = GetRequest(window.location.href)

      //   for (let i in this.search) {
      //     if (querys[i] === 'undefined') querys[i] = undefined
      //     if (i == 'status') querys[i] = Number(querys[i])
      //     this.search[i] = querys[i]
      //   }
      // },
      reset() {
        let tom = moment().add(15, 'days').format('YYYY-MM-DD')
        let yes = moment().add(-15, 'days').format('YYYY-MM-DD')
        this.search = {
          startDate: yes,
          endDate: tom,
          address: '',
          ordercode: '',
          areaid: undefined,
          pttype: '',
          status: 4,
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
          url: `/kl/klorderchecklist`,
          method: "post",
          data: { ...this.search, pageIndex: this.pageIndex }
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
        this.$router.push({ name: `ReviewDetail`, query: { id, detailType: 2 } })
      },
      async check() {
        let rs = await this.$http({
          url: `/kl/doklordercheck?orderids=${this.selection.join(',')}&check=是`,
          method: "get"
        });

        if (rs.success == 'true') this.$message({
          message: '保存成功',
          type: 'success'
        })
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
        width: 18%;
        margin-right: 30px;
      }
    }
  }
</style>