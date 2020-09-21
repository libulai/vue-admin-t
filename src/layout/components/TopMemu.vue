<template>
  <div class="top-bar">
    <div class="left">
      <el-dropdown placement="bottom-start">
        <el-button>
          APP下载
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="dropdown">
          <div></div>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="search">
        <el-input placeholder="请输入关键字..." v-model="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>

    <div class="right">
      <div class="drop1">
        <img :src="logo1" alt style="width: 16px;margin-right: 6px" />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{user.comname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in compcony" :key="item.comid" @click.native="shifitComp(item)">{{item.comname}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="drop2">
        <img :src="logo2" alt style="width: 16px;margin-right: 6px" />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{user.rolename}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in role" :key="item.roleid" @click.native="shifitRole(item)">{{item.rolename}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="drop3">
        <div class="head-pic">
          <img :src="header" alt />
        </div>
        <el-dropdown @command="personInfo">
          <span class="el-dropdown-link">
            {{user.username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="dialog1">个人信息</el-dropdown-item>
            <el-dropdown-item command="dialog2">修改密码</el-dropdown-item>
            <el-dropdown-item command="dialog3">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 退出登录 -->
    <el-dialog title="退出登录" :visible.sync="dialog3" width="30%" class="dialog1">
      <span>是否退出</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button type="primary" @click="loginOut">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="密码修改" :visible.sync="dialog2">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="dialog2-ruleForm">
        <el-form-item label="当前密码" prop="oldp">
          <el-input v-model="ruleForm2.oldp" type="password" placeholder="请输入当前密码"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newp">
          <el-input v-model="ruleForm2.newp" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" prop="newp2">
          <el-input v-model="ruleForm2.newp2" type="password" placeholder="请再输入新密码"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="modifyPassword">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 个人信息 -->
    <el-dialog title="个人信息" :visible.sync="dialog1" class="dialog3">
      <el-form :model="this.ruleForm2" ref="ruleForm1" label-width="100px" class="dialog3-ruleForm">
        <el-form-item label="用户名">
          <span>{{user.username}}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{userinfo.mobilephone}}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{userinfo.empname}}</span>
        </el-form-item>
        <el-form-item label="公司">
          <span>{{userinfo.company.comname}}</span>
        </el-form-item>
        <el-form-item label="角色">
          <span>{{user.rolename}}</span>
        </el-form-item>
      </el-form>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取消</el-button>
        <el-button type="primary" @click="modifyInfo">保存</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  name: "TopMemu",
  computed: {},
  data() {
    return {
      search: "",
      dialog3: false,
      dialog2: false,
      dialog1: false,
      logo1: require("@/assets/pic/bussines.png"),
      logo2: require("@/assets/pic/admin.png"),
      header: require("@/assets/pic/demo.png"),
      compcony: [],
      role: [],
      userinfo: {
        empname: '',
        mobilephone: '',
        company: {},
        role: ''
      },
      ruleForm2: {
        passwd: "",
      },
      ruleForm1: {
        oldp: "",
        newp: "",
        newp2: "",
      },
      rules2: {
        oldp: [{ required: true, message: "请输入当前密码", trigger: "blur" }],
        newp: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        newp2: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      rules3: {
        username: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
        newp: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    company() {
      return this.$store.state.user.company.compName;
    },
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    personInfo(command) {
      this[command] = true;

      if (command == 'dialog1') {
        this.getUserInfo()
      }
    },
    async loginOut() {
      this.dialog3 = false;
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    modifyPassword() {
      this.dialog2 = false;
      this.$refs.ruleForm2.resetFields();
    },
    async getUserInfo() {
      let rs = await this.$http({
        url: `/admin/userdetail?userid=${this.user.userid}`,
        method: "get"
      });

      let rss = await this.$http({
        url: `/admin/empdetail?empid=${rs.data[0].empid}`,
        method: "get"
      });

      Object.assign(this.userinfo, rss.data[0])
    },
    async modifyInfo() {
      this.dialog1 = false;
      let rs = await this.$http({
        url: `/admin/companyuserlist`,
        method: "post",
        data: {
          userid: "",
        },
      });

      this.$refs.ruleForm1.resetFields();
    },
    reset() {
      this.dialog1 = false;
      this.$refs.ruleForm1.resetFields();
    },
    async shifitComp(obj) {
      let rs = await this.$http({
        url: `/admin/shiftcompany?shiftComid=${obj.comid}`,
        method: "get",
      });

      this.$store.dispatch("user/changeCompany", obj);
    },
    async shifitRole(obj) {
      let rs = await this.$http({
        url: `/admin/shiftrole?shiftRoleid=${obj.roleid}`,
        method: "get",
      });

      this.$store.dispatch("user/changeRole", obj);
    },
    async initCompany() {
      let rs = await this.$http({
        url: `/admin/companyuserlist`,
        method: "post",
        data: {
          userid: "",
        },
      });

      this.compcony = rs.data;
      this.$store.dispatch("user/changeCompany", rs.data[0]);
    },
    async initAdmin() {
      let rs = await this.$http({
        url: `/admin/roleuserlist`,
        method: "get"
      });

      this.role = rs.data;
    },
    async initUserInfo() {
      let rs = await this.$http({
        url: `/admin/getcurrentuser`,
        method: "get"
      });

      // this.compcony = rs.data;
      this.$store.dispatch("user/changeUserinfo", rs);
    }
  },
  async created() {
    // 用户信息
    this.initUserInfo();

    // 公司列表
    this.initCompany();

    // 角色列表
    this.initAdmin()
  },
};
</script>

<style lang="scss">
.dialog3-ruleForm .el-form-item__label {
  padding-right: 50px !important;
}

.top-bar {
  height: 85px;
  display: flex;
  align-items: center;
  background: #0b3190;
  border-bottom: 1px solid #3e4ea0;
  justify-content: space-between;
  padding: 0 20px;
}

.search {
  margin-left: 25px;
  width: 300px;
  .el-input-group__append {
    border: none;
    background: #546eb1 !important;
    color: #fff;
  }
}

.dropdown {
  width: 200px;
  height: 200px;
}

.left {
  display: flex;
  .el-dropdown .el-button {
    background: #0b3190;
    color: #fff;
    width: 120px;
  }
}

.head-pic {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
  img {
    width: 140%;
  }
}

.right {
  display: flex;
  .drop2 {
    margin: 0 60px;
  }
  .el-dropdown {
    color: #fff !important;
  }
  & > div {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}

.el-form {
  padding: 0 130px 0 70px;
}
</style>

<style lang="scss" scoped>
::v-deep .dialog1 {
  .el-dialog {
    width: 450px !important;
  }
}

::v-deep .dialog3 {
  .el-dialog {
    width: 650px !important;
  }
}
</style>