<template>
  <div class="app-container">

    <div v-if="reviewPage">
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 数据筛选</h3>
        </div>
        <div class="content-box">
          <div>
            <el-input v-model="form.order" placeholder="请输入订单号"></el-input>

            <el-input v-model="form.plot" placeholder="请输入客户名称"></el-input>

            <el-input v-model="form.plot" placeholder="请输入小区名称"></el-input>

            <el-input v-model="form.plot" placeholder="请输入联系人和业主名称"></el-input>

            <el-input v-model="form.plot" placeholder="请输入公司名称"></el-input>
          </div>

          <div style="margin-top:20px">
            <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>

            <el-select v-model="form.orderState" placeholder="选择工单类型">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="form.orderState" placeholder="选择工单状态">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="form.orderState" placeholder="选择区域">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-button type="warning" class="com-btn">查询</el-button>

            <el-button type="info" class="com-btn">重置</el-button>
          </div>
        </div>
      </div>

      <div class="content-wrap" style="margin-top:20px">
        <div class="content-title">
          <div>
            <el-button type="warning" class="com-btn">批量复核</el-button>

            <el-button class="com-btn">批量删除</el-button>
          </div>
        </div>

        <div>
          <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
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
            <el-table-column label="施工时间" align="center">
              <template slot-scope="scope">
                {{ scope.row.pageviews }}
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="客户地址" width="380">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="施工类型">
              <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="状态">
              <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="created_at" label="操作" width="130">
              <template>
                <span class="detail handle" @click="go">详情</span>
                <span class="handle" style="margin-left:30px">删除</span>
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

    <router-view></router-view>
  </div>
</template>

<script>
  import { getList } from "@/api/table";

  export default {
    name: 'Review',
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
        list: null,
        listLoading: true,
        currentPage: 10,
        reviewPage: true
      };
    },
    created() {
      this.fetchData();
      this.reviewPage = this.$route.name === 'Review'
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
      go() {
        this.$router.push({ path: '/workOrder/review/reviewDetail' })
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