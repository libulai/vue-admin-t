<template>
  <div class="appointment">
    <!-- 基本信息 -->
    <div class="basic-info">
      <h4>施工信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>施工地址</span>
            <span class="light">{{data.communityname + data.address}}</span>
          </div>
          <div>
            <span>施工户型</span>
            <div class="rooms">
              <span class="light">{{data.receipt20}} 厨</span>
              <span class="light">{{data.receipt21}} 卫</span>
              <span class="light">{{data.receipt22}} 阳台</span>
              <span class="light">{{data.receipt23}} 其他</span>
            </div>
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

    <!-- 房屋信息 -->
    <div class="basic-info">
      <h4>房屋信息</h4>
      <div>
        <div class="list-items">
          <div>
            <span>排水类型</span>
            <span class="light">{{data.receipt && data.receipt.receipt48}}</span>
          </div>
          <div>
            <span>施工属性</span>
            <span class="light">{{data.receipt && data.receipt.receipt49}}</span>
          </div>
          <div>
            <span>是否做二排</span>
            <span class="light">{{data.receipt && data.receipt.receipt38}}</span>
          </div>
        </div>

        <div class="list-items" style="margin: 35px 10px 0 10px">
          <div>
            <span>施工工艺</span>
            <span class="light">{{sgtype(data.sgtype)}}</span>
          </div>
          <div>
            <span>施工详情单备注</span>
            <span class="light">{{data.orderdesc}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 现场施工照片 -->
    <!-- <div class="basic-info">
      <h4>现场施工照片</h4>
      <div>
        <div class="list-pic">
          <div>
            <el-image style="width: 100px; height: 100px" :src="bg1" :preview-src-list="list1">
            </el-image>
            <div class=""></div>
            <p>卫生间</p>
          </div>
          <div>
            <el-image style="width: 100px; height: 100px" :src="bg1" :preview-src-list="list1">
            </el-image>
            <p>厨房</p>
          </div> 
          <div>
            <el-image style="width: 100px; height: 100px" :src="bg1" :preview-src-list="list1">
            </el-image>
            <p>流转单</p>
          </div>
          <div>
            <el-image style="width: 100px; height: 100px" :src="bg1" :preview-src-list="list1">
            </el-image>
            <p>客户签名</p>
          </div>
        </div>
      </div>
    </div> -->

    <!-- 施工确认信息 -->
    <div class="basic-info">
      <h4>安装信息</h4>
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

    <!-- <div class="basic-info">
      <h4>保护层</h4>
      <div>
        <div class="list-items">
          <div>
            <span>是否做保护层</span>
            <span class="light">{{data.receipt && data.receipt.receipt52}}</span>
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

        <div class="list-items" style="margin: 35px 10px 0 10px">
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
      </div>
    </div> -->

    <div class="basic-info">
      <h4>实际物料使用量</h4>
      <div>
        <div class="list-items">
          <div>
            <span>物料 1</span>
            <span class="light">2 桶/组</span>
          </div>
          <div>
            <span>物料 2</span>
            <span class="light">2 桶/组</span>
          </div>
          <div>
            <span>施工确认单备注</span>
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
      bg1: require('@/assets/pic/demo.png'),
      list1: [require('@/assets/pic/demo.png')]
    };
  },
  props: ['data', 'type'],
  created() {

  },
  computed: {
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
    }
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
  .list-pic {
    display: flex;
    .el-image {
      width: 200px !important;
      height: 140px !important;
    }
    & > div {
      margin-right: 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      p {
        margin-top: 5px;
      }
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