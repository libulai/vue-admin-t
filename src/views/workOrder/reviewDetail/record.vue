<template>
  <div class="appointment">

    <!-- 物料核销信息 -->
    <div class="basic-info">
      <h4>物料核销信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>联系人 A</span>
            <span class="light">{{recepits.receipt56}}</span>
          </div>
          <div>
            <span>联系方式 A</span>
            <span class="light">{{recepits.receipt12}}</span>
          </div>
          <div>
            <span>A积分</span>
            <span class="light">{{recepits.receipt58}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>联系人 C</span>
            <span class="light">{{recepits.receipt57}}</span>
          </div>
          <div>
            <span>联系方式 C</span>
            <span class="light">{{recepits.receipt50}}</span>
          </div>
          <div>
            <span>C积分</span>
            <span class="light">{{recepits.receipt59}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px" v-for="i in goods">
          <div>
            <span>物料名称</span>
            <span class="light">{{i.productname}}</span>
          </div>
          <div>
            <span>数量</span>
            <span class="light">{{i.num}}</span>
          </div>
          <div>
            <span>核销类型</span>
            <span class="light">{{i.code?'防伪码核销':'手动核销'}}</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>质保卡号</span>
            <span class="light">{{recepits.receipt8}}</span>
          </div>
          <div>
            <span>质保时间</span>
            <span class="light">{{ctime(data.completetime)}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      goods: []
    };
  },
  props: ['data', 'type', 'recepits'],
  watch: {
    data(val) {
      this.init()
    }
  },
  computed: {
    ctime(data) {
      return function (data) {
        if (data) return moment(data).add(5, 'years').calendar()
        else return ''
      }
    }
  },
  created() {

  },
  methods: {
    async init() {
      let id = this.$route.query.id
      let rs = await this.$http({
        url: `/kl/klorderproductlist?orderid=${id}`,
        method: "get"
      });

      this.goods = rs.data
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