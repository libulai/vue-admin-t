<template>
  <div class="orderState" style="margin-top: 10px">
    <el-table :data="list" element-loading-text="Loading" fit highlight-current-row border>
      <el-table-column label="户型" align="center">
        <template slot-scope="scope">
          {{ scope.row.housetypename }}
        </template>
      </el-table-column>
      <el-table-column label="积分数值" align="center">
        <template slot-scope="scope">
          {{ scope.row.scorea }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作">
        <template slot-scope="scope">
          <span class="detail handle" @click="dispatch(scope.row)">设置积分</span>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog title="设置积分" :visible.sync="dialog1">

      <el-form :model="form" :rules="rules3" ref="form" label-width="100px" class="dialog3-ruleForm">
        <el-form-item label="分值" prop="scorec">
          <el-input v-model.number="form.scorec" placeholder="设置积分"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import bus from '@/utils/bus'
  export default {
    data() {
      return {
        dialog1: false,
        form: {
          scorea: '',
          scorec: '',
          id: ''
        },
        rules3: {
          scorec: [
            { type: 'number', required: true, message: "必须是数值", trigger: "blur" }
          ]
        }
      };
    },
    props: ['list'],
    created() {

    },
    methods: {
      dispatch(data) {
        this.dialog1 = true;
        this.getDepInfos(data)
        this.form.id = data.id
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/housetypescorekldetail?id=${data.id}`,
          method: "get"
        });

        this.form.scorec = rs.data[0].scorec
        this.form.scorea = rs.data[0].scorea
      },
      cancel() {
        this.dialog1 = false;
        this.$refs.form.resetFields()
      },
      async submit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.dialog1 = false;
            let rs = await this.$http({
              url: `/admin/dohousetypescoreklmod`,
              method: "post",
              data: this.form
            });

            if (rs.success == 'true') this.$message({
              message: '保存成功',
              type: 'success'
            })

            this.$refs.form.resetFields();
            bus.$emit('successed')
          }
        });

      },
    },
  };
</script>

<style lang="scss" scoped>
</style>