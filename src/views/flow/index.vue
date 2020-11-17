<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 流程图</h3>
      </div>
      <div class="content-box">
       
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "Flow",
  data() {
    return {

    };
  },
  watch: {

  },
  created() {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.content-box {
  & > div {
    display: flex;
    .el-input,
    .el-select,
    .el-date-editor {
      /* width: 20%; */
      margin-right: 30px;
    }
  }
}
</style>