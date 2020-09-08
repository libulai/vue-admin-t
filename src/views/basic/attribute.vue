<template>
  <div class="app-container">
    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 公司属性设置</h3>
        </div>
        <div class="content-box">
          <div>
            <el-form :model="form" :rules="rules" ref="form" label-width="220px" class="dialog-form">
              <el-form-item label="微信预约">
                <el-radio v-model="form.wechatflag" :label="1">开启</el-radio>
                <el-radio v-model="form.wechatflag" :label="0">关闭</el-radio>
              </el-form-item>
              <el-form-item label="积分商城">
                <el-radio v-model="form.mallflag" :label="1">开启</el-radio>
                <el-radio v-model="form.mallflag" :label="0">关闭</el-radio>
              </el-form-item>
              <el-form-item label="工单审核">
                <el-radio v-model="form.gdsh" :label="1">开启</el-radio>
                <el-radio v-model="form.gdsh" :label="0">关闭</el-radio>
              </el-form-item>
              <el-form-item label="工厂APP">
                <el-radio v-model="form.applink" :label="1">开启</el-radio>
                <el-radio v-model="form.applink" :label="0">关闭</el-radio>
              </el-form-item>
              <el-form-item label="生日推送">
                <el-radio v-model="form.birthdaymessage" :label="1">开启</el-radio>
                <el-radio v-model="form.birthdaymessage" :label="0">关闭</el-radio>
              </el-form-item>
              <el-form-item label="A分短信">
                <el-radio v-model="form.sgdx" :label="1">开启</el-radio>
                <el-radio v-model="form.sgdx" :label="0">关闭</el-radio>
              </el-form-item>
              <el-form-item label="C分短信">
                <el-radio v-model="form.sgdxc" :label="1">开启</el-radio>
                <el-radio v-model="form.sgdxc" :label="0">关闭</el-radio>
              </el-form-item>
              <el-form-item label="误工费">
                <el-radio v-model="form.wgfsx" :label="1">开启</el-radio>
                <el-radio v-model="form.wgfsx" :label="0">关闭</el-radio>
              </el-form-item>
              <el-form-item label="A分计算类型">
                <el-radio v-model="form.afjslx" :label="1">按产品</el-radio>
                <el-radio v-model="form.afjslx" :label="2">按户型</el-radio>
                <el-radio v-model="form.afjslx" :label="3">自定义</el-radio>
              </el-form-item>
              <el-form-item label="C分计算类型">
                <el-radio v-model="form.cfjslx" :label="1">按产品</el-radio>
                <el-radio v-model="form.cfjslx" :label="2">按户型</el-radio>
                <el-radio v-model="form.cfjslx" :label="3">自定义</el-radio>
              </el-form-item>

              <el-form-item label="微信预约提示">
                <el-input v-model.number="form.wechatremend" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="A分上限">
                <el-input v-model.number="form.score" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="C分上限">
                <el-input v-model.number="form.cscore" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model.number="form.telephone" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="短信额外提醒分值">
                <el-input v-model.number="form.scoresms" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="经销商最低兑换分">
                <el-input v-model.number="form.scorelimit" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="贡献A分兑换比例">
                <el-input v-model.number="form.ratio" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="微信预约当天截止时间">
                <el-input v-model.number="form.hour" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div style="margin-top:20px;margin-left: 50px">
            <el-button type="primary" class="com-btn" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Attribute',
    data() {
      let comid = this.$store.state.user.company.compid;
      return {
        form: { "comid":comid, "wechatremend": "预约成功！！", "comid": 5, "score": 1000, "cscore": 1000, "wechatflag": 0, "mallflag": 0, "gdsh": 0, "applink": 0, "birthdaymessage": 0, "sgdx": 0, "sgdxc": 0, "wgfsx": 0, "scorelimit": 1, "telephone": "0576-85317062", "ratio": 0, "scoresms": 0, "hour": 12, "afjslx": 0, "cfjslx": 0 },
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
      this.fetchData();
    },
    methods: {
      async fetchData() {
        let rs = await this.$http({
          url: `/admin/comsettingdetail`,
          method: "get",
        });

        Object.assign(this.form, rs.data[0])
      },
      async save() {
        let rs = await this.$http({
          url: `/admin/docomsettingmod`,
          method: "post",
          data: this.form
        });


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

    ::v-deep {
      .el-form-item__label {
        padding-right: 80px;
      }
      .el-form {
        padding: 0 50px !important
      }
      .el-form-item {
        margin-bottom: 12px;
      }
      .el-input {
        width: 280px !important;
      }
    }
  }
</style>