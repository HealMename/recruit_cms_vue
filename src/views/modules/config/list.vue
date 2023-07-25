<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div v-if="showFlag">
      <el-form :inline="true" :model="searchForm" class="form-content">
         <el-button size="mini" @click="addOrUpdateHandler({value: ''})">新增<i class="el-icon-plus el-icon--right"/></el-button>
      </el-form>
      <div class="table-content">
        <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"

                  :border="contents.tableBorder"
                  :fit="contents.tableFit"
                  :stripe="contents.tableStripe"
                  :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
                  :data="dataList"
                  v-loading="dataListLoading">
          <el-table-column label="索引" :align="contents.tableAlign" type="id" width="50" prop="id"/>
          <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign" prop="value"
                           :header-align="contents.tableAlign"
                           label="值">
            <template slot-scope="scope">
              <div v-if="scope.row.value">
                <img :src="scope.row.value" width="100" height="100">
              </div>
              <div v-else>无图片</div>
            </template>
          </el-table-column>
          <el-table-column width="300" :align="contents.tableAlign"
                           :header-align="contents.tableAlign"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="addOrUpdateHandler(scope.row)">修改<i class="el-icon-edit el-icon--right"/></el-button>
              <el-button size="mini" type="danger" @click="deleteHandler(scope.row.id)">删除<i class="el-icon-delete el-icon--right"/></el-button>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            clsss="pages"
            :layout="layouts"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="Number(contents.pageEachNum)"
            :total="totalPage"
            :small="contents.pageStyle"
            class="pagination-content"
            :background="contents.pageBtnBG"
            :style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
    <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

  </div>
</template>
<script>
import axios from 'axios'
import AddOrUpdate from "./add-or-update";

