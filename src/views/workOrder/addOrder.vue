<template>
  <div class="app-container">
    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 新建工单</h3>
          <div></div>
        </div>
        <div class="content-box">
          <div>
            <div style="width: 600px">
              <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="220px" class="dialog-form" label-position='top'>
                <el-form-item label="业务编码">
                  <span>111111</span>
                </el-form-item>
                <el-form-item label="联系电话" prop="passwd">
                  <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="微信预约">
                  <el-radio v-model="form.wechatflag" :label="1">开启</el-radio>
                  <el-radio v-model="form.wechatflag" :label="0">关闭</el-radio>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <div style="margin-top:20px;">
            <el-button type="primary" class="com-btn" @click="save">保存</el-button>
            <el-button type="info" class="com-btn" @click="save">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddOrder',
    data() {
      return {
        form: {

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
      this.fetchData()
      this.getOrderId()
    },
    methods: {
      async getOrderId(){
        let rs = await this.$http({
          url: `/kl/klorderdetail`,
          method: "get",
        });
        
      },
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
      .el-form-item__label{
        padding: 0 0 0 0!important
      }
    }
  }
</style>