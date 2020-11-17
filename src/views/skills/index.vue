<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 趋势</h3>
      </div>
      <div class="content-box">

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="green" />
        </svg>

        <svg-icon iconClass='dashboard'></svg-icon>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "Skills",
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