export default {
  data() {
    return {
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
      contents: {
        "searchBtnFontColor": "rgba(255, 255, 255, 1)",
        "pagePosition": "1",
        "inputFontSize": "14px",
        "inputBorderRadius": "4px",
        "tableBtnDelFontColor": "rgba(101, 126, 253, 1)",
        "tableBtnIconPosition": "1",
        "searchBtnHeight": "40px",
        "tableBgColor": "#f5f5f5",
        "inputIconColor": "rgba(101, 126, 253, 1)",
        "searchBtnBorderRadius": "10px",
        "tableStripe": true,
        "btnAdAllWarnFontColor": "rgba(255, 255, 255, 1)",
        "tableBtnDelBgColor": "#fff",
        "searchBtnIcon": "1",
        "tableSize": "medium",
        "searchBtnBorderStyle": "solid",
        "tableSelection": true,
        "text": {
          "padding": "0",
          "boxShadow": "0 0 6px rgba(0,0,0,.1)",
          "margin": "0 auto",
          "borderColor": "rgba(0,0,0,.3)",
          "backgroundColor": "#f7f7f7",
          "color": "#333",
          "borderRadius": "6px",
          "borderWidth": "0",
          "width": "auto",
          "lineHeight": "auto",
          "fontSize": "24px",
          "borderStyle": "solid"
        },
        "searchBtnBorderWidth": "0px",
        "tableContentFontSize": "14px",
        "searchBtnBgColor": "rgba(101, 126, 253, 1)",
        "inputTitleSize": "14px",
        "btnAdAllBorderColor": "rgba(0, 71, 238, 1)",
        "pageJumper": true,
        "btnAdAllIconPosition": "1",
        "searchBoxPosition": "1",
        "tableBtnDetailFontColor": "rgba(101, 126, 253, 1)",
        "tableBtnHeight": "40px",
        "pagePager": true,
        "searchBtnBorderColor": "rgb(50, 65, 87)",
        "tableHeaderFontColor": "#909399",
        "inputTitle": "0",
        "tableBtnBorderRadius": "4px",
        "btnAdAllFont": "0",
        "btnAdAllDelFontColor": "rgba(255, 255, 255, 1)",
        "tableBtnIcon": "0",
        "btnAdAllHeight": "40px",
        "btnAdAllWarnBgColor": "rgba(101, 126, 253, 1)",
        "btnAdAllBorderWidth": "0px",
        "tableStripeFontColor": "#606266",
        "tableBtnBorderStyle": "solid",
        "inputHeight": "40px",
        "btnAdAllBorderRadius": "18px",
        "btnAdAllDelBgColor": "rgba(205, 32, 31, 1)",
        "pagePrevNext": true,
        "btnAdAllAddBgColor": "rgba(40, 167, 69, 1)",
        "searchBtnFont": "1",
        "tableIndex": true,
        "btnAdAllIcon": "1",
        "tableSortable": false,
        "pageSizes": true,
        "tableFit": true,
        "pageBtnBG": true,
        "searchBtnFontSize": "14px",
        "tableBtnEditBgColor": "rgba(255, 255, 255, 1)",
        "inputBorderWidth": "1px",
        "box": {
          "padding": "10px 20px",
          "boxShadow": "0 0 6px rgba(0,0,0,0)",
          "flag": 1,
          "backgroundImage": "",
          "background": "#fff"
        },
        "inputFontPosition": "1",
        "inputFontColor": "#333",
        "pageEachNum": 10,
        "tableHeaderBgColor": "#fff",
        "inputTitleColor": "#333",
        "btnAdAllBoxPosition": "3",
        "tableBtnDetailBgColor": "#fff",
        "inputIcon": "1",
        "searchBtnIconPosition": "2",
        "btnAdAllFontSize": "16px",
        "inputBorderStyle": "solid",
        "tableHoverFontColor": "#333",
        "inputBgColor": "#fff",
        "pageStyle": false,
        "pageTotal": true,
        "btnAdAllAddFontColor": "rgba(255, 255, 255, 1)",
        "tableBtnFont": "1",
        "tableContentFontColor": "#606266",
        "inputBorderColor": "#DCDFE6",
        "tableShowHeader": true,
        "tableHoverBgColor": "#f5f5f5",
        "tableBtnFontSize": "14px",
        "tableBtnBorderColor": "rgba(101, 126, 253, 1)",
        "inputIconPosition": "2",
        "tableBorder": true,
        "btnAdAllBorderStyle": "solid",
        "tableBtnBorderWidth": "1px",
        "tableStripeBgColor": "#F5F7FA",
        "tableBtnEditFontColor": "rgba(101, 126, 253, 1)",
        "tableAlign": "center"
      },
      layouts: '',
      file_url: ''


    };
  },
  created() {
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
  },
  methods: {


    // 分页
    contentPageStyleChange() {
      let arr = []

      if (this.contents.pageTotal) arr.push('total')
      if (this.contents.pageSizes) arr.push('sizes')
      if (this.contents.pagePrevNext) {
        arr.push('prev')
        if (this.contents.pagePager) arr.push('pager')
        arr.push('next')
      }
      if (this.contents.pageJumper) arr.push('jumper')
      this.layouts = arr.join()
      this.contents.pageEachNum = 10
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
      this.$http({
        url: "config/page",
        method: "get",
        params: params
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          console.log(this.dataList)
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
    addOrUpdateHandler(value) {
      this.file_url = value.value;
      this.file_id = value.id;
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
    },
    // 查看评论
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
          url: "config/delete",
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
.slt {
  margin: 0 !important;
  display: flex;
}

.ad {
  margin: 0 !important;
  display: flex;
}

.pages {
  & /deep/ el-pagination__sizes {
    & /deep/ el-input__inner {
      height: 22px;
      line-height: 22px;
    }
  }
}


.el-button + .el-button {
  margin: 0;
}

.tables {

  & /deep/ .el-button {
    margin: 4px;
  }
}

.form-content {
  background: transparent;
}

.table-content {
  background: transparent;
}

.tables /deep/ .el-table__body tr {
  background-color: #f5f5f5 !important;
  color: #606266 !important;
}

.tables /deep/ .el-table__body tr.el-table__row--striped td {
  background: transparent;
}

.tables /deep/ .el-table__body tr.el-table__row--striped {
  background-color: #F5F7FA !important;
  color: #606266 !important;
}

.tables /deep/ .el-table__body tr:hover > td {
  background-color: #f5f5f5 !important;
  color: #333 !important;
}

</style>
