<template>
  <div class="app-container" v-loading="loading">
    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- {{title}}</h3>
          <div v-if="right">
            <el-button type="warning" size="medium" @click="currentSave">最近保存</el-button>
          </div>
        </div>
        <div class="content-box">
          <div class="content">
            <div class="left">
              <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="220px" class="dialog-form" label-position='top'>
                <div>
                  <el-form-item label="业务编码">
                    <span style="display: block; width: 240px;color:#999">{{form.ordercode}}</span>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="contacterphone">
                    <el-input v-model="form.contacterphone" placeholder="请输入" @blur="sphone(form.contacterphone)"></el-input>
                  </el-form-item>
                  <el-form-item label="预约人" prop="customername">
                    <el-input v-model="form.customername" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="客户类型" prop="customertype">
                    <el-radio v-model="form.customertype" label="业主">业主</el-radio>
                    <el-radio v-model="form.customertype" label="水工">水工</el-radio>
                    <el-radio v-model="form.customertype" label="分销商">分销商</el-radio>
                    <el-radio v-model="form.customertype" label="工长">工长</el-radio>
                    <el-radio v-model="form.customertype" label="装饰公司">装饰公司</el-radio>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="小区名称" prop="communityname">
                    <el-input v-model="form.communityname" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="地址-门牌号" prop="address">
                    <el-input v-model="form.address" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="区域" prop="areaid">
                    <el-select v-model="form.areaid" placeholder="请选择">
                      <el-option v-for="item in areas" :key="item.areaid" :label="item.areaname" :value="item.areaid"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="服务类型" prop="pttype">
                    <el-select v-model="form.pttype" placeholder="请选择">
                      <el-option v-for="item in pttype" :key="item.dicid" :label="item.dicvalue" :value="item.dicid"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="预约上门日期" prop="reservedate">
                    <el-date-picker v-model="form.reservedate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="具体时间" prop="reservetime">
                    <el-select v-model="form.reservetime" placeholder="请选择">
                      <el-option v-for="item in times" :key="item.id" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div>
                  <!-- <el-form-item label="预约类型">
                    <el-select v-model="type" placeholder="请选择">
                      <el-option v-for="item in types" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item> -->
                  <el-form-item label="业主姓名" prop="ownername">
                    <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="业主电话" prop="ownerphone">
                    <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="服务凭证号" prop="fwpzhname">
                    <el-input v-model="form.fwpzhname" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="select">

                  <el-form-item label="施工类型" prop="sgtype" v-show="form.pttype==292">
                    <el-select v-model="form.sgtype" placeholder="请选择">
                      <el-option v-for="item in sgtypes" :key="item.id" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="验收类型" prop="ystype" v-show="form.pttype==293">
                    <el-select v-model="form.ystype" placeholder="请选择">
                      <el-option v-for="item in ystypes" :key="item.id" :label="item.value" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="户型" class="other" prop="Receipt20">
                    <el-input v-model.number="form.Receipt20" placeholder="数字"></el-input>厨
                    <el-input v-model.number="form.Receipt21" placeholder="数字"></el-input>卫
                    <el-input v-model.number="form.Receipt22" placeholder="数字"></el-input>阳台
                    <el-input v-model.number="form.Receipt23" placeholder="数字"></el-input>其他
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="挡水台" prop="dst" v-if="form.pttype==292">
                    <el-radio v-model="form.dst" label="是">是</el-radio>
                    <el-radio v-model="form.dst" label="否">否</el-radio>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="服务范围" prop="pressurerangeflag">
                    <el-radio v-model="form.pressurerangeflag" :label="0">范围之内</el-radio>
                    <el-radio v-model="form.pressurerangeflag" :label="1">范围之外</el-radio>
                  </el-form-item>
                </div>
                <div class="bz">
                  <el-form-item label="备注" prop='orderdesc'>
                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="form.orderdesc"></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>

            <div class="right" v-if="right">
              <p>来电信息</p>
              <ul>
                <li>
                  <span>姓名：</span>
                  <span>{{phone.contacter}}</span>
                </li>
                <li>
                  <span>电话号码：</span>
                  <span>{{phone.contacterphone}}</span>
                </li>
                <li>
                  <span>积分：</span>
                  <span>{{phone.totalscore}}</span>
                </li>
                <li>
                  <span>人员类型：</span>
                  <span>{{phone.customertype}}</span>
                </li>
                <li>
                  <span>家装公司：</span>
                  <span>{{phone.coopdec}}</span>
                </li>
                <li>
                  <span>分销商：</span>
                  <span>{{phone.coopdealer}}</span>
                </li>
                <!-- <li>
                  <span>近两年合作情况：</span>
                  <span>{{phone.pthistorydesc}}</span>
                </li> -->
              </ul>
            </div>
          </div>

          <div style="margin-top:20px;">
            <el-button type="primary" class="com-btn" @click="save">保存</el-button>
            <el-button type="info" class="com-btn" @click="reset" v-if="right">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import moment from 'moment'

