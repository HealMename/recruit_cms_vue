<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div id="main" v-if="showFlag">
      <el-form  :model="searchForm" class="form-content" label-width="80px" size="mini">

          <el-form-item label="公司名称">
            <el-input
                      v-model="searchForm.gongsimingcheng" placeholder="公司名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="招聘岗位">
            <el-input
                      v-model="searchForm.zhaopingangwei" placeholder="招聘岗位" clearable></el-input>

          </el-form-item>
          <el-form-item class="select" label="岗位类型" prop="gangweileixing">
            <el-select clearable v-model="searchForm.gangweileixing"
                       placeholder="请选择岗位类型">
              <el-option
                  v-for="(item,index) in gangweileixingOptions"
                  v-bind:key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item class="select" label="城市" prop="chengshi" >
            <el-select clearable v-model="searchForm.chengshi" placeholder="请选择城市">
              <el-option
                  v-for="(item,index) in chengshiOptions"
                  v-bind:key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>

            <el-button @click="search()">
              查询<i class="el-icon-search el-icon--right"/></el-button> <el-button
                icon="el-icon-plus"
                @click="addOrUpdateHandler()"
            >新增
            </el-button>

          </el-form-item>

      </el-form>
      <div class="table-content">
        <el-table class="tables" size="mini"
                  :data="dataList"
                  v-loading="dataListLoading" border
                  @selection-change="selectionChangeHandler">

          <el-table-column label="索引" type="index" align="center" width="50"/>
          <el-table-column
              prop="biaoti" align="center"
              label="标题">
            <template slot-scope="scope">
              {{ scope.row.biaoti }}
            </template>
          </el-table-column>
          <el-table-column
              prop="chengshi" align="center"
              label="城市">
            <template slot-scope="scope">
              {{ scope.row.chengshi }}
            </template>
          </el-table-column>
          <el-table-column
              prop="fabushijian" align="center" width="130"
              label="发布时间">
            <template slot-scope="scope">
              {{ handle_time(scope.row.fabushijian) }}
            </template>
          </el-table-column>

          <el-table-column
              prop="gongsimingcheng" align="center"
              label="公司名称">
            <template slot-scope="scope">
              {{ scope.row.gongsimingcheng }}
            </template>
          </el-table-column>

          <el-table-column
              prop="zhaopingangwei" align="center"
              label="招聘岗位">
            <template slot-scope="scope">
              {{ scope.row.zhaopingangwei }}
            </template>
          </el-table-column>
          <el-table-column
              prop="gangweileixing" align="center"
              label="岗位类型">
            <template slot-scope="scope">
              {{ scope.row.gangweileixing }}
            </template>
          </el-table-column>
          <el-table-column
              prop="zhaopinrenshu" align="center"
              label="招聘人数">
            <template slot-scope="scope">
              {{ scope.row.zhaopinrenshu }}
            </template>
          </el-table-column>
          <el-table-column
              prop="gangweidaiyu" align="center"
              label="岗位待遇">
            <template slot-scope="scope">
              {{ scope.row.gangweidaiyu }}
            </template>
          </el-table-column>
          <el-table-column prop="fengmian"
                            align="center"
                           label="封面">
            <template slot-scope="scope">
              <div v-if="scope.row.fengmian">
                <img :src="scope.row.fengmian.split(',')[0]" style="width: 50px;" >
              </div>
              <div v-else>无图片</div>
            </template>
          </el-table-column>
          <el-table-column
              label="操作" fixed="right" width="150" align="center">
            <template slot-scope="scope">
