<template>
  <div class="appointment">

    <!-- 物料核销信息 -->
    <div class="basic-info">
      <h4>物料核销信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>联系人A</span>
            <span class="light">无</span>
          </div>
          <div>
            <span>联系方式A</span>
            <span class="light">2010-02-02</span>
          </div>
          <div>
            <span>A积分</span>
            <span class="light">无</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>联系人B</span>
            <span class="light">否</span>
          </div>
          <div>
            <span>联系方式B</span>
            <span class="light">2203</span>
          </div>
          <div>
            <span>B积分</span>
            <span class="light">2203</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>物料名称</span>
            <span class="light">{{goods.materialname}}</span>
          </div>
          <div>
            <span>数量</span>
            <span class="light">2203</span>
          </div>
          <div>
            <span>核销类型</span>
            <span class="light">2203</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>质保卡号</span>
            <span class="light">无</span>
          </div>
          <div>
            <span>质保时间</span>
            <span class="light">2010-02-02</span>
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
      goods:{}
    };
  },
  props: ['data', 'type'],
  watch:{
    data(val){
      this.init()
    }
  },
  created() {

  },
  methods: {
    async init() {
      let rs = await this.$http({
        url: `/kl/klordermateriallist?orderid=${this.data.orderid}`,
        method: "get"
      });

      this.goods = rs[0]
    }
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