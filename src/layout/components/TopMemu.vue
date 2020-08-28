<template>
  <div class="top-bar">
    <div class="left">
      <el-dropdown placement="bottom-start">
        <el-button>
          APP下载
          <i class="el-icon-arrow-down el-icon--right"></i>
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
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="drop3">
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

    <!-- 退出登录 -->
    <el-dialog
      title="退出登录"
      :visible.sync="dialog3"
      width="30%"
    >
      <span>是否退出</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="loginOut"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog
      title="密码修改"
      :visible.sync="dialog2"
    >

      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="dialog2-ruleForm"
      >
        <el-form-item
          label="当前密码"
          prop="oldp"
        >
          <el-input v-model="ruleForm2.oldp" type="password"></el-input>
        </el-form-item>

        <el-form-item
          label="新密码"
          prop="newp"
        >
          <el-input v-model="ruleForm2.newp" type="password"></el-input>
        </el-form-item>

        <el-form-item
          label="确认新密码"
          prop="newp2"
        >
          <el-input v-model="ruleForm2.newp2" type="password"></el-input>
        </el-form-item>

      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="modifyPassword"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 个人信息 -->
    <el-dialog
      title="个人信息"
      :visible.sync="dialog1"
    >

      <el-form
        :model="ruleForm1"
        :rules="rules3"
        ref="ruleForm1"
        label-width="100px"
        class="dialog3-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="ruleForm1.username"></el-input>
        </el-form-item>

      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="reset">重置</el-button>
        <el-button
          type="primary"
          @click="modifyInfo"
        >确认修改</el-button>
      </div>
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
      ruleForm2: {
        oldp: "",
        newp: "",
        newp2: ""
      },
      ruleForm1: {
        oldp: "",
        newp: "",
        newp2: ""
      },
      rules2: {
        oldp: [
          { required: true, message: "请输入当前密码", trigger: "blur" }
        ],
        newp: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
        ],
        newp2: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
        ]
      },
      rules3: {
        username: [
          { required: true, message: "请输入当前密码", trigger: "blur" }
        ],
        newp: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    personInfo(command) {
      this[command] = true;
    },
    loginOut() {
      this.dialog3 = false;
    },
    modifyPassword() {
      this.dialog2 = false;
    },
    modifyInfo() {
      this.dialog1 = false;
    },
    reset() {
      this.dialog1 = false;
    }
  },
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
  }
}

.el-form{
  padding: 0 70px;
}
</style>