export default {
  name: 'AddOrder',
  data() {
    return {
      right: false,
      loading: false,
      firstLoad: true,
      title: '',
      areas: [],
      pttype: [],
      times: [{ id: 1, value: '上午' }, { id: 2, value: '下午' }, { id: 3, value: '无' }],
      sgtypes: [{ id: '1', value: '墙地施工' }, { id: '2', value: '墙施工' }, { id: '3', value: '地施工' }, { id: '4', value: '同层底面施工' }],
      ystypes: [{ id: '1', value: '面层验收' }, { id: '2', value: '同层排水底层验收' }],
      phone: {
        contacter: "--",
        contacterphone: '--',
        totalscore: '--',
        customertype: '--',
        coopdec: '--',
        coopdealer: '--',
        pthistorydesc: '--'
      },
      // types: ['施工单', '预约单'],
      // type: '施工单',
      form: {
        ordercode: '',
        communityname: '',
        address: '',
        ownername: '',
        ownerphone: '',
        contacterphone: '',
        customername: '',
        reservedate: '',
        reservetime: '',
        fwpzhname: '',
        pressurerangeflag: 0,
        customertype: '业主',
        orderdesc: '',
        Receipt20: '',
        Receipt21: '',
        Receipt22: '',
        Receipt23: '',
        areaid: '',
        dst: '是',
        pttype: '',
        fwpzhstatus: 0,
        fwpzhisnormal: '',
        ystype: '',
        sgtype: ''
      },
      rules: {
        deptcode: [
          { required: true, message: "请输入部门编号", trigger: "blur" },
          { type: 'number', message: '请输入数字' }
        ],
        deptname: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getOrderId()
    this.initAras()
    this.initDic()

    let query = this.$route.query
    if (!query.detailType) {
      this.right = true
      this.title = '新建工单'
    } else {
      if (query.detailType == 3) {
        this.initnetworkOrder(query)
        this.title = '网络预约单生成'
      } else {
        this.getOrderDetail(query)
        this.title = '编辑工单'
      }
    }

    bus.$on('detail', rs => {
      this.getOrderDetail(rs)
    })
  },
  methods: {
    async currentSave() {
      this.loading = true;
      let tom = moment().add(50, 'days').format('YYYY-MM-DD')
      let yes = moment().add(-50, 'days').format('YYYY-MM-DD')
      let search = {
        startDate: yes,
        endDate: tom,
        address: '',
        ordercode: '',
        areaid: undefined,
        pttype: '',
        status: undefined,
        trackusername: '',
        rqbj: '',
        completestatus: undefined
      }

      let rs = await this.$http({
        url: `/kl/klorderlist`,
        method: "post",
        data: { ...search, pageIndex: 1 }
      });

      if (rs.data.length > 0) {
        this.getOrderDetail({ id: rs.data[0].orderid })
        this.sphone(rs.data[0].customerphone)
      }

      this.loading = false;
    },
    async sphone(val) {
      if (!this.right) return
      let rs = await this.$http({
        url: `/admin/getcustomerbyphone?contacterphone=${val}`,
        method: "get"
      });

      if (rs.data.length && rs.data.length > 0) {
        this.phone = rs.data[0]
      } else {
        this.phone = {}
      }

      // console.log(rs)
    },
    initnetworkOrder(query) {
      let data = JSON.parse(query.data)

      for (let i in this.form) {
        if (typeof data[i] !== 'undefined') this.form[i] = data[i]
      }

      this.form.customername = data.chatordercustomername
      this.form.contacterphone = data.chatordercustomerphone
      this.form.customertype = data.chatordercustomertype
      console.log(data)
    },
    async initDic() {
      let rs = await this.$http({
        url: `/admin/dictionarylist?dictype=40`,
        method: "get"
      });

      this.pttype = rs.data.map(i => {
        return {
          dicvalue: i.dicvalue,
          dicid: String(i.dicid)
        }
      })
    },
    async getOrderDetail(query) {
      // if(!this.$store.state.permission.tabshift) return

      this.loading = true
      let rs = await this.$http({
        url: `/kl/klorderdetail?orderid=${query.id}`,
        method: "get",
      });

      this.loading = false
      // this.$store.state.permission.tabshift = false

      for (let i in this.form) {
        this.form[i] = rs.data[0][i]
      }

      let customer = rs.data[0].customer
      this.form.orderid = rs.data[0].orderid
      this.form.contacterphone = customer.contacterphone
      this.form.customername = customer.customername
      this.form.customertype = customer.customertype
    },
    async getOrderId() {
      let rs = await this.$http({
        url: `/kl/getklordercode`,
        method: "get",
      });

      this.form.ordercode = rs.data
    },
    async initAras() {
      let rs = await this.$http({
        url: `/admin/arealist`,
        method: 'get'
      });

      this.areas = rs.data
    },
    reset() {
      this.$refs.form.resetFields();
      this.form.Receipt20 = ''
      this.form.Receipt21 = ''
      this.form.Receipt22 = ''
      this.form.Receipt23 = ''
      this.phone = {}
    },
    async save() {
      let url = 'doklordersave'
      if (this.$route.query.detailType == 4) url = 'doklordermod'

      let rs = await this.$http({
        url: `/kl/${url}`,
        method: "post",
        data: this.form
      });

      if (rs.success == 'true') {
        if (!this.right) this.$router.go(-1)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      }
    }
  },
  beforeDestroy() {
    bus.$off('detail');//组件销毁时关闭监听
  }
};
</script>

<style lang="scss" scoped>
.content-box {
  & > div {
    display: flex;
    .el-input,
    .el-select,
    .el-date-editor {
      width: 18%;
      margin-right: 30px;
    }
  }

  ::v-deep {
    .el-form-item__label {
      padding-right: 80px;
    }
    .el-form {
      padding: 0 50px !important;
    }
    .el-form-item {
      margin-bottom: 12px;
    }
    .el-input {
      // width: 280px !important;
    }
    .el-form-item__label {
      padding: 0 0 0 0 !important;
    }
  }
}

.content {
  display: flex;
  justify-content: space-between;
  .left {
    width: auto !important;
  }
  .right {
    display: flex;
    flex-direction: column;
    width: 300px !important;
    padding: 13px 17px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    height: 350px;
    ul {
      margin-top: 15px;
      li {
        font-size: 14px;
        color: #999;
        border-radius: 4px;
        padding: 10px 17px 10px 17px;
        background: #ecf1ff;
        margin-bottom: 10px;
        span:first-child {
          display: inline-block;
          color: #444;
          width: 120px;
        }
      }
    }
  }
}

.content-box {
  .el-form {
    padding: 0 10px !important;
  }
  .el-form-item__content {
    & > .el-input {
      width: 210px !important;
    }
    .el-select {
      width: 210px !important;
      & > .el-input {
        width: 100% !important;
      }
    }
  }

  .other {
    .el-input {
      width: 65px !important;
      margin-right: 13px !important;
      margin-left: 25px;
    }
    .el-input:first-child {
      margin-left: 0px !important;
    }
  }
}

el-form {
  & > div {
    margin-bottom: 10px;
  }
}

.bz {
  .el-form-item {
    width: 100%;
  }
}

.el-input {
  width: 100% !important;
}
</style>