<template>
  <div class="appointment">
    <!-- 基本信息 -->
    <div class="basic-info">
      <h4>施工信息</h4>
      <div>

        <div class="list-items">
          <div>
            <span>验收地址</span>
            <span class="light">{{data.address || '无'}}</span>
          </div>
          <div>
            <span>验收户型</span>
            <div class="rooms">
              <span class="light">{{data.Receipt20}} 厨</span>
              <span class="light">{{data.Receipt21}} 卫</span>
              <span class="light">{{data.Receipt22}} 阳台</span>
              <span class="light">{{data.Receipt23}} 其他</span>
            </div>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px 0 10px">
          <div>
            <span>下次业主是否到场</span>
            <span class="light">{{data.receipt && data.receipt.receipt11 || '无'}}</span>
          </div>
          <div>
            <span>是否满足验收条件</span>
            <span class="light">{{completestatus(data.completestatus) || '无'}}</span>
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
            <span class="light">{{data.receipt && data.receipt.receipt44 || '无'}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.receipt && data.receipt.receipt45 || '无'}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>业主</span>
            <span class="light">{{data.ownername || '无'}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.ownerphone || '无'}}</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>项目经理姓名</span>
            <span class="light">{{data.receipt && data.receipt.receipt13 || '无'}}</span>
          </div>
          <div>
            <span>联系电话</span>
            <span class="light">{{data.receipt && data.receipt.receipt14 || '无'}}</span>
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
            <span class="light">{{data.receipt && data.receipt.receipt7 || '无'}}</span>
          </div>
          <div>
            <span>经销商</span>
            <span class="light">{{data.receipt && data.receipt.receipt5 || '无'}}</span>
          </div>
          <div>
            <span>经销商电话</span>
            <span class="light">{{data.receipt && data.receipt.receipt42 || '无'}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>装修公司</span>
            <span class="light">{{data.receipt && data.receipt.receipt6 || '无'}}</span>
          </div>
          <div>
            <span>二级网点</span>
            <span class="light">{{data.receipt && data.receipt.receipt43 || '无'}}</span>
          </div>
          <div>
            <span>购买方式</span>
            <span class="light">{{data.receipt && data.receipt.receipt4 || '无'}}</span>
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
            <span class="light">{{data.receipt && data.receipt.receipt1 || '无'}}</span>
          </div>
          <div>
            <span>装修情况</span>
            <span class="light">{{data.receipt && data.receipt.receipt2 || '无'}}</span>
          </div>
          <div>
            <span>房屋类型</span>
            <span class="light">{{data.receipt && data.receipt.receipt9 || '无'}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px">
          <div>
            <span>排水类型</span>
            <span class="light">{{data.receipt && data.receipt.receipt48 || '无'}}</span>
          </div>
          <div v-show="recepits.receipt48=='同层排水'">
            <span>施工属性</span>
            <span class="light">{{recepits.receipt49 || '无'}}</span>
          </div>
          <div>
            <span>是否需要二次排水</span>
            <span class="light">{{data.receipt && data.receipt.receipt38 || '无'}}</span>
          </div>
        </div>

        <div class="list-items">
          <div>
            <span>施工工艺</span>
            <span class="light">{{data.sgtype || '无'}}</span>
          </div>
          <div>
            <span>验收工艺</span>
            <span class="light">{{data.ystype || '无'}}</span>
          </div>
          <div>
            <span>验收详情单备注</span>
            <span class="light">{{data.orderdesc || '无'}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="basic-info">
      <h4>验收信息</h4>
      <div>
        <div class="list-items items-pad">
          <div v-for="i in recepits.klOrderReceiptAreas">
            <span>{{areaName(i)}}</span>
            <span class="light">{{i.area}}</span>
          </div>
          <div>
            <span>总面积</span>
            <span class="light">{{recepits.receipt51 || '无'}}</span>
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
            <span class="light">{{recepits.receipt52 || '无'}}</span>
          </div>
          <div v-for="i in recepits.klOrderReceiptAreaPs" :key="i.type">
            <span>{{areaName(i)}}</span>
            <span class="light">{{i.area}}</span>
          </div>
          <div>
            <span>总面积</span>
            <span class="light">{{recepits.receipt55 || '无'}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px 0 10px">
          <div>
            <span>验收确认单备注</span>
            <span class="light">{{recepits.receipt60 || '无'}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 照片 -->
    <div class="basic-info">
      <h4>验收照片</h4>
      <div>
        <div class="list-pic">
          <div v-for="i in pics" :key="i.id">
            <el-image style="width: 100px; height: 100px" :src="i.picturename" :preview-src-list="[i.picturename]">
            </el-image>
            <div class=""></div>
            <p>{{picType(i.type) + i.pos }}</p>
          </div>
          <div class="list-items">
            <span class="light" v-if="pics.length==0">无</span>
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
      pics: []
    };
  },
  props: ['data', 'type', 'recepits'],
  created() {
    this.initPic()
  },
  computed: {
    completestatus(type) {
      return function (type) {
        let TYPE_MAP = {
          1: '正常完成',
          2: '改约日期',
          3: '到场改约日期',
          4: '电话取消',
          5: '到场取消',
          6: '未蓄水',
          7: '防水层被覆盖',
          8: '使用咖乐意外产品',
          9: '施工质量不满足要求',
          10: '防水层被破坏',
          11: '其他——填写具体原因',
        }

        return TYPE_MAP[type]
      }
    },
    picType(val) {
      return function (val) {
        let S_MAP = {
          1: '厨房',
          2: '卫生间',
          3: '阳台',
          4: '其他',
        }

        return S_MAP[Number(val)]
      }
    },
    sgtype(val) {
      return function (val) {
        let S_MAP = {
          1: '隔层墙地施工',
          2: '墙施工',
          3: '地施工',
          4: '同层底面施工',
          5: '同层墙地施工'
        }

        return S_MAP[Number(val)]
      }
    },
    ystype(val) {
      return function (val) {
        let S_MAP = {
          1: '面层验收',
          2: '同层排水底层验收',
        }

        return S_MAP[Number(val)]
      }
    },
    areaName(data) {
      return function (data) {
        const TYPE_MAP = {
          1: '厨房',
          2: '卫生间',
          3: '阳台',
          4: '其他'
        }
        return TYPE_MAP[data.type] + ' ' + data.pos
      }
    },
  },
  methods: {
    async initPic() {
      let rs = await this.$http({
        url: `/kl/klorderreceiptpicture?orderid=${this.data.orderid}`,
        method: "get",
      });

      this.pics = rs.data
      console.log(this.pics)
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