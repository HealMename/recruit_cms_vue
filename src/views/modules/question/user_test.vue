<template>
  <el-row>
    <el-col :span="12">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="做题记录ID:">
          <el-input v-model="form.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="form.phone" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="做题时间:">
          <el-date-picker
      v-model="form.time"
      type="daterange"
      align="left"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(1)">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="24">
      <el-table
          v-loading="loading"
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            align="center"
            label="ID"
            width="150">
        </el-table-column>
        <el-table-column
            prop="phone"
            align="center"
            label="手机号"
            width="200">
          <template slot-scope="scope">

            <span v-if="scope.row.phone.length === 11">{{ scope.row.phone.slice(0, 3) }}****{{ scope.row.phone.slice(7, 11) }}</span>
            <span v-else>/</span>
          </template>
        </el-table-column>
      <el-table-column
            prop="name"
            align="center"
            label="姓名"
            >
        </el-table-column>
        <el-table-column
            prop="add_time"
            width="180"
            align="center"
            label="添加时间">
        </el-table-column>
        <el-table-column
            prop=""
            width="200"
            align="center"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onAdd(scope.row.id)">查看详情</el-button>
            <el-button type="text" size="small" style="color: red" @click="delQ(scope.row.id)">删除记录</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-col>
    <el-col :span="24">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
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
      valueFormat: {
      type: String,
      default: 'timestamp',//默认timestamp时间戳，也可设置'yyyy-MM-dd'：2019-03-22
    },
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
      loading: false,
      currentPage: 1,
      total: 0,
      page_size: 5,
      form: {
        id: '',
        role: '1',
        status: '',
        time:[]
      },
      tableData: []
    }
  },
  mounted() {

  },
  created() {
    this.onSubmit()
  },
  methods: {
    onSubmit: function (page_id) {
      this.form.page_id = page_id ? page_id: this.currentPage;
      this.form.page_size = this.page_size;
      this.form.start_time = this.form.time ? Date.parse(this.form.time[0]) / 1000 : '';
      this.form.end_time = this.form.time ? Date.parse(this.form.time[1]) / 1000 : '';
      this.loading = true;
      this.$http.post(DOMAIN_API_SYS + "/tea/user/test_list/", this.form).then(res => {
        let r = res.data.data
        this.tableData = r.page_data;
        this.total = r.sum_len
      }).catch((res) => {
        this.$layer_message(res.result)
      }).finally(() => this.loading = false)
    },
    onAdd: function (id_) {
      this.$router.replace({path: "/user/test/det/" + id_});
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
      this.$http.post(DOMAIN_API_SYS + "/tea/user/user_test_del/", {id: id_, status: -1}).then(res => {
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

</style>