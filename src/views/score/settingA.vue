<template>
  <div class="app-container">
    <div class="content-wrap">
      <div style="position: relative;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="按数量" name="first">
            <a1></a1>
          </el-tab-pane>
          <el-tab-pane label="按户型" name="second">
            <a2 :list="data2"></a2>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import A1 from './A1.vue'
import A2 from './A2.vue'
export default {
  name: 'SettingA',
  components: {
    A1,
    A2
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