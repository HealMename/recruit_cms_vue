<template>
  <el-tabs v-model="activeName" >
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
      label="名称" align="center">
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
            <el-button size="mini" @click="addOrUpdateHandler(scope.row)">修改<i class="el-icon-edit el-icon--right"/></el-button>
            <el-button size="mini" type="danger" @click="del_M(scope.row.id)" v-if="scope.row.is_del === 1">删除<i class="el-icon-delete el-icon--right"/></el-button>
            <el-button size="mini" type="danger" @click="del_M(scope.row.id)" disabled v-if="scope.row.is_del === 0">删除<i class="el-icon-delete el-icon--right"/></el-button>
    </template>
    </el-table-column>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="编辑模块" name="second">

    </el-tab-pane>
  </el-tabs>
</template>
<script>

export default {
  data() {
    return {
    activeName: "list",
    menuList: [],
      loading: false,
    };
  },
  created() {
    this.get_data()
  },
  mounted() {

  },
  filters: {

  },
  components: {
  },
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
    del_M(id_){
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
  }

};
</script>
<style lang="scss" scoped>


</style>
