<template>
  <div class="app-container">
    <div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 新建工单</h3>
          <div>
            <el-button type="warning" size="medium" @click="back">最近保存</el-button>
          </div>
        </div>
        <div class="content-box">
          <div class="content">
            <div class="left">
              <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="220px" class="dialog-form" label-position='top'>
                <div>
                  <el-form-item label="业务编码">
                    <span style="display: block; width: 240px;color:#999">3223009110</span>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="预约类型">
                    <el-radio v-model="form.wechatflag" :label="1">业主</el-radio>
                    <el-radio v-model="form.wechatflag" :label="0">水工</el-radio>
                    <el-radio v-model="form.wechatflag" :label="1">分销商</el-radio>
                    <el-radio v-model="form.wechatflag" :label="0">工长</el-radio>
                    <el-radio v-model="form.wechatflag" :label="1">装饰公司</el-radio>
                    <el-radio v-model="form.wechatflag" :label="0">项目经理</el-radio>
                    <el-radio v-model="form.wechatflag" :label="1">设计师</el-radio>
                    <el-radio v-model="form.wechatflag" :label="0">泥瓦工</el-radio>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="小区名称" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="楼号-门牌号" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="区域" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="服务类型" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="日期" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="具体时间" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="业主姓名" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="业主电话" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="服务凭证号" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="施工类型" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="施工户型" prop="passwd">
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>厨
                    <el-input v-model="form.passwd" placeholder="请输入"></el-input>卫
                  </el-form-item>
                </div>


              </el-form>
            </div>

            <div class="right">
              <p>来电信息</p>
              <ul>
                <li>
                  <span>姓名：</span>
                  <span>zoo</span>
                </li>
                <li>
                  <span>电话号码：</span>
                  <span>1996217113</span>
                </li>
                <li>
                  <span>积分：</span>
                  <span>333</span>
                </li>
                <li>
                  <span>人员类型：</span>
                  <span>项目经理</span>
                </li>
                <li>
                  <span>家装公司：</span>
                  <span>蚂蚁公司</span>
                </li>
                <li>
                  <span>分销商：</span>
                  <span>蚂蚁公司</span>
                </li>
                <li>
                  <span>近两年合作情况：</span>
                  <span>2019年1户</span>
                </li>
              </ul>
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
      async getOrderId() {
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
      .el-form-item__label {
        padding: 0 0 0 0 !important
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
      ul {
        margin-top: 15px;
        li {
          font-size: 14px;
          color: #999;
          border-radius: 4px;
          padding: 13px 17px 6px 17px;
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
    .el-input {
      width: 210px !important;
    }
  }

  el-form {
    &>div {
      margin-bottom: 10px;
    }
  }
</style>