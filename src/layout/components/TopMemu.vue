<template>
  <div class="top-bar">
    <div class="left">
      <el-dropdown placement="bottom-start">
        <el-button>
          APP下载
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="dropdown">
          <div>

          </div>
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
        <el-dropdown>
          <span class="el-dropdown-link">
            上海分公司
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="drop2">
        <el-dropdown>
          <span class="el-dropdown-link">
            系统管理员
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="drop3">
        <el-dropdown>
          <span class="el-dropdown-link">
            admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
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
      };
    },
    methods: {},
  };
</script>

<style lang="scss">
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

  .right{
    display: flex;
    .drop2{
      margin: 0 60px;
    }
    .el-dropdown{
      color: #fff!important;
    }
  }
</style>