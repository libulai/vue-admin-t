<template>
  <div class="app-container">
    <div class="content-wrap">
      <div style="position: relative;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="按数量" name="first">
            <a1></a1>
          </el-tab-pane>
          <el-tab-pane label="按户型" name="second">
            
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import A1 from './A1.vue'

  export default {
    components: {
      A1
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    created() {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    },
  };
</script>

<style lang="scss" scoped>
  
</style>