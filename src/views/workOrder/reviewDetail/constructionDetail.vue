<template>
  <div class="appointment">
    <!-- 基本信息 -->
    <div class="basic-info">
      <h4>基本信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>施工地址</span>
            <span class="light">上海开发商</span>
          </div>
          <div>
            <span>到达时间</span>
            <span class="light">乐而美装饰公司</span>
          </div>
          <div>
            <span>开始施工时间</span>
            <span class="light">墙面施工</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div style="width: 500px">
            <span>施工户型</span>
            <div class="rooms">
              <span class="light">1 厨</span>
              <span class="light">1 卫</span>
              <span class="light">1 阳台</span>
              <span class="light">1 其他</span>
            </div>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>小区名称</span>
            <span class="light">上海开发商</span>
          </div>
          <div>
            <span>楼号-门牌号</span>
            <span class="light">2203</span>
          </div>
          <div>
            <span>详细地址</span>
            <span class="light">南京托乐嘉</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系人信息 -->
    <div class="basic-info">
      <h4>联系人信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>现场联系人</span>
            <span class="light">无</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">2010-02-02</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>业主</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">2203</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>项目经理姓名</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">2203</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 房屋信息 -->
    <div class="basic-info">
      <h4>房屋信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>排水类型</span>
            <span class="light">无</span>
          </div>
          <div>
            <span>施工类型</span>
            <span class="light">2010-02-02</span>
          </div>
          <div>
            <span>是否做二排</span>
            <span class="light">无</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>施工工艺</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>施工详情单备注</span>
            <span class="light">2203</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 施工确认信息 -->
    <div class="basic-info">
      <h4>施工确认信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>厨房 1</span>
            <span class="light">无</span>
          </div>
          <div>
            <span>卫生间 1</span>
            <span class="light">2010-02-02</span>
          </div>
          <div>
            <span>阳台 1</span>
            <span class="light">无</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>其他 1</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>是否做保护层</span>
            <span class="light">2203</span>
          </div>
          <div>
            <span>施工确认单备注</span>
            <span class="light">2203</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    created() {

    },
    methods: {

    },
  };
</script>

<style lang="scss" scoped>
  .appointment {
    h4 {
      font-size: 15px;
      margin: 10px 0 20px 0;
    }
    .list-items {
      display: flex;
      margin-left: 10px;
      &>div {
        display: flex;
        flex-direction: column;
        width: 270px;
        font-size: 14px;
      }
      .light {
        color: #999;
        margin-top: 7px;
      }
    }
    .rooms {
      span {
        width: 100px;
        display: inline-flex;
      }
    }
  }

  .basic-info {
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }
</style>