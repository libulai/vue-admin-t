<template>
  <div class="bread">
    <!-- <el-breadcrumb class="app-breadcrumb" separator=">">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb> -->

    <!-- home -->
    <!-- <div class="login-info">
      <span>上次登录时间为</span>
      <span>{{logintime}}</span>
      <span>，如有异常，请</span>&nbsp;
      <span style="font-size:13px;text-decoration: underline;cursor: pointer;" @click="dialog2=true">修改密码</span>
    </div> -->

    <!-- 修改密码 -->
    <!-- <el-dialog title="密码修改" :visible.sync="dialog2">
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
    </el-dialog> -->

  </div>

</template>

<script>
  import pathToRegexp from "path-to-regexp";

  export default {
    data() {
      return {
        levelList: null,
        isHome: true,
        dialog2: false,
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
      logintime() {
        return window.localStorage.getItem('logintime')
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      },
    },
    created() {
      this.getBreadcrumb();
    },
    methods: {
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
      getBreadcrumb() {
        // only show routes with meta.title
        let matched = this.$route.matched.filter(
          (item) => item.meta && item.meta.title
        );
        const first = matched[0];

        if (!this.isDashboard(first)) {
          // matched = [{ path: "/home", meta: { title: "Home" } }].concat(
          //   matched
          // );
          matched
        }

        this.levelList = matched.filter(
          (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
        );

        this.isHome = this.$route.name === 'Home'
      },
      isDashboard(route) {
        const name = route && String(route.name);
        if (!name) {
          return false;
        }
        return (
          name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase()
        );
      },
      pathCompile(path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route;
        var toPath = pathToRegexp.compile(path);
        return toPath(params);
      },
      handleLink(item) {
        const { redirect, path } = item;
        if (redirect) {
          this.$router.push(redirect);
          return;
        }
        this.$router.push(this.pathCompile(path));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .el-breadcrumb__inner a,
  .el-breadcrumb__inner.is-link {
    color: #fff !important;
  }

  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #fff;
      cursor: text;
    }
  }

  .bread {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    .login-info {
      color: #fff;
      font-size: 12px;
      margin-right: 33px;
    }
  }
</style>