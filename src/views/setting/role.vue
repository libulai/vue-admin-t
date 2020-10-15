<template>
  <div class="app-container">
    <div class="content-wrap">
      <div class="content-title">
        <h3>- 数据筛选</h3>
      </div>
      <div class="content-box">
        <div>
          <el-input v-model="search.rolename" placeholder="请输入角色名称"></el-input>
          <el-button type="warning" class="com-btn" @click="fetchData">查询</el-button>
        </div>
      </div>
    </div>

    <div class="content-wrap" style="margin-top:20px">
      <div class="content-title">
        <div>
          <el-button class="com-btn" type="primary" @click="dispatch(false)">添加角色</el-button>
        </div>
      </div>

      <div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column align="center" label="角色名称">
            <template slot-scope="scope">
              {{ scope.row.rolename }}
            </template>
          </el-table-column>
          <el-table-column label="级别" align="center">
            <template slot-scope="scope">
              {{ scope.row.rolelevel }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="是否对外">
            <template slot-scope="scope">
              <span>{{ scope.row.rolestatus==0?'是':'否' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="操作">
            <template slot-scope="scope">
              <span class="detail handle" @click="dispatch(true, scope.row)">编辑</span> 
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
            :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageTotal"></el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="dialog" class="dialog" :close-on-click-modal="false" width="1000px" @closed="clearForm">
      <el-form v-loading='loading' :model="form" :rules="rules" ref="form" label-width="100px" class="dialog-form">
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="form.rolename" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="rolelevel">
          <el-input v-model.number="form.rolelevel" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否对外" prop="rolestatus">
          <el-radio v-model="form.rolestatus" :label="0">是</el-radio>
          <el-radio v-model="form.rolestatus" :label="1">否</el-radio>
        </el-form-item>
        <!-- <el-form-item label="菜单权限" prop="menuids">
          <el-transfer v-model="form.menuids" :data="menus"></el-transfer>
        </el-form-item> -->
        <el-form-item label="菜单权限" prop="menuids">
          <tree-transfer :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" :mode='mode' height='540px' filter
            @addBtn='add' @removeBtn='remove' :defaultTransfer='true' :defaultCheckedKeys="defaultd">
          </tree-transfer>
        </el-form-item>
        <el-form-item label="按钮权限" prop="buttonids">
          <el-transfer v-model="form.buttonids" :data="buttons"></el-transfer>
        </el-form-item>

        <!-- <tree-transfer :from_data='fromData2' :to_data='toData2' :defaultProps="{label:'label'}"
          :mode='mode' height='540px' filter openAll :defaultTransfer='true' :defaultCheckedKeys="defaultd">
        </tree-transfer> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import treeTransfer from 'el-tree-transfer'

  export default {
    name: 'Role',
    components: { treeTransfer },
    data() {
      return {
        defaultd: [],
        loading: false,
        mode: "transfer", // transfer addressList
        fromData: [],
        toData: [],
        treetitle: '',
        pageSize: 10,
        pageTotal: 0,
        pageIndex: 1,
        search: {
          rolename: ""
        },
        isModify: false,
        menus: [],
        buttons: [],
        form: {
          rolename: "",
          rolelevel: 99,
          rolestatus: 1,
          menuids: [],
          buttonids: []
        },
        list: null,
        listLoading: true,
        dialog: false,
        title: '',
        rules: {
          rolename: [
            { required: true, message: "请输入角色名称", trigger: "blur" }
          ],
          // buttonids: [
          //   { required: true, message: "请选择权限按钮", trigger: "blur" }
          // ]
        }
      };
    },
    created() {
      this.fetchData();
    },
    watch: {
      pageIndex(index) {
        if (index) this.fetchData(index);
      },
    },
    methods: {
      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        // console.log("fromData:", fromData);
        // console.log("toData:", toData);
        // console.log("obj:", obj);
        this.toData = toData
      },
      // 监听穿梭框组件移除
      remove(fromData, toData, obj) {
        this.toData = toData
        // console.log("obj:", obj);
      },
      async fetchData() {
        this.listLoading = true;
        let rs = await this.$http({
          url: `/admin/rolelist?rolename=${this.search.rolename}&page.pageIndex=${this.pageIndex}`,
          method: "get"
        });

        this.list = rs.data;
        this.pageTotal = rs.total;
        this.listLoading = false;
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
      },
      async submit() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            if (this.toData.length == 0) {
              this.$message({
                message: '请选择菜单',
                type: 'error'
              })
              return
            }
            this.dialog = false;
            let to = this.toData

            let toLlist = []
            to.forEach(i => {
              toLlist.push(i.id)
              if (i.children) {
                i.children.forEach(j => {
                  toLlist.push(j.id)
                })
              }
            })
            // console.log(toLlist, '***')
            this.form.menuids = Array.isArray(toLlist) ? toLlist.join(',') : ''
            this.form.buttonids = Array.isArray(this.form.buttonids) ? this.form.buttonids.join(',') : ''

            let rs = await this.$http({
              url: `/admin/${this.isModify ? 'dorolemod' : 'dorolenew'}`,
              method: "post",
              data: this.form
            });

            if (rs.success == 'true') this.$message({
              message: '保存成功',
              type: 'success'
            })

            this.$refs.form.resetFields()
            this.fetchData()
            this.toData = []
          }
        });
      },
      clearForm() {
        this.$refs.form.resetFields();
        this.toData = []
      },
      cancel() {
        this.dialog = false;
        this.$refs.form.resetFields()
        this.toData = []
      },
      async dispatch(isModify, data) {
        this.dialog = true;
        this.title = isModify ? "编辑角色" : "添加角色"
        this.isModify = isModify;
        this.loading = true

        this.initComp()
        await this.initRole()

        if (this.isModify) {
          this.getDepInfos(data)
          this.form.roleid = data.roleid
          this.getComp()
          this.getRole()
        }
      },
      async getDepInfos(data) {
        let rs = await this.$http({
          url: `/admin/roledetail?roleid=${data.roleid}`,
          method: "get"
        });

        for (let i in this.form) {
          this.form[i] = rs.data[0][i]
        }

        // Object.assign(this.form, rs.data[0])
      },
      async initComp(data) {
        let rs = await this.$http({
          url: `/admin/buttonlist`,
          method: "get"
        });

        const generateData = _ => {
          let data = [];
          let d = rs.data
          for (let i = 0; i < d.length; i++) {
            data.push({
              key: d[i].buttonid,
              label: d[i].buttonname
            });
          }
          return data;
        };

        this.buttons = generateData()
      },
      async initRole(c) {
        let rs = await this.$http({
          url: `/admin/menulist`,
          method: "get"
        });

        this.loading = false

        // if (c) {
        //   let selectids = c.map(i => i.menulevel != 2 && i.menuid)
        //   rs.data = rs.data.filter(i => !selectids.includes(i.menuid))
        // }

        this.fromData = this.generateData(rs.data)
        // this.menus = generateData(rs.data)
      },
      generateData(data, pid = 1) {
        let tree = []
        let obj = {}
        let children
        data.forEach((item, index) => {
          if (data[index].pmenuid == pid) {
            obj = {
              id: item.menuid,
              pid: item.pmenuid == 1 ? 0 : item.pmenuid,
              label: item.menuname
            }
            children = this.generateData(data, item.menuid)
            if (children && children.length > 0) {
              obj.children = children
            }
            tree.push(obj)
          }
        })
        return tree
      },
      async getComp() {
        let rs = await this.$http({
          url: `/admin/buttonrolelist`,
          method: "get",
          params: {
            roleid: this.form.roleid
          }
        });

        this.form.buttonids = rs.data.map(i => i.buttonid)
      },
      async getRole() {
        let rs = await this.$http({
          url: `/admin/menurolelists`,
          method: "get",
          params: {
            roleid: this.form.roleid
          }
        });
        // this.initRole(rs.data)
        // this.form.menuids = rs.data.map(i => i.menuid)
        this.defaultd = rs.data.map(i => i.menulevel != 2 && i.menuid)
        // this.toData = this.generateData(rs.data)
      }
    },
  };
</script>

<style lang="scss" scoped>
  .content-box {
    &>div {
      display: flex;
      .el-input,
      .el-select,
      .el-date-editor {
        width: 20%;
        margin-right: 30px;
      }
    }
  }

  ::v-deep .dialog {
    .el-dialog {
      width: 1000px !important;
    }
  }
</style>