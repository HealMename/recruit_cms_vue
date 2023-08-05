<template>
  <div class="addEdit-block">
    <el-form
        class="detail-form-content"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        size="mini"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item class="input" v-if="type!='info'" label="标题" prop="biaoti">
            <el-input v-model="ruleForm.biaoti"
                      placeholder="标题" clearable :readonly="ro.biaoti"></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="标题" prop="biaoti">
              <el-input v-model="ruleForm.biaoti"
                        placeholder="标题" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="select" v-if="type!='info'" label="城市" prop="chengshi">
            <el-select :disabled="ro.chengshi" v-model="ruleForm.chengshi" placeholder="请选择城市">
              <el-option
                  v-for="(item,index) in chengshiOptions"
                  v-bind:key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="城市" prop="chengshi">
              <el-input v-model="ruleForm.chengshi"
                        placeholder="城市" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="date" v-if="type!='info'" label="发布时间" prop="fabushijian">
            <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="ruleForm.fabushijian"
                type="datetime"
                :readonly="ro.fabushijian"
                placeholder="发布时间">
            </el-date-picker>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" v-if="ruleForm.fabushijian" label="发布时间" prop="fabushijian">
              <el-input v-model="ruleForm.fabushijian"
                        placeholder="发布时间" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="input" v-if="type!='info'" label="公司账号" prop="gongsizhanghao">
            <el-input v-model="ruleForm.gongsizhanghao"
                      placeholder="公司账号" clearable :readonly="ro.gongsizhanghao"></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="公司账号" prop="gongsizhanghao">
              <el-input v-model="ruleForm.gongsizhanghao"
                        placeholder="公司账号" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="input" v-if="type!='info'" label="公司名称" prop="gongsimingcheng">
            <el-input v-model="ruleForm.gongsimingcheng"
                      placeholder="公司名称" clearable :readonly="ro.gongsimingcheng"></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="公司名称" prop="gongsimingcheng">
              <el-input v-model="ruleForm.gongsimingcheng"
                        placeholder="公司名称" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="input" v-if="type!='info'" label="注册编号" prop="zhucebianhao">
            <el-input v-model="ruleForm.zhucebianhao"
                      placeholder="注册编号" clearable :readonly="ro.zhucebianhao"></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="注册编号" prop="zhucebianhao">
              <el-input v-model="ruleForm.zhucebianhao"
                        placeholder="注册编号" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="input" v-if="type!='info'" label="招聘岗位" prop="zhaopingangwei">
            <el-input v-model="ruleForm.zhaopingangwei"
                      placeholder="招聘岗位" clearable :readonly="ro.zhaopingangwei"></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="招聘岗位" prop="zhaopingangwei">
              <el-input v-model="ruleForm.zhaopingangwei"
                        placeholder="招聘岗位" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="select" v-if="type!='info'" label="岗位类型" prop="gangweileixing">
            <el-select :disabled="ro.gangweileixing" v-model="ruleForm.gangweileixing" placeholder="请选择岗位类型">
              <el-option
                  v-for="(item,index) in gangweileixingOptions"
                  v-bind:key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="岗位类型" prop="gangweileixing">
              <el-input v-model="ruleForm.gangweileixing"
                        placeholder="岗位类型" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="input" v-if="type!='info'" label="招聘人数" prop="zhaopinrenshu">
            <el-input v-model="ruleForm.zhaopinrenshu"
                      placeholder="招聘人数" clearable :readonly="ro.zhaopinrenshu"></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="招聘人数" prop="zhaopinrenshu">
              <el-input v-model="ruleForm.zhaopinrenshu"
                        placeholder="招聘人数" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item class="input" v-if="type!='info'" label="岗位待遇" prop="gangweidaiyu">
            <el-input v-model="ruleForm.gangweidaiyu"
                      placeholder="岗位待遇" clearable :readonly="ro.gangweidaiyu"></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item class="input" label="岗位待遇" prop="gangweidaiyu">
              <el-input v-model="ruleForm.gangweidaiyu"
                        placeholder="岗位待遇" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="24">
          <el-form-item class="upload" v-if="type!='info' && !ro.fengmian" label="封面" prop="fengmian">
            <file-upload
                tip="点击上传封面"
                :action="upload_url"
                :limit="1"
                :multiple="true"
                :fileUrls="ruleForm.fengmian?ruleForm.fengmian:''"
                @change="fengmianUploadChange"
            ></file-upload>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="ruleForm.fengmian" label="封面" prop="fengmian">
              <img style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.fengmian.split(',')"
                   :src="item.file_url" width="100" height="100">
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="textarea" v-if="type!='info'" label="岗位要求" prop="gangweiyaoqiu">
            <el-input
                style="min-width: 200px; max-width: 600px;"
                type="textarea"
                :rows="8"
                placeholder="岗位要求"
                v-model="ruleForm.gangweiyaoqiu">
            </el-input>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="ruleForm.gangweiyaoqiu" label="岗位要求" prop="gangweiyaoqiu">
              <span>{{ ruleForm.gangweiyaoqiu }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item v-if="type!='info'" label="公司介绍" prop="gongsijieshao">
            <editor
                style="min-width: 200px; max-width: 600px;"
                v-model="ruleForm.gongsijieshao"
                class="editor"
                action="file/upload">
            </editor>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="ruleForm.gongsijieshao" label="公司介绍" prop="gongsijieshao">
              <span v-html="ruleForm.gongsijieshao"></span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item >
        <el-button  class="btn-success" @click="onSubmit">提交</el-button>
        <el-button  class="btn-close" @click="back()">返回</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import {isNumber, isIntNumer, isEmail, isPhone, isMobile, isURL, checkIdCard} from "@/utils/validate";

export default {
  data() {
    let self = this
    var validateIdCard = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!checkIdCard(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    };
    var validateUrl = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!isURL(value)) {
        callback(new Error("请输入正确的URL地址"));
      } else {
        callback();
      }
    };
    var validateMobile = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!isMobile(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!isPhone(value)) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!isEmail(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    };
    var validateNumber = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!isNumber(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    var validateIntNumber = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!isIntNumer(value)) {
        callback(new Error("请输入整数"));
      } else {
        callback();
      }
    };
    return {
      id: '',
      type: '',
      ro: {
        biaoti: false,
        chengshi: false,
        fabushijian: false,
        gongsizhanghao: false,
        gongsimingcheng: false,
        zhucebianhao: false,
        zhaopingangwei: false,
        gangweileixing: false,
        zhaopinrenshu: false,
        gangweidaiyu: false,
        gangweiyaoqiu: false,
        fengmian: false,
        gongsijieshao: false,
      },
      ruleForm: {
        biaoti: '',
        chengshi: '',
        fabushijian: '',
        gongsizhanghao: '',
        gongsimingcheng: '',
        zhucebianhao: '',
        zhaopingangwei: '',
        gangweileixing: '',
        zhaopinrenshu: '',
        gangweidaiyu: '',
        gangweiyaoqiu: '',
        fengmian: '',
        gongsijieshao: '',
      },
      chengshiOptions: [],
      gangweileixingOptions: [],
      rules: {
        biaoti: [],
        chengshi: [],
        fabushijian: [],
        gongsizhanghao: [],
        gongsimingcheng: [],
        zhucebianhao: [],
        zhaopingangwei: [],
        gangweileixing: [],
        zhaopinrenshu: [
          {validator: validateIntNumber, trigger: 'blur'},
        ],
        gangweidaiyu: [],
        gangweiyaoqiu: [],
        fengmian: [],
        gongsijieshao: [],
      },
      upload_url: ""
    };
  },
  props: ["parent"],
  computed: {},
  created() {
    this.ruleForm.fabushijian = this.getCurDateTime()
    this.get_upload_key()
  },
  methods: {
    get_upload_key(){
        this.$http.post(DOMAIN_API_SYS + "/uploads/upload_key/", {}).then(res => {
        let upload_key = res.data.data.key;
        this.upload_url = UPLOAD_URL + '?upcheck=' + upload_key + '&up_type=carousel'
      })
    },
    // 下载
    download(file) {
      window.open(`${file}`)
    },
    // 初始化
    init(id, type) {
      if (id) {
        this.id = id;
        this.type = type;
      }
      if (this.type == 'info' || this.type == 'else') {
        this.info(id);
      } else if (this.type == 'logistics') {
        this.logistics = false;
        this.info(id);
      } else if (this.type == 'cross') {
        var obj = this.$storage.getObj('crossObj');
        for (var o in obj) {
          if (o == 'biaoti') {
            this.ruleForm.biaoti = obj[o];
            this.ro.biaoti = true;
            continue;
          }
          if (o == 'chengshi') {
            this.ruleForm.chengshi = obj[o];
            this.ro.chengshi = true;
            continue;
          }
          if (o == 'fabushijian') {
            this.ruleForm.fabushijian = obj[o];
            this.ro.fabushijian = true;
            continue;
          }
          if (o == 'gongsizhanghao') {
            this.ruleForm.gongsizhanghao = obj[o];
            this.ro.gongsizhanghao = true;
            continue;
          }
          if (o == 'gongsimingcheng') {
            this.ruleForm.gongsimingcheng = obj[o];
            this.ro.gongsimingcheng = true;
            continue;
          }
          if (o == 'zhucebianhao') {
            this.ruleForm.zhucebianhao = obj[o];
            this.ro.zhucebianhao = true;
            continue;
          }
          if (o == 'zhaopingangwei') {
            this.ruleForm.zhaopingangwei = obj[o];
            this.ro.zhaopingangwei = true;
            continue;
          }
          if (o == 'gangweileixing') {
            this.ruleForm.gangweileixing = obj[o];
            this.ro.gangweileixing = true;
            continue;
          }
          if (o == 'zhaopinrenshu') {
            this.ruleForm.zhaopinrenshu = obj[o];
            this.ro.zhaopinrenshu = true;
            continue;
          }
          if (o == 'gangweidaiyu') {
            this.ruleForm.gangweidaiyu = obj[o];
            this.ro.gangweidaiyu = true;
            continue;
          }
          if (o == 'gangweiyaoqiu') {
            this.ruleForm.gangweiyaoqiu = obj[o];
            this.ro.gangweiyaoqiu = true;
            continue;
          }
          if (o == 'fengmian') {
            this.ruleForm.fengmian = obj[o];
            this.ro.fengmian = true;
            continue;
          }
          if (o == 'gongsijieshao') {
            this.ruleForm.gongsijieshao = obj[o];
            this.ro.gongsijieshao = true;
            continue;
          }
        }
      }
      // 获取用户信息
      this.$http({
        url: `${this.$storage.get('sessionTable')}/session?id=${this.$storage.get('userId')}`,
        method: "get"
      }).then(({data}) => {
        if (data && data.code === 0) {
          var json = data.data;
          if (json.gongsizhanghao != '' && json.gongsizhanghao) {
            this.ruleForm.gongsizhanghao = json.gongsizhanghao
            this.ro.gongsizhanghao = true;
          }
          if (json.gongsimingcheng != '' && json.gongsimingcheng) {
            this.ruleForm.gongsimingcheng = json.gongsimingcheng
            this.ro.gongsimingcheng = true;
          }
          if (json.zhucebianhao != '' && json.zhucebianhao) {
            this.ruleForm.zhucebianhao = json.zhucebianhao
            this.ro.zhucebianhao = true;
          }
        } else {
          this.$message.error(data.msg);
        }
      });
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
    // 多级联动参数
    info(id) {
      this.$http({
        url: `zhaopinxinxi/info/${id}`,
        method: "get"
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
          //解决前台上传图片后台不显示的问题
          let reg = new RegExp('../../../upload', 'g')//g代表全部
          this.ruleForm.gongsijieshao = this.ruleForm.gongsijieshao.replace(reg, '../../../django7681v/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 提交
    onSubmit() {
      if (this.ruleForm.fengmian != null) {
        this.ruleForm.fengmian = this.ruleForm.fengmian.replace(new RegExp(this.$base.url, "g"), "");
      }


      var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
      var crossuserid;
      var crossrefid;
      var crossoptnum;
      if (this.type == 'cross') {
        var statusColumnName = this.$storage.get('statusColumnName');
        var statusColumnValue = this.$storage.get('statusColumnValue');
        if (statusColumnName != '') {
          var obj = this.$storage.getObj('crossObj');
          if (!statusColumnName.startsWith("[")) {
            for (var o in obj) {
              if (o == statusColumnName) {
                obj[o] = statusColumnValue;
              }
            }
            var table = this.$storage.get('crossTable');
            this.$http({
              url: `${table}/update`,
              method: "post",
              data: obj
            }).then(({data}) => {
            });
          } else {
            crossuserid = this.$storage.get('userid');
            crossrefid = obj['id'];
            crossoptnum = this.$storage.get('statusColumnName');
            crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
          }
        }
      }
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (crossrefid && crossuserid) {
            this.ruleForm.crossuserid = crossuserid;
            this.ruleForm.crossrefid = crossrefid;
            let params = {
              page: 1,
              limit: 10,
              crossuserid: this.ruleForm.crossuserid,
              crossrefid: this.ruleForm.crossrefid,
            }
            this.$http({
              url: "zhaopinxinxi/page",
              method: "get",
              params: params
            }).then(({
                       data
                     }) => {
              if (data && data.code === 0) {
                if (data.data.total >= crossoptnum) {
                  this.$message.error(this.$storage.get('tips'));
                  return false;
                } else {
                  this.$http({
                    url: `zhaopinxinxi/${!this.ruleForm.id ? "save" : "update"}`,
                    method: "post",
                    data: this.ruleForm
                  }).then(({data}) => {
                    if (data && data.code === 0) {
                      this.$message({
                        message: "操作成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                          this.parent.showFlag = true;
                          this.parent.addOrUpdateFlag = false;
                          this.parent.zhaopinxinxiCrossAddOrUpdateFlag = false;
                          this.parent.search();
                        }
                      });
                    } else {
                      this.$message.error(data.msg);
                    }
                  });

                }
              } else {
              }
            });
          } else {
            this.$http({
              url: `zhaopinxinxi/${!this.ruleForm.id ? "save" : "update"}`,
              method: "post",
              data: this.ruleForm
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.parent.showFlag = true;
                    this.parent.addOrUpdateFlag = false;
                    this.parent.zhaopinxinxiCrossAddOrUpdateFlag = false;
                    this.parent.search();
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        }
      });
    },
    // 获取uuid
    getUUID() {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.zhaopinxinxiCrossAddOrUpdateFlag = false;
    },
    fengmianUploadChange(fileUrls) {
      this.ruleForm.fengmian = fileUrls;
    },
  }
};
</script>
<style lang="scss">
.editor {
  height: 500px;

  & /deep/ .ql-container {
    height: 310px;
  }
}

.amap-wrapper {
  width: 100%;
  height: 500px;
}

.search-box {
  position: absolute;
}

.addEdit-block {
  margin: -10px;
}

.detail-form-content {
  padding: 12px;
  background-color: transparent;
}

</style>
