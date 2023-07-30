<template>
  <el-row>
    <el-col :span="24">

      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="题目ID：">
          <el-input v-model="form.id" placeholder="输入题目ID或内容" style="width: 222px"></el-input>
        </el-form-item>
        <el-form-item label="科目：">
            <template>
                <el-select v-model="form.sid" placeholder="选择科目">
                  <el-option label="" value="">全部</el-option>
                    <el-option
                            v-for="item in subjects"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </template>
        </el-form-item>
        <el-form-item label="级别：" >
          <el-radio-group v-model="form.level">
            <el-radio label="" value="">全部</el-radio>
            <el-radio label="1" value="1">初级</el-radio>
            <el-radio label="2" value="2">中级</el-radio>
            <el-radio label="3" value="3">高级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规模：" >
          <el-radio-group v-model="form.size">
            <el-radio label="" value="">全部</el-radio>
            <el-radio label="1" value="1">单机</el-radio>
            <el-radio label="2" value="2">集群</el-radio>
            <el-radio label="3" value="3">多集群</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态：" >
          <el-radio-group v-model="form.status">
            <el-radio label="" value="">全部</el-radio>
            <el-radio label="0" value="0">未审核</el-radio>
            <el-radio label="1" value="1">已审核</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button  @click="onSubmit(1)">搜索</el-button>
          <el-button  @click="onAdd(2, 0)">添加题目</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="24">
      <el-table
          v-loading="loading"
          :data="tableData"
          border size="mini"
          style="width: 100%">
        <el-table-column
            prop="id"
            align="center"
            label="ID"
            width="50">
        </el-table-column>
        <el-table-column
            prop="sid_name"
            align="center"
            label="科目"
            width="80">
        </el-table-column>
        <el-table-column
            prop="level_name"
            align="center"
            label="级别" width="50">
        </el-table-column>
        <el-table-column
            prop="size_name"
            align="center"
            label="规模" width="50">
        </el-table-column>
        <el-table-column
            prop="version"
            align="center"
            label="版本" width="100">
        </el-table-column>
        <el-table-column
            prop="title"
            align="center"
            label="题目标题">
        </el-table-column>

        <el-table-column
            prop="status_name"
            width="80"
            align="center"
            label="状态">
        </el-table-column>
        <el-table-column
            prop="add_time"
            width="180"
            align="center"
            label="添加时间">
        </el-table-column>
        <el-table-column
            prop="add_user"
            width="80"
            align="center"
            label="添加人" v-if="open_role.indexOf('1') !== -1">
        </el-table-column>
        <el-table-column
            prop="verify_time"
            width="180"
            align="center"
            label="审核时间">
        </el-table-column>
        <el-table-column
            prop="verify_user"
            width="80"
            align="center"
            label="审核人" v-if="open_role.indexOf('1') !== -1">
        </el-table-column>
        <el-table-column
            prop=""
            width="150"
            align="center"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onAdd(1, scope.row.id)">预览</el-button>
            <el-button type="text" size="small" @click="onAdd(2, scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" style="color: red" @click="delQ(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-col>
    <el-col :span="24">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-col>

  </el-row>

</template>

<script>
export default {
  data() {
    return {
      open_role: this.$storage.get("open_role"),
      loading: false,
      subjects: [],
      currentPage: 1,
      total: 0,
      page_size: 10,
      form: {
        is_cms: 1,
        id: '',
        status: '',
        sid: '',
        level: '',
        size: ''
      },
      tableData: []
    }
  },
  mounted() {

  },
  created() {
    this.$http.post(DOMAIN_API_SYS + "/tea/subject/all/", {}).then(res => {
      this.subjects = res.data.data
      this.loading = false
    })
    this.onSubmit()
  },
  methods: {
    onSubmit: function (page_id) {
      this.form.page_id = page_id ? page_id: this.currentPage;
      this.form.page_size = this.page_size;
      this.loading = true;
      this.$http.post(DOMAIN_API_SYS + "/tea/question_list/", this.form).then(res => {
        let r = res.data.data
        this.tableData = r.page_data;
        this.total = r.sum_len
      }).catch((res) => {
        this.$layer_message(res.result)
      }).finally(() => this.loading = false)
    },
    onAdd: function (type, id_) {
      if (type === 2){
        this.$router.replace({path: "/question/add/" + id_});
      }else{
        this.$router.replace({path: "/question/view/" + id_});
      }

    },
    handleSizeChange: function (val) {
      this.page_size = val;
      this.onSubmit()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.onSubmit();
    },
    delQ(id_){
      this.$confirm('确定删除吗, 是否继续?', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true;
            this.$http.post(DOMAIN_API_SYS + "/tea/del_q/", {id: id_, status: -1}).then(res => {
                this.$layer_message("已删除", 'success')
                this.onSubmit()
            }).catch((res) => {
              this.$layer_message(res.result)
            })
          })
    },
  }
}
</script>

<style scoped>
.el-form{
  padding-bottom: 0;
  margin-top: 10px;
}
.el-form-item{
  margin-bottom: 10px;
}
</style>