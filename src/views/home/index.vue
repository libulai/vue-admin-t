<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 服务数据</h3>
        <el-dropdown placement="bottom-start">
          <el-button type="primary">
            昨日
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <ul>
        <li style="background:rgb(73, 119, 252)">
          <div class="title">施工总数</div>
          <div class="num">1833</div>
          <img :src="bg1" alt="">
        </li>
        <li style="background:rgb(11, 49, 144)">
          <div class="title">施工桶数</div>
          <div class="num">1833</div>
          <img :src="bg2" alt="">
        </li>
        <li style="background:rgb(46, 12, 147)">
          <div class="title">验收户数</div>
          <div class="num">1833</div>
          <img :src="bg3" alt="">
        </li>
        <li style="margin:0;background:rgb(255, 168, 63)">
          <div class="title">验收桶数</div>
          <div class="num">1833</div>
          <img :src="bg4" alt="">
        </li>
      </ul>
    </div>

    <div class="content-bottom">
      <div class="content-wrap" style="margin-right: 20px">
        <div class="content-title">
          <h3>- 超期未完成</h3>
        </div>
        <div class="table">
          <div class="tr tr-t">
            <div>姓名</div>
            <div>单数</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>

          <!-- <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div class="detail">12</div>
          </div> -->

        </div>
      </div>
      <div class="content-wrap">
        <div class="content-title">
          <h3>- 昨日新增通路</h3>
        </div>
        <div class="table overflow">
          <div class="tr tr-t">
            <div>类型</div>
            <div>通路信息</div>
            <div>录入人</div>
          </div>
          <div class="tr tr-d">
            <div>张三</div>
            <div>12</div>
            <div>李四</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Home",
    data() {
      return {
        bg1: require('@/assets/pic/shigongzongshu.png'),
        bg2: require('@/assets/pic/shigongtongshu.png'),
        bg3: require('@/assets/pic/yanshouhushu.png'),
        bg4: require('@/assets/pic/yanshoutongshu.png')
      }
    },
    computed: {
      ...mapGetters(["name"]),
    },
  };
</script>

<style lang="scss" scoped>
  .content-wrap {
    .content-title {
      ::v-deep .el-button {
        padding: 7px 14px;
        width: 130px;
        &>span {
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
    &>div {
      flex: 1;
    }
  }

  .table {
    .tr {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      height: 40px;
      &>div {
        width: 180px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
    .tr-t {
      background: rgb(236, 241, 255);
      /* font-weight: 600; */
      color: #111;
    }
    .tr-d {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #f1f1f1;
      color: #888;
    }
    .detail {
      color: rgb(73, 119, 252);
      cursor: pointer;
    }
  }
</style>