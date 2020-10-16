<template>
  <div class="appointment">
    <!-- 基本信息 -->
    <div class="basic-info">
      <h4>施工信息</h4>
      <div>

        <div class="list-items">
          <div>
            <span>验收地址</span>
            <span class="light">{{data.communityname + data.address}}</span>
          </div>
          <div>
            <span>验收户型</span>
            <div class="rooms">
              <span class="light">{{data.receipt20}} 厨</span>
              <span class="light">{{data.receipt21}} 卫</span>
              <span class="light">{{data.receipt22}} 阳台</span>
              <span class="light">{{data.receipt23}} 其他</span>
            </div>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px 0 10px">
          <div>
            <span>下次业主是否到场</span>
            <span class="light">{{data.receipt && data.receipt.receipt11}}</span>
          </div>
          <div>
            <span>是否满足验收条件</span>
            <span class="light">{{data.completestatus}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系人信息 -->
    <div class="basic-info">
      <h4>联系方式</h4>
      <div>
        <div class="list-items">
          <div>
            <span>现场联系人</span>
            <span class="light">{{data.receipt && data.receipt.receipt44}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.receipt && data.receipt.receipt45}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>业主</span>
            <span class="light">{{data.ownername}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.ownerphone}}</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>项目经理姓名</span>
            <span class="light">{{data.receipt && data.receipt.receipt13}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.receipt && data.receipt.receipt14}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 验收信息 -->
    <div class="basic-info">
      <h4>验收信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>服务凭证号</span>
            <span class="light">{{data.receipt && data.receipt.receipt7}}</span>
          </div>
          <div>
            <span>经销商</span>
            <span class="light">{{data.receipt && data.receipt.receipt5}}</span>
          </div>
          <div>
            <span>经销商电话</span>
            <span class="light">{{data.receipt && data.receipt.receipt42}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>装修公司</span>
            <span class="light">{{data.receipt && data.receipt.receipt6}}</span>
          </div>
          <div>
            <span>二级网点</span>
            <span class="light">{{data.receipt && data.receipt.receipt43}}</span>
          </div>
          <div>
            <span>购买方式</span>
            <span class="light">{{data.receipt && data.receipt.receipt4}}</span>
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
            <span>小区情况</span>
            <span class="light">{{data.receipt && data.receipt.receipt1}}</span>
          </div>
          <div>
            <span>装修情况</span>
            <span class="light">{{data.receipt && data.receipt.receipt2}}</span>
          </div>
          <div>
            <span>房屋类型</span>
            <span class="light">{{data.receipt && data.receipt.receipt9}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>排水类型</span>
            <span class="light">{{data.receipt && data.receipt.receipt48}}</span>
          </div>
          <div>
            <span>施工属性</span>
            <span class="light">{{data.ystype}}</span>
          </div>
          <div>
            <span>是否需要二次排水</span>
            <span class="light">{{data.receipt && data.receipt.receipt38}}</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>施工工艺</span>
            <span class="light">{{data.sgtype}}</span>
          </div>
          <div>
            <span>验收工艺</span>
            <span class="light">{{data.ystype}}</span>
          </div>
          <div>
            <span>验收详情单备注</span>
            <span class="light">{{data.orderdesc}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="basic-info">
      <h4>验收信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>厨房 1</span>
            <span class="light">无</span>
          </div>
          <div>
            <span>厨房 2</span>
            <span class="light">2010-02-02</span>
          </div>
          <div>
            <span>卫生间 1</span>
            <span class="light">无</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>卫生间 2</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>阳台 1</span>
            <span class="light">2203</span>
          </div>
          <div>
            <span>阳台 2</span>
            <span class="light">2203</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px 0 10px">
          <div>
            <span>其他 1</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>其他 2</span>
            <span class="light">2203</span>
          </div>
           <div>
            <span>总面积</span>
            <span class="light">2203</span>
          </div>
        </div>
      </div>
    </div>

    <div class="basic-info">
      <h4>保护层</h4>
      <div>
        <div class="list-items">
          <div>
            <span>是否做保护层</span>
            <span class="light">是</span>
          </div>
          <div>
            <span>厨房 1</span>
            <span class="light">无</span>
          </div>
          <div>
            <span>厨房 2</span>
            <span class="light">2010-02-02</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>卫生间 1</span>
            <span class="light">无</span>
          </div>
          <div>
            <span>卫生间 2</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>阳台 1</span>
            <span class="light">2203</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>阳台 2</span>
            <span class="light">2203</span>
          </div>
          <div>
            <span>其他 1</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>其他 2</span>
            <span class="light">2203</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px 0 10px">
          <div>
            <span>总面积</span>
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
  props: ['data', 'type'],
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
    & > div {
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
    width: 500px;
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