<template>
  <div class="login-container">
    <div class="bg-wrap" :style="{background:`url(${img}), no-repeat 100%`}">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

        <div class="title-container">
          <img :src="title" alt="">
        </div>

        <el-form-item prop="username">
          <input type="password" name="password1"  style="display:none"/>
          <span class="svg-container">
            <!-- <svg-icon icon-class="user" /> -->
            <i class="el-icon-mobile-phone" style="font-size: 18px;" />
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="请输入手机号" name="username" tabindex="1" autocomplete="off"/>
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
            <i class="el-icon-lock" style="font-size: 18px;" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" autocomplete="off"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">登录</el-button>

      </el-form>
    </div>

    <div class="footer">
      <div style="margin-bottom: 10px;">Copyright © KALE</div>
      <div>KALE Brand Management System Guideline</div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { Message } from 'element-ui'
import bus from '@/utils/bus'
import { removeToken } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: "请输入用户名", }],
        password: [{ required: true, trigger: 'blur', message: "请输入密码", }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      title: require('@/assets/pic/logo.png'),
      img: require('@/assets/pic/bg.png')
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    setTimeout(() => {
      removeToken()
      window.localStorage.removeItem('query')
    }, 500)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.commit('tagsView/DEL_ALL_VISITED_VIEWS')
          this.loading = true
          localStorage.setItem('q', this.loginForm.password)
          this.$store.dispatch('user/login', this.loginForm).then((data) => {
            this.loading = false
            // if (data.success == 'false') {
            //   return Message.error(data.data)
            // }

            // this.$router.push({ path: this.redirect || '/' })
            this.$router.push({ path: '/' })
            bus.$emit('login')
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */

/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #666;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-input {
    display: inline-block;
    height: 39px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      /* padding: 12px 5px 12px 15px; */
      /* color: $light_gray; */
      height: 15px;
      caret-color: $cursor;
      border-left: 1px solid #999;
      padding-left: 5px !important;
      margin-left: 14px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ced6e9;
    /* background: rgba(0, 0, 0, 0.1); */
    border-radius: 7px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #0a308f;
$dark_gray: #889aa4;
$light_gray: #eee;

.bg-wrap {
  width: 660px;
  height: 450px;
  /* background: url('../../assets/pic/logo.png'); */
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover !important;

  ::v-deep .el-form-item__content {
    display: flex;
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    width: 340px;
    padding: 0 !important;
  }

  .login-btn {
    font-size: 16px;
    letter-spacing: 5px;
    margin-top: 21px;
    width: 100%;
    height: 50px;
  }

  .svg-container {
    padding: 1px 5px 0 15px;
    color: #3c5aa6;
    /* vertical-align: middle; */
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 35px;
    img {
      width: 330px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.footer {
  position: absolute;
  bottom: 20px;
  color: #fff;
  font-size: 12px;
  div {
    display: flex;
    justify-content: center;
  }
}
</style>