<!--              <el-dropdown >-->
<!--                <el-button type="primary" size="mini">操作</el-button>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                  <el-dropdown-item @click.native="addOrUpdateHandler(scope.row.id,'info')" >详情</el-dropdown-item>-->
<!--&lt;!&ndash;                  <el-dropdown-item @click.native="toudijiluCrossAddOrUpdateHandler(scope.row,'cross','','','')" >投递简历</el-dropdown-item>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-dropdown-item @click.native="dafenjiluCrossAddOrUpdateHandler(scope.row,'cross','','','')" >公司打分</el-dropdown-item>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-dropdown-item @click.native="tousujiluCrossAddOrUpdateHandler(scope.row,'cross','','','')" >投诉</el-dropdown-item>&ndash;&gt;-->
<!--                  <el-dropdown-item @click.native="addOrUpdateHandler(scope.row.id)" >修改</el-dropdown-item>-->
<!--&lt;!&ndash;                  <el-dropdown-item @click.native="disscussListHandler(scope.row.id)" >查看评论</el-dropdown-item>&ndash;&gt;-->
<!--                </el-dropdown-menu>-->
<!--              </el-dropdown>-->
<el-button type="primary"  size="mini" @click="addOrUpdateHandler(scope.row.id)" style="margin-left: 5px;">
                修改
              </el-button>
              <el-button type="danger"  size="mini" @click="deleteHandler(scope.row.id)" style="margin-left: 5px;">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            clsss="pages"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            :total="totalPage"
            class="pagination-content"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
    <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

    <toudijilu-cross-add-or-update v-if="toudijiluCrossAddOrUpdateFlag" :parent="this"
                                   ref="toudijiluCrossaddOrUpdate"></toudijilu-cross-add-or-update>
    <dafenjilu-cross-add-or-update v-if="dafenjiluCrossAddOrUpdateFlag" :parent="this"
                                   ref="dafenjiluCrossaddOrUpdate"></dafenjilu-cross-add-or-update>
    <tousujilu-cross-add-or-update v-if="tousujiluCrossAddOrUpdateFlag" :parent="this"
                                   ref="tousujiluCrossaddOrUpdate"></tousujilu-cross-add-or-update>
    <liaotianjilu-cross-add-or-update v-if="liaotianjiluCrossAddOrUpdateFlag" :parent="this"
                                      ref="liaotianjiluCrossaddOrUpdate"></liaotianjilu-cross-add-or-update>


  </div>
</template>
<script>
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
import toudijiluCrossAddOrUpdate from "../toudijilu/add-or-update";
import dafenjiluCrossAddOrUpdate from "../dafenjilu/add-or-update";
import tousujiluCrossAddOrUpdate from "../tousujilu/add-or-update";
import liaotianjiluCrossAddOrUpdate from "../liaotianjilu/add-or-update";

