<template>
  <div class="app-container">
    <div class="content-wrap">
      <div style="position: relative;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="按数量" name="first">
            <c1></c1>
          </el-tab-pane>
          <el-tab-pane label="按户型" name="second">
            <c2 :list="data2"></c2>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import C1 from './C1.vue'
import C2 from './C2.vue'
export default {
  name: 'SettingC',
  components: {
    C1,
    C2
  },
  data() {
    return {
      activeName: 'first',
      data2: [],
      data1: []
    };
  },
  created() {
    this.fetchData()

    bus.$on('successed', () => {
      this.fetchData();
    })
  },
  methods: {
    async fetchData() {
      let rs = await this.$http({
        url: `/admin/housetypescorekllist`,
        method: 'get'
      });

      this.data2 = rs.data;
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  beforeDestroy(){
      bus.$off('successed');//组件销毁时关闭监听
  }
};
</script>

<style lang="scss" scoped>
</style>