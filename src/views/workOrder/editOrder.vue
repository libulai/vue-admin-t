<template>
  <div class="app-container" v-loading="loading">
    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 编辑{{title}}</h3>
        </div>
        <div class="content-box">
          <div class="content">
            <div class="left">
              <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="220px" class="dialog-form" label-position='top'>
                <div v-if="type==1">
                  <div>
                    <h4>施工信息</h4>
                    <el-form-item label="施工地址" prop="contacterphone">
                      <el-input v-model="form.contacterphone" placeholder="请输入" @blur="sphone(form.contacterphone)"></el-input>
                    </el-form-item>
                    <el-form-item label="施工户型" class="other" prop="Receipt20">
                      <el-input v-model.number="form.Receipt20" placeholder="数字"></el-input>厨
                      <el-input v-model.number="form.Receipt21" placeholder="数字"></el-input>卫
                      <el-input v-model.number="form.Receipt22" placeholder="数字"></el-input>阳台
                      <el-input v-model.number="form.Receipt23" placeholder="数字"></el-input>其他
                    </el-form-item>
                  </div>

                  <div>
                    <h4>联系方式</h4>
                    <el-form-item label="现场联系人" prop="communityname">
                      <el-input v-model="form.communityname" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="address">
                      <el-input v-model="form.address" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="业主" prop="communityname">
                      <el-input v-model="form.communityname" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="address">
                      <el-input v-model="form.address" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="项目经理姓名" prop="communityname">
                      <el-input v-model="form.communityname" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="address">
                      <el-input v-model="form.address" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>房屋信息</h4>
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

                  <div>
                    <h4>安装信息</h4>
                    <el-form-item label="厨房 1" prop="ownername">
                      <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="厨房 2" prop="ownerphone">
                      <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="卫生间 1" prop="fwpzhname">
                      <el-input v-model="form.fwpzhname" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="卫生间 2" prop="ownername">
                      <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="阳台 1" prop="ownerphone">
                      <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="阳台 2" prop="fwpzhname">
                      <el-input v-model="form.fwpzhname" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="其他 1" prop="ownername">
                      <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="其他 2" prop="ownerphone">
                      <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="总面积" prop="fwpzhname">
                      <el-input v-model="form.fwpzhname" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>实际物料使用量</h4>
                    <el-form-item label="物料 1（桶/组）" prop="ownername">
                      <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="物料 2（桶/组）" prop="ownerphone">
                      <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="施工确认单备注" prop='orderdesc' style="width: 100%;">
                      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="form.orderdesc"></el-input>
                    </el-form-item>
                  </div>
                </div>

                <div v-if="type==2">
                  <div>
                    <h4>验收信息</h4>
                    <el-form-item label="验收地址" prop="contacterphone">
                      <el-input v-model="form.contacterphone" placeholder="请输入" @blur="sphone(form.contacterphone)"></el-input>
                    </el-form-item>
                    <el-form-item label="验收户型" class="other" prop="Receipt20">
                      <el-input v-model.number="form.Receipt20" placeholder="数字"></el-input>厨
                      <el-input v-model.number="form.Receipt21" placeholder="数字"></el-input>卫
                      <el-input v-model.number="form.Receipt22" placeholder="数字"></el-input>阳台
                      <el-input v-model.number="form.Receipt23" placeholder="数字"></el-input>其他
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="下次业主是否到场" prop="customertype" style="width: 240px;">
                      <el-radio v-model="form.customertype" label="业主">是</el-radio>
                      <el-radio v-model="form.customertype" label="水工">否</el-radio>
                    </el-form-item>
                    <el-form-item label="是否满足验收条件" prop="customertype">
                      <el-radio v-model="form.customertype" label="业主">是</el-radio>
                      <el-radio v-model="form.customertype" label="水工">否</el-radio>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>联系方式</h4>
                    <el-form-item label="现场联系人" prop="communityname">
                      <el-input v-model="form.communityname" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="address">
                      <el-input v-model="form.address" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="业主" prop="communityname">
                      <el-input v-model="form.communityname" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="address">
                      <el-input v-model="form.address" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="项目经理姓名" prop="communityname">
                      <el-input v-model="form.communityname" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="address">
                      <el-input v-model="form.address" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>房屋信息</h4>
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

                  <div>
                    <h4>安装信息</h4>
                    <el-form-item label="厨房 1" prop="ownername">
                      <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="厨房 2" prop="ownerphone">
                      <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="卫生间 1" prop="fwpzhname">
                      <el-input v-model="form.fwpzhname" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="卫生间 2" prop="ownername">
                      <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="阳台 1" prop="ownerphone">
                      <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="阳台 2" prop="fwpzhname">
                      <el-input v-model="form.fwpzhname" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="其他 1" prop="ownername">
                      <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="其他 2" prop="ownerphone">
                      <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="总面积" prop="fwpzhname">
                      <el-input v-model="form.fwpzhname" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>

                  <div>
                    <h4>实际物料使用量</h4>
                    <el-form-item label="物料 1（桶/组）" prop="ownername">
                      <el-input v-model="form.ownername" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="物料 2（桶/组）" prop="ownerphone">
                      <el-input v-model="form.ownerphone" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="施工确认单备注" prop='orderdesc' style="width: 100%;">
                      <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="form.orderdesc"></el-input>
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
  name: 'OrderEdit',
  data() {
    return {
      loading: false,
      areas: [],
      pttype: [],
      times: [{ id: 1, value: '上午' }, { id: 2, value: '下午' }, { id: 3, value: '无' }],
      sgtypes: [{ id: '1', value: '墙地施工' }, { id: '2', value: '墙施工' }, { id: '3', value: '地施工' }, { id: '4', value: '同层底面施工' }],
      ystypes: [{ id: '1', value: '面层验收' }, { id: '2', value: '同层排水底层验收' }],
      // types: ['施工单', '预约单'],
      type: 1,
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
    this.initAras()
    this.initDic()

    let query = this.$route.query
  },
  methods: {
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