export default {
  data() {
    return {
      chengshiOptions: [],
      gangweileixingOptions: [],
      searchForm: {
        key: ""
      },
      form: {},
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      addOrUpdateFlag: false,
      toudijiluCrossAddOrUpdateFlag: false,
      dafenjiluCrossAddOrUpdateFlag: false,
      tousujiluCrossAddOrUpdateFlag: false,
      liaotianjiluCrossAddOrUpdateFlag: false,
    };
  },
  created() {
    this.init();
    this.getDataList();
  },
  mounted() {

  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
    }
  },
  components: {
    AddOrUpdate,
    toudijiluCrossAddOrUpdate,
    dafenjiluCrossAddOrUpdate,
    tousujiluCrossAddOrUpdate,
    liaotianjiluCrossAddOrUpdate,
  },
  methods: {
    handleCommand(command, scope_row) {
      console.log(scope_row, command)
      if (command === '1'){
        this.addOrUpdateHandler(scope_row.id,'info')
      }
    },
    // 处理时间
    handle_time(time) {
      if (time) {
        return `${time.slice(0, 10)} ${time.slice(11, 18)}`
      }
    },
    toudijiluCrossAddOrUpdateHandler(row, type, crossOptAudit, statusColumnName, tips, statusColumnValue) {
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.toudijiluCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj', row);
      this.$storage.set('crossTable', 'zhaopinxinxi');
      this.$storage.set('statusColumnName', statusColumnName);
      this.$storage.set('statusColumnValue', statusColumnValue);
      this.$storage.set('tips', tips);
      if (statusColumnName != '' && !statusColumnName.startsWith("[")) {
        var obj = this.$storage.getObj('crossObj');
        for (var o in obj) {
          if (o == statusColumnName && obj[o] == statusColumnValue) {
            this.$message({
              message: tips,
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
            this.showFlag = true;
            this.toudijiluCrossAddOrUpdateFlag = false;
            return;
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.toudijiluCrossaddOrUpdate.init(row.id, type);
      });
    },
    dafenjiluCrossAddOrUpdateHandler(row, type, crossOptAudit, statusColumnName, tips, statusColumnValue) {
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.dafenjiluCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj', row);
      this.$storage.set('crossTable', 'zhaopinxinxi');
      this.$storage.set('statusColumnName', statusColumnName);
      this.$storage.set('statusColumnValue', statusColumnValue);
      this.$storage.set('tips', tips);
      if (statusColumnName != '' && !statusColumnName.startsWith("[")) {
        var obj = this.$storage.getObj('crossObj');
        for (var o in obj) {
          if (o == statusColumnName && obj[o] == statusColumnValue) {
            this.$message({
              message: tips,
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
            this.showFlag = true;
            this.dafenjiluCrossAddOrUpdateFlag = false;
            return;
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.dafenjiluCrossaddOrUpdate.init(row.id, type);
      });
    },
    tousujiluCrossAddOrUpdateHandler(row, type, crossOptAudit, statusColumnName, tips, statusColumnValue) {
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.tousujiluCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj', row);
      this.$storage.set('crossTable', 'zhaopinxinxi');
      this.$storage.set('statusColumnName', statusColumnName);
      this.$storage.set('statusColumnValue', statusColumnValue);
      this.$storage.set('tips', tips);
      if (statusColumnName != '' && !statusColumnName.startsWith("[")) {
        var obj = this.$storage.getObj('crossObj');
        for (var o in obj) {
          if (o == statusColumnName && obj[o] == statusColumnValue) {
            this.$message({
              message: tips,
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
            this.showFlag = true;
            this.tousujiluCrossAddOrUpdateFlag = false;
            return;
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.tousujiluCrossaddOrUpdate.init(row.id, type);
      });
    },
    liaotianjiluCrossAddOrUpdateHandler(row, type, crossOptAudit, statusColumnName, tips, statusColumnValue) {
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.liaotianjiluCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj', row);
      this.$storage.set('crossTable', 'zhaopinxinxi');
      this.$storage.set('statusColumnName', statusColumnName);
      this.$storage.set('statusColumnValue', statusColumnValue);
      this.$storage.set('tips', tips);
      if (statusColumnName != '' && !statusColumnName.startsWith("[")) {
        var obj = this.$storage.getObj('crossObj');
        for (var o in obj) {
          if (o == statusColumnName && obj[o] == statusColumnValue) {
            this.$message({
              message: tips,
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
            this.showFlag = true;
            this.liaotianjiluCrossAddOrUpdateFlag = false;
            return;
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.liaotianjiluCrossaddOrUpdate.init(row.id, type);
      });
    },
    init() {
      this.$http({
        url: `option/chengshi/chengshi?type=1`,
        method: "get"
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.chengshiOptions = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
      this.$http({
        url: `option/gangweifenlei/gangweileixing`,
        method: "get"
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.gangweileixingOptions = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
      }
      if (this.searchForm.chengshi != '' && this.searchForm.chengshi != undefined) {
        params['chengshi'] = this.searchForm.chengshi
      }
      if (this.searchForm.gongsimingcheng != '' && this.searchForm.gongsimingcheng != undefined) {
        params['gongsimingcheng'] = '%' + this.searchForm.gongsimingcheng + '%'
      }
      if (this.searchForm.zhaopingangwei != '' && this.searchForm.zhaopingangwei != undefined) {
        params['zhaopingangwei'] = '%' + this.searchForm.zhaopingangwei + '%'
      }
      if (this.searchForm.gangweileixing != '' && this.searchForm.gangweileixing != undefined) {
        params['gangweileixing'] = this.searchForm.gangweileixing
      }
      this.$http({
        url: "zhaopinxinxi/page",
        method: "get",
        params: params
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id, type) {
      console.log(2222)
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if (type != 'info') {
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, type);
      });
    },
    // 查看评论
    disscussListHandler(id, type) {
      this.$router.push({path: '/discusszhaopinxinxi', query: {refid: id}});
    },
    // 下载
    download(file) {
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
          ? [Number(id)]
          : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "zhaopinxinxi/delete",
          method: "post",
          data: ids
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


  }

};
</script>
<style lang="scss" scoped>

#main .el_from{

}




</style>
