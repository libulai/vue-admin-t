<template>
  <div class="bread">
    <el-breadcrumb class="app-breadcrumb" separator=">">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

    <!-- home -->
    <div v-if="isHome" class="login-info">
      <span>上次登录时间为</span>
      <span>2020-09-09 上午12:00</span>
      <span>，如有异常，请</span>&nbsp;
      <span style="font-size:13px;text-decoration: underline;">修改密码</span>
    </div>
  </div>

</template>

<script>
  import pathToRegexp from "path-to-regexp";

  export default {
    data() {
      return {
        levelList: null,
        isHome: false
      };
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
        const name = route && route.name;
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

  .bread{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    .login-info{
      color: #fff;
      font-size:11px;
      margin-right:20px;
    }
  }

</style>