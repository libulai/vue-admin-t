<template>
  <div class="top-bar">
    <div class="left">
  
      <div class="search">
        <el-autocomplete placeholder="请输入菜单关键字..." v-model="search" clearable :fetch-suggestions="querySearch" @select="handleSelect">
          <el-button slot="append" icon="el-icon-right" @click="goto"></el-button>
        </el-autocomplete>
      </div>
    </div>

    <div class="right">
      <div>
      
        <!-- <div class="drop2">
          <img :src="logo2" alt style="width: 16px;margin-right: 6px" />
          <el-dropdown>
            <span class="el-dropdown-link">
              {{user.rolename}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" id="role">
              <el-dropdown-item v-for="item in role" :key="item.roleid" @click.native="shifitRole(item)">{{item.rolename}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->

        <div class="drop3" style="    display: flex;align-items: center;">
          <div class="head-pic">
            <img :src="header" alt />
          </div>
          <el-dropdown @command="personInfo">
            <span class="el-dropdown-link">
              admin
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

      <!-- <div class="login-info">
        <span>上次登录时间为</span>
        <span>{{logintime && logintime.split('.')[0]}}</span>
        <span>，如有异常，请 </span>&nbsp;
        <span style="font-size:13px;text-decoration: underline;cursor: pointer;color: #fff" @click="dialog2=true">修改密码</span>
      </div> -->

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
  </div>
</template>

<script>
  // import { mapGetters } from "vuex";
  import bus from '@/utils/bus'

  export default {
    name: "TopMemu",
    watch: {
      '$store.state.permission.routes': function (val) {
        let toLlist = []
        val.forEach(i => {
          if (i.children) {
            i.children.forEach(j => {
              toLlist.push({
                value: j.meta.title,
                address: j.name
              })
            })
          }
        })
        this.restaurants = toLlist
      }
    },
    data() {
      return {
        search: "",
        currentMenu: '',
        restaurants: [],
        dialog3: false,
        dialog2: false,
        dialog1: false,
        logo1: require("@/assets/pic/bussines.png"),
        logo2: require("@/assets/pic/admin.png"),
        qr: require("@/assets/pic/qrcode.png"),
        header: require("@/assets/pic/touxiang.png"),
        compcony: [],
        role: [],
        userinfo: {
          empname: '',
          mobilephone: '',
          company: {},
          role: ''
        },
        ruleForm2: {
          oldp: "",
          newp: "",
          newp2: "",
        },
        rules2: {
          oldp: [
            { required: true, message: "请输入当前密码", trigger: "blur" },
            {
              validator: (rule, value, callback) => {
                if (localStorage.getItem('q') == value) {
                  callback()
                } else {
                  callback(new Error('密码错误'));
                }
              }, trigger: 'blur'
            },
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
      };
    },
    computed: {
      company() {
        return this.$store.state.user.company.compName;
      },
      user() {
        return this.$store.state.user.user;
      },
      roleObj() {
        return JSON.parse(window.localStorage.getItem('role'))
      },
      logintime() {
        return window.localStorage.getItem('logintime')
      }
    },
    methods: {
      handleSelect(item) {
        this.currentMenu = item.address
      },
      goto() {
        this.$router.push({ 'name': this.currentMenu })
      },
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
      async modifyPassword() {
        let form = this.ruleForm2
        if (form.newp !== form.newp2) {
          this.$message({
            message: '新密码不一致',
            type: 'error'
          })
          return
        }

        this.$refs.ruleForm2.validate(async (valid) => {
          if (valid) {
            let rs = await this.$http({
              url: `/admin/domodifypasswd`,
              method: "post",
              data: {
                userid: this.$store.state.user.userid,
                passwd: this.ruleForm2.newp
              }
            })

            if (rs.success == 'true') this.$message({
              message: '保存成功',
              type: 'success'
            })

            this.dialog2 = false;
            this.$refs.ruleForm2.resetFields();
          }
        });
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

        location.reload()
        this.$router.push('/home')
      },
      async shifitRole(obj) {
        let rs = await this.$http({
          url: `/admin/shiftrole?shiftRoleid=${obj.roleid}`,
          method: "get",
        });

        this.$store.dispatch("user/changeRole", obj);

        location.reload()
        this.$router.push('/home')
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
        // console.log(rs)
        // this.compcony = rs.data;
        this.$store.dispatch("user/changeUserinfo", rs);
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().includes(queryString.toLowerCase()));
        };
      },
      async initRole() {
        let rs = await this.$http({
          url: `/admin/shiftrole?shiftRoleid=${this.roleObj.roleid}`,
          method: "get",
        });

        this.user.rolename = this.roleObj.rolename

        // this.$store.dispatch("user/changeRole", obj);

        location.reload()
      }
    },
    async created() {
      // 用户信息
      setTimeout(() => {
        this.initUserInfo();
      }, 500);


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
    height: 65px;
    display: flex;
    align-items: center;
    background: #30838c;
    border-bottom: 1px solid #6caeb5;
    justify-content: space-between;
    padding: 0 20px;
  }

  .search {
    width: 300px;
    .el-input-group__append {
      border: none;
      background:#54b1b1 !important;
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
      background: #30838c;
      color: #fff;
      width: 120px;
    }
  }

  .head-pic {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 7px;
    img {
      width: 130%;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    .drop2 {
      margin: 0 50px;
    }
    .el-dropdown {
      color: #fff !important;
    }
    &>div {
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

  .el-dropdown-menu {
    max-height: 450px !important;
    overflow: auto;
  }

  .qr {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    img {
      width: 85%; // height: 100%;
    }
  }

  .login-info {
    color: #bab9b9;
    font-size: 12px;
    justify-content: flex-end;
    margin-top: 7px;
  }
</style>