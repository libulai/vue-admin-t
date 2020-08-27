<template>
  <div class="top-bar">
    <div class="left">
      <el-dropdown placement="bottom-start">
        <el-button>
          APP下载<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          class="dropdown"
        >
          <div>

          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="search">
        <el-input
          placeholder="请输入关键字..."
          v-model="search"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>

    </div>

    <div>
      333
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
  border-bottom: 1px solid #8c9df1;
  justify-content: space-between;
  padding: 0 20px;
}

.search {
  margin-left: 25px;
  width: 300px;
  .el-input-group__append {
    border: none;
    background: #546eb1!important;
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
</style>
