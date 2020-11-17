<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- page1</h3>
      </div>
<!-- 
      <ul>
        <li style="background:rgb(73, 119, 252)">
          <div class="title">demo1</div>
          <div class="num">1</div>
          <img :src="bg1" alt="">
        </li>
        <li style="background:rgb(11, 49, 144)">
          <div class="title">demo2</div>
          <div class="num">2</div>
          <img :src="bg2" alt="">
        </li>
        <li style="background:rgb(46, 12, 147)">
          <div class="title">demo3</div>
          <div class="num">3</div>
          <img :src="bg3" alt="">
        </li>
        <li style="margin:0;background:rgb(255, 168, 63)">
          <div class="title">demo4</div>
          <div class="num">4</div>s
          <img :src="bg4" alt="">
        </li>
      </ul> -->
    </div>

    <!-- <div class="content-bottom">
      <div class="content-wrap" style="margin-right: 20px">
        <div class="content-title">
          <h3>- page2</h3>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Layout from '@/layout'

export default {
  name: "Home",
  data() {
    return {
      bg1: require('@/assets/pic/shigongzongshu.png'),
      bg2: require('@/assets/pic/shigongtongshu.png'),
      bg3: require('@/assets/pic/yanshouhushu.png'),
      bg4: require('@/assets/pic/yanshoutongshu.png'),
      status: 1,
      info: {}
    }
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.content-wrap {
  .content-title {
    ::v-deep .el-button {
      padding: 7px 14px;
      width: 130px;
      & > span {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
    .el-button--primary {
      background: rgb(229, 236, 255) !important;
      border: none;
      color: #666;
    }
    .el-button--primary:focus,
    .el-button--primary:hover {
      color: #666;
    }
  }

  ul {
    display: flex;
    li {
      flex: 1;
      height: 140px;
      background: red;
      margin-right: 15px;
      border-radius: 6px;
      padding: 28px 20px;
      color: #eaeaea;
      position: relative;
      img {
        position: absolute;
        width: 85px;
        right: 21px;
        bottom: 16px;
        opacity: 0.5;
      }
      .title {
        padding-left: 13px;
        border-left: 2px solid;
        height: 22px;
        line-height: 22px;
        letter-spacing: 2px;
      }
      .num {
        font-size: 30px;
        font-weight: 600;
        margin-top: 22px;
      }
    }
  }
}

.content-bottom {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  & > div {
    flex: 1;
  }
}

</style>