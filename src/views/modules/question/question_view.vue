<template>
  <el-row v-loading="loading">
    <el-col :span="24">
      <el-button @click="go_bank()" style="margin-bottom: 20px;margin-top: 20px">返回</el-button>

      <el-card class="box-card" style="margin-bottom: 10px;">
        <div slot="header" class="clearfix">
          <span>题目信息  ID:{{ question.id }}</span>
          <el-button type="success" size="small" @click="verify(question.id, 1)" style="float: right;" v-if="question.status !== '1' && open_role.indexOf('1') !== -1">通过审核</el-button>
          <el-button type="danger" size="small" @click="verify(question.id, 0)" style="float: right;" v-if="question.status === '1'  && open_role.indexOf('1') !== -1">取消审核</el-button>
          <el-button type="success" size="small" @click="do_question(question.id)" style="float: right;margin-right: 10px">进入实操环境</el-button>

        </div>
          <p style="font-size: 26px">{{ question.title }}({{ question.level_name }})  <el-tag size="small" style="margin-right: 10px;">{{ question.sid_name }}</el-tag><el-tag size="small">{{ question.size_name }}</el-tag>
            <el-tag v-if="question.status === '1'" style="float: right;" type="">已审核</el-tag>
            <el-tag v-if="question.status !== '1'" style="float: right;" type="danger">未审核</el-tag>
          </p>
          <p ><span class="ta_title">时间: </span>{{ question.do_time }}(分)</p>
          <p ><span class="ta_title">版本: </span>{{ question.version }}</p>
          <p ><span class="ta_title">描述: </span>{{ question.desc }}</p>
          <p ><span class="ta_title">环境信息: </span></p>
          <div v-for="(o, index) in question.os_detail" :key="index + 'os'" class="text item">
              <p v-html="index+1 + '、' + o.content"></p>
            </div>
        <p><span class="ta_title">解题步骤：</span></p>
          <div v-for="(o, index) in question.step_list" :key="index + 'step'" class="text item">
              <p class="ta_title">步骤{{index+1}}:</p>
              <div v-html="o.content"></div>
            </div>
        <p><span class="ta_title">答题步骤：</span></p>
          <div v-for="(o, index) in question.answer_list" :key="index + 'answer'" class="text item">
              <p class="ta_title">步骤{{index+1}}:</p>
              <p v-html="o.content"></p>
            </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {quillEditor} from 'vue-quill-editor'

export default {
  components: {},
  data() {


    return {
      open_role: this.$storage.get("open_role"),
      loading: false,
      question: {
        id: this.$route.params.id,
        is_free: "0",
        sid: 1,
        do_time: 0,
        do_points: '',
        version: '',
        level: "1",
        title: "",
        desc: "",
        size: "1",
        status: "0",
        add_user: this.$storage.get("userId"),
        step_list: [{
          content: ''
        }],
        answer_list: [{
          content: ''
        }],
        os_detail: [{content: ''}]
      },
    }
  },
  mounted() {
  },
  created() {

    this.init_data()

  },
  methods: {
    init_data(){
      this.loading = true;
      this.$http.get(DOMAIN_API_SYS + "/tea/question/?id=" + this.question.id + '&is_view=1').then(res => {
        let r = res.data.data
        this.question = r
        this.loading = false
      })
    },
    go_bank: function () {
      this.$router.replace({path: "/question/"});
    },
    do_question(qid){
      this.$http.post(DOMAIN_API_SYS + "/tea/do_question/", {type: 1, qid: qid}).then(res => {
            window.open(res.data.data)
        }).catch((res) => {
          this.$layer_message(res.result)
        })
    },
    verify(id_, status){
      this.$confirm('确定操作吗, 是否继续?', '审核', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loading = true;
            this.$http.post(DOMAIN_API_SYS + "/tea/del_q/", {id: id_, status: status}).then(res => {
                this.$layer_message("操作成功", 'success')
                this.init_data()
            }).catch((res) => {
              this.$layer_message(res.result)
            })
          })
    },
  }
}
</script>

<style lang="css">
.ql-syntax{
  margin-bottom: 8px;
}
.ta_title{
  font-weight: bold;
}
</style>