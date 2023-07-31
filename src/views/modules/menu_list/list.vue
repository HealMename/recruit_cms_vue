<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="模块列表" name="list">

      <el-table
          :data="menuList"
          border
          style="width: 100%" size="mini" v-loading="loading">
        <el-table-column
            prop="id"
            label="ID"
            width="80" align="center">
        </el-table-column>
        <el-table-column
            prop="mod_name"
            label="名称" >
          <template slot-scope="scope">
            <span v-if="scope.row.parent_id === 0"><b>{{scope.row.mod_name}}</b></span>
            <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{scope.row.mod_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="parent_id" align="center"
            label="类型" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.parent_id === 0">一级</span>
            <span v-else>二级</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="mod_path" align="center"
            label="路由">
        </el-table-column>
        <el-table-column
            prop="mod_order" width="80"
            label="排序" align="center">
        </el-table-column>
        <el-table-column
            prop="address" align="center"
            label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="addOrUpdateHandler(scope.row)">修改<i class="el-icon-edit el-icon--right"/>
            </el-button>
            <el-button size="mini" type="danger" @click="del_M(scope.row.id)" v-if="scope.row.is_del === 1">删除<i
                class="el-icon-delete el-icon--right"/></el-button>
            <el-button size="mini" type="danger" @click="del_M(scope.row.id)" disabled v-if="scope.row.is_del === 0">
              删除<i class="el-icon-delete el-icon--right"/></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="新增模块" name="add">
      <el-form ref="form" :model="form" label-width="80px" size="mini" style="width: 50%" :rules="rules">
        <el-form-item label="父级模块" >
          <el-input v-model.number="form.parent_id" placeholder="输入父级模块ID/子级菜单不填" ></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="mod_name">
          <el-input v-model="form.mod_name" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item label="模块路由" prop="mod_path">
          <el-input v-model="form.mod_path" placeholder="请输入模块路由"></el-input>
        </el-form-item>
        <el-form-item label="模块排序" prop="mod_order">
          <el-input v-model.number="form.mod_order" placeholder="请输入模块排序"></el-input>
        </el-form-item>
        <el-form-item label="模块图标">
          <el-input v-model.number="form.icon" placeholder="请输入模块图标"></el-input>
        </el-form-item>
        <el-form-item label="">
           <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="编辑模块" v-if="form.id" name="edit">
      <el-form ref="form" :model="form" label-width="80px" size="mini" style="width: 50%" :rules="rules">
        <el-form-item label="父级模块" >
          <el-input v-model.number="form.parent_id" placeholder="输入父级模块ID/子级菜单不填" ></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="mod_name">
          <el-input v-model="form.mod_name" placeholder="请输入模块名称"></el-input>
        </el-form-item>
        <el-form-item label="模块路由" prop="mod_path">
          <el-input v-model="form.mod_path" placeholder="请输入模块路由"></el-input>
        </el-form-item>
        <el-form-item label="模块排序" prop="mod_order">
          <el-input v-model.number="form.mod_order" placeholder="请输入模块排序"></el-input>
        </el-form-item>
        <el-form-item label="模块图标">
          <el-input v-model.number="form.icon" placeholder="请输入模块图标"></el-input>
        </el-form-item>
        <el-form-item label="">
           <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>

export default {
  data() {
    return {
      activeName: "list",
      menuList: [],
      form: {
        id: '',
        parent_id: '',
        mod_name: '',
        mod_path: '',
        mod_order: '',
        icon: ""
      },
      rules: {
        mod_name: [
            { required: true, message: '请输入模块名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        mod_path: [
            { required: true, message: '请输入模块路由', trigger: 'blur' },
        ],
        mod_order: [
            { required: true, message: '请输入模块排序', trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  created() {
    this.get_data()
  },
  mounted() {

  },
  filters: {},
  components: {},
  methods: {
    // 获取菜单
    get_data: function () {
      this.loading = true;
      this.$http({
        url: `${DOMAIN_API_SYS}/sys_m_module/`,
        method: "get",
      }).then(({data}) => {
        this.menuList = data.data;
        this.loading = false;
      })
    },
    del_M(id_) {
      this.$confirm('确定删除吗, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        this.$http.post(DOMAIN_API_SYS + "/sys_m_module/del/", {id: id_, status: -1}).then(res => {
          this.$layer_message("已删除", 'success')
          this.get_data()
        }).catch((res) => {
          this.$layer_message(res.result)
        })
      })
    },
    addOrUpdateHandler(row) {
      this.activeName = 'edit'
      this.form = row
    },
    handleClick(tab, event) {
      if (tab.name !== 'edit'){
        this.form = {
          id: '',
          parent_id: '',
          mod_name: '',
          mod_path: '',
          mod_order: '',
          icon: ""
        }
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.loading = true;
            this.$http.post(DOMAIN_API_SYS + "/sys_m_module/add/", this.form).then(res => {
              this.$layer_message("操作成功", 'success')
              this.activeName = 'list'
              this.form = {
                id: '',
                parent_id: '',
                mod_name: '',
                mod_path: '',
                mod_order: '',
                icon: ""
              }
              this.get_data()
            }).catch((res) => {
              this.$layer_message(res.result)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }

};
</script>
<style lang="scss" scoped>


</style>
