<template>
  <div class="app-container" v-loading="loading">
    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 编辑{{title(form2.pttype)}}</h3>
        </div>
        <div class="content-box">
          <div class="content">
            <div class="left">
              <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="220px" class="dialog-form" label-position='top'>
                <div v-if="form2.pttype == 292 || form2.pttype == '施工单'" class="item-box">
                  <div>
                    <h4>施工信息</h4>
                    <el-form-item label="施工地址" prop="address">
                      <el-input v-model="form2.address" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="施工户型" class="other" prop="receipt20">
                      <el-input v-model.number="form.receipt20" placeholder="数字"></el-input>厨
                      <el-input v-model.number="form.receipt21" placeholder="数字"></el-input>卫
                      <el-input v-model.number="form.receipt22" placeholder="数字"></el-input>阳台
                      <el-input v-model.number="form.receipt23" placeholder="数字"></el-input>其他
                    </el-form-item>
                  </div>

                  <div>
                    <h4>联系方式</h4>
                    <el-form-item label="现场联系人" prop="receipt44">
                      <el-input v-model="form.receipt44" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="receipt45">
                      <el-input v-model="form.receipt45" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="业主" prop="ownername">
                      <el-input v-model="form2.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="ownerphone">
                      <el-input v-model="form2.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="项目经理姓名" prop="receipt13">
                      <el-input v-model="form.receipt13" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="receipt14">
                      <el-input v-model="form.receipt14" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>房屋信息</h4>
                    <el-form-item label="排水类型" prop="receipt48">
                      <el-select v-model="form.receipt48" placeholder="请选择">
                        <el-option v-for="item in psMap" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="施工属性" prop="receipt49" v-show="form.receipt48=='同层排水'">
                      <el-select v-model="form.receipt49" placeholder="请选择">
                        <el-option v-for="item in ysMap" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="是否做二排" prop="receipt38">
                      <el-select v-model="form.receipt38" placeholder="请选择">
                        <el-option v-for="item in isYESMAP" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="施工工艺" prop="sgtype">
                      <el-select v-model="form2.sgtype" placeholder="请选择">
                        <el-option v-for="item in sgtypes" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div style="width: 760px;">
                    <el-form-item label="施工详情单备注" prop="orderdesc" style="width:100%">
                      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="form2.orderdesc"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>安装信息</h4>
                    <el-form-item :label="areaName(i)" prop="ownername" v-for="i in form3.klOrderReceiptAreas" :key="i.type">
                      <el-input v-model="i.area" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="总面积" prop="fwpzhname">
                      <el-input v-model="form3.receipt51" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>实际物料使用量</h4>
                    <el-form-item :label="product(i)" prop="ownername" v-for="i in form4.products" :key="i.comproductid">
                      <el-input v-model="i.num" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div style="width: 760px;">
                    <el-form-item label="施工确认单备注" prop='orderdesc' style="width: 100%;">
                      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="form.receipt60"></el-input>
                    </el-form-item>
                  </div>
                </div>

                <div v-else class="item-box">
                  <div>
                    <h4>施工信息</h4>
                    <el-form-item label="验收地址" prop="contacterphone">
                      <el-input v-model="form2.address" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="验收户型" class="other" prop="Receipt20">
                      <el-input v-model.number="form.receipt20" placeholder="数字"></el-input>厨
                      <el-input v-model.number="form.receipt21" placeholder="数字"></el-input>卫
                      <el-input v-model.number="form.receipt22" placeholder="数字"></el-input>阳台
                      <el-input v-model.number="form.receipt23" placeholder="数字"></el-input>其他
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="下次业主是否到场" prop="customertype" style="width: 240px;">
                      <el-radio v-model="form.receipt11" label="是">是</el-radio>
                      <el-radio v-model="form.receipt11" label="否">否</el-radio>
                    </el-form-item>
                    <el-form-item label="是否满足验收条件" prop="customertype">
                      <el-input v-model="form.customertype" :disabled="true"></el-input>
                      <!-- <el-radio v-model="form.customertype" label="业主">是</el-radio>
                      <el-radio v-model="form.customertype" label="水工">否</el-radio> -->
                    </el-form-item>
                  </div>

                  <div>
                    <h4>联系方式</h4>
                    <el-form-item label="现场联系人" prop="receipt44">
                      <el-input v-model="form.receipt44" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="receipt45">
                      <el-input v-model="form.receipt45" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="业主" prop="ownername">
                      <el-input v-model="form2.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="ownerphone">
                      <el-input v-model="form2.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="项目经理姓名" prop="receipt13">
                      <el-input v-model="form.receipt13" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="receipt14">
                      <el-input v-model="form.receipt14" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>验收信息</h4>
                    <el-form-item label="服务凭证号" prop="receipt7">
                      <el-input v-model="form.receipt7" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="经销商" prop="receipt5">
                      <el-input v-model="form.receipt5" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="经销商电话" prop="receipt42">
                      <el-input v-model="form.receipt42" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="装修公司" prop="receipt6">
                      <el-input v-model="form.receipt6" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="二级网点" prop="receipt43">
                      <el-input v-model="form.receipt43" placeholder="请输入"></el-input>
                    </el-form-item>

                    <el-form-item label="购买方式" prop="receipt4">
                      <el-select v-model="form.receipt4" placeholder="请选择">
                        <el-option v-for="item in buys" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>房屋信息</h4>
                    <el-form-item label="小区情况" prop="receipt1">
                      <el-select v-model="form.receipt1" placeholder="请选择">
                        <el-option v-for="item in plot" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="装修情况" prop="receipt2">
                      <el-select v-model="form.receipt2" placeholder="请选择">
                        <el-option v-for="item in pState" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="房屋类型" prop="receipt9">
                      <el-select v-model="form.receipt9" placeholder="请选择">
                        <el-option v-for="item in houseType" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="排水类型" prop="receipt48">
                      <el-select v-model="form.receipt48" placeholder="请选择">
                        <el-option v-for="item in psMap" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="施工属性" prop="receipt49" v-show="form.receipt48=='同层排水'">
                      <el-select v-model="form.receipt49" placeholder="请选择">
                        <el-option v-for="item in ysMap" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="是否做二排" prop="receipt38">
                      <el-select v-model="form.receipt38" placeholder="请选择">
                        <el-option v-for="item in isYESMAP" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="施工工艺" prop="sgtype">
                      <el-select v-model="form2.sgtype" placeholder="请选择">
                        <el-option v-for="item in sgtypes" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="验收工艺" prop="ystype">
                      <el-select v-model="form2.ystype" placeholder="请选择">
                        <el-option v-for="item in ystypes" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div style="width: 760px;">
                    <el-form-item label="验收详情单备注" prop="orderdesc" style="width:100%">
                      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="form2.orderdesc"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>安装信息</h4>
                    <el-form-item :label="areaName(i)" prop="ownername" v-for="i in form5.klOrderReceiptAreas" :key="i.type">
                      <el-input v-model="i.area" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="总面积" prop="fwpzhname">
                      <el-input v-model="form5.receipt51" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>保护层</h4>
                    <el-form-item label="是否做保护层" prop="customertype" style="width: 240px;">
                      <el-radio v-model="form.receipt52" label="是">是</el-radio>
                      <el-radio v-model="form.receipt52" label="否">否</el-radio>
                    </el-form-item>
                    <el-form-item :label="areaName(i)" prop="ownername" v-for="i in form5.klOrderReceiptAreaPs" :key="i.type">
                      <el-input v-model="i.area" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="总面积" prop="fwpzhname">
                      <el-input v-model="form5.receipt55" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <el-form-item label="验收确认单备注" prop='orderdesc' style="width: 100%;">
                      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="form.receipt60"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </div>

          </div>

          <div style="margin-top:20px;">
            <el-button type="primary" class="com-btn" @click="save">保存</el-button>
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
  // name: 'OrderEdit',
  name: 'O',
  data() {
    return {
      loading: false,
      areas: [],
      pttype: [],
      times: [{ id: 1, value: '上午' }, { id: 2, value: '下午' }, { id: 3, value: '无' }],
      // sgtypes: [{ id: '1', value: '墙地施工' }, { id: '2', value: '墙施工' }, { id: '3', value: '地施工' }, { id: '4', value: '同层底面施工' }],
      // ystypes: [{ id: '1', value: '面层验收' }, { id: '2', value: '同层排水底层验收' }],
      sgtypes: ['墙地施工', '墙施工', '地施工', '同层底面施工'],
      ystypes: ['面层验收', '同层排水底层验收'],
      type: 1,
      psMap: ['隔层排水', '同层排水'],
      ysMap: ['降板层内', '面层'],
      isYESMAP: ['是', '否'],
      buys: ['业主购买', '装饰公司', '工人购买', '项目经理购买', '其他'],
      plot: ['新小区', '老小区'],
      pState: ['初次装修', '二次装修'],
      houseType: ['别墅排屋', '商品房', '家属楼', '回迁房', '集资房', '自建', '店面', '其他'],
      orderid: '',
      form4: {
        products: []
      },
      form5: {
        orderid: '',
        receipt38: '',
        receipt51: '',
        receipt52: '',
        receipt55: '',
        receipt60: '',
        klOrderReceiptAreas: [],
        klOrderReceiptAreaPs: []
      },
      form3: {
        orderid: '',
        receipt38: '',
        receipt51: '',
        receipt53: '',
        receipt54: '',
        receipt60: '',
        klOrderReceiptAreas: []
      },
      form2: {
        orderid: '',
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
      form: {
        orderid: '',
        receipt1: '',
        receipt2: '',
        receipt3: '',
        receipt4: '',
        receipt5: '',
        receipt6: '',
        receipt7: '',
        receipt8: '',
        receipt9: '',
        receipt10: '',
        receipt11: '',
        receipt12: '',
        receipt13: '',
        receipt14: '',
        receipt15: '',
        receipt16: '',
        receipt17: '',
        receipt18: '',
        receipt19: '',
        receipt20: '',
        receipt21: '',
        receipt22: '',
        receipt23: '',
        receipt24: '',
        receipt25: '',
        receipt26: '',
        receipt27: '',
        receipt28: '',
        receipt29: '',
        receipt30: '',
        receipt31: '',
        receipt32: '',
        receipt33: '',
        receipt34: '',
        receipt35: '',
        receipt36: '',
        receipt37: '',
        receipt38: '',
        receipt39: '',
        receipt40: '',
        receipt41: '',
        receipt42: '',
        receipt43: '',
        receipt44: '',
        receipt45: '',
        receipt46: '',
        receipt47: '',
        receipt48: '',
        receipt49: '',
        receipt50: '',
        receipt51: '',
        receipt52: '',
        receipt53: '',
        receipt54: '',
        receipt55: '',
        receipt56: '',
        receipt57: '',
        receipt58: '',
        receipt59: '',
        receipt60: '',

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
    this.initDic()

    let query = this.$route.query
    this.orderid = Number(query.id)
    // 回执明细
    this.init(query)
    // 工单明细
    this.init2(query)
    // 物料
    this.init3(query)
  },
  computed: {
    title(pttype) {
      const _this = this
      return function (pttype) {
        let tname = ''
        _this.pttype.forEach(item => {
          if (item.dicid == pttype) tname = item.dicvalue
        })
        return tname
      }
    },
    areaName(data) {
      return function (data) {
        const TYPE_MAP = {
          1: '厨房',
          2: '卫生间',
          3: '阳台',
          4: '其他'
        }
        return TYPE_MAP[data.type] + ' ' + data.pos
      }
    },
    product(data) {
      return function (data) {
        return data.productname + ' ' + data.specs + ' （桶/组）'
      }
    }
  },
  methods: {
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
    async init(query) {
      this.loading = true
      let rs = await this.$http({
        url: `/kl/klorderreceipt?orderid=${query.id}`,
        method: "get",
      });

      let data = rs.data[0]
      for (let i in this.form) {
        if (typeof data[i] !== 'undefined') {
          this.form[i] = rs.data[0][i]
        }
      }

      if (this.form2.pttype == 292 || this.form2.pttype == '施工单') {
        this.form3.receipt51 = data.receipt51
        this.form3.klOrderReceiptAreas = data.klOrderReceiptAreas
      } else {
        this.form5.receipt51 = data.receipt51
        this.form5.klOrderReceiptAreas = data.klOrderReceiptAreas

        this.form5.receipt55 = data.receipt55
        this.form5.klOrderReceiptAreaPs = data.klOrderReceiptAreaPs
      }
    },
    async init2(query) {
      let rs = await this.$http({
        url: `/kl/klorderdetailforreceipt?orderid=${query.id}`,
        method: "get",
      });

      this.loading = false
      let data = rs.data[0]
      for (let i in this.form2) {
        this.form2[i] = rs.data[0][i]
      }

      let customer = rs.data[0].customer
      this.form2.orderid = rs.data[0].orderid
      this.form2.contacterphone = customer.contacterphone
      this.form2.customername = customer.customername
      this.form2.customertype = customer.customertype

    },
    async init3(query) {
      let rs = await this.$http({
        url: `/kl/klorderproductlist?orderid=${query.id}`,
        method: "get",
      });

      this.form4.products = rs.data
    },
    async save() {
      if (this.validate()) {
        this.loading = true
        // 回执保存
        let rs = this.$http({
          url: `/kl/doklorderreceiptsave`,
          method: "post",
          data: this.form
        });

        // 基本信息
        let rs2 = this.$http({
          url: `/kl/doklordermod`,
          method: "post",
          data: this.form2
        });

        // 面积保存
        let rs3, rs4
        if (this.form2.pttype == 292 || this.form2.pttype == '施工单') {
          rs3 = this.$http({
            url: `/kl/doklorderareasavesg`,
            method: "post",
            data: Object.assign(this.form3, { orderid: this.orderid })
          });

          rs4 = this.$http({
            url: `/kl/klorderproductsavelist`,
            method: "post",
            data: Object.assign(this.form4)
          });
        } else {
          rs3 = this.$http({
            url: `/kl/doklorderareasaveys`,
            method: "post",
            data: Object.assign(this.form5, { orderid: this.orderid })
          });

          rs4 = function () { return true }
        }

        // 物料保存
        Promise.all([rs, rs2, rs3, rs4]).then(res => {
          this.loading = false
          // console.log(res, '&&&')
          let result = res.every(item => {
            return item.success == 'true'
          })

          if (result) {
            // this.$router.go(-1)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
        })
      }

    },
    validate() {
      let form = this.form
      let form2 = this.form2
      if (form2.pttype == '施工单') {
        if (form2.address == '' || form.receipt20 == '' || form.receipt21 == '' || form.receipt22 == '' || form.receipt23 == '' || form.receipt44 == '' || form.receipt45== '' || form2.ownername== '' || form2.ownerphone== '' || form2.orderdesc== '') {
          this.$message({
            message: '表单不完整',
            type: 'error'
          })
          return false
        }
      } else {
        if (form2.address == '' || form.receipt20 == '' || form.receipt21 == '' || form.receipt22 == '' || form.receipt23 == '' || form.receipt44 == '' || form.receipt45== '' || form2.ownername== '' || form2.ownerphone== '' || form2.orderdesc== '') {
          this.$message({
            message: '表单不完整',
            type: 'error'
          })
          return false
        }
      }

      return true
    }
  }
};
</script>

<style lang="scss" scoped>
.item-box {
  & > div {
    width: 850px;
  }
}

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
      margin-right: 35px !important;
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

h4 {
  font-size: 15px;
  margin: 25px 0 10px 0;
}
</style>