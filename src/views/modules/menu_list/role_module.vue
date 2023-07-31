<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>角色授权</span>
    </div>
    <el-table
        :data="role_list"
        border
        style="width: 100%" size="mini">
      <el-table-column
          prop="id" width="80"
          label="ID" align="center">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称" align="center">
      </el-table-column>
      <el-table-column
          prop="address" align="center" width="180"
          label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="addOrUpdateHandler(scope.row.id, scope.row.name)">授权
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-table :data="menuList" :row-class-name="tableRowClassName" size="mini" v-loading="loading">
        <el-table-column property="id" label="ID" width="150"></el-table-column>
        <el-table-column property="mod_name" label="模块名称">
          <template slot-scope="scope">
            <span v-if="scope.row.parent_id === 0"><b>{{ scope.row.mod_name }}</b></span>
            <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.mod_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="add_mo(scope.row.id, 1)" type="success"
                       v-if="role_moids.indexOf(scope.row.id) === -1 && scope.row.parent_id !== 0">授权
            </el-button>
            <el-button size="mini" @click="add_mo(role_moids.indexOf(scope.row.id), -1)" type="warning"
                       v-if="role_moids.indexOf(scope.row.id) !== -1 && scope.row.parent_id !== 0">取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="save_role_mo()" size="mini">确 定</el-button>
  </span>
    </el-dialog>
  </el-card>


</template>
<script>

export default {
  data() {
    return {
      dialogTableVisible: false,
      role_moids: [],
      menuList: [],
      role_id: 0,
      role_list: [{
        id: 1,
        name: "管理员"
      }, {
        id: 2,
        name: "出题专家"
      }, {
        id: 3,
        name: "面试专家"
      }, {
        id: 4,
        name: "普通用户"
      }],
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
    // 保存权限
    save_role_mo() {
      this.$http.post(`${DOMAIN_API_SYS}/sys_m_module/role/?id=${this.role_id}`,
          {role_moids: JSON.stringify(this.role_moids)}).then(res => {
        this.$layer_message("操作成功", 'success')
        this.dialogTableVisible = false
      })
    },
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
    tableRowClassName({row, rowIndex}) {
      if (this.role_moids.indexOf(row.id) !== -1) {
        return 'success-row';
      } else if (row.parent_id === 0) {
        return 'warning-row'
      }
      return '';
    },

    addOrUpdateHandler(id_, title) {
      this.dialogTableVisible = true;
      this.loading = true;
      this.role_id = id_
      this.title = title + '授权'
      this.$http({
        url: `${DOMAIN_API_SYS}/sys_m_module/role/?id=${id_}`,
        method: "get",
      }).then(({data}) => {
        this.role_moids = data.data;
        this.loading = false;
      })
    },
    add_mo(mo_id, type) {
      if (type === 1) {
        this.role_moids.push(mo_id)
      } else {
        this.role_moids.splice(mo_id, 1)
      }
    }
  }
};
</script>
<style lang="css">
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

</style>
