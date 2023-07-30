<template>
  <el-row>
  <el-tabs v-model="activeName" @tab-click="handleClick" >
    <el-tab-pane label="基本信息" name="first" v-loading="loading">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <el-form
              size="mini"
              class="detail-form-content"
              :ref="ruleForm1"
              :model="ruleForm"
              label-width="120px"
              style="background: transparent;"
          >
            <el-form-item label="手机" prop="phone_number">
              <el-input v-model="ruleForm.phone_number" placeholder="手机" clearable readonly
                        style="margin-right: 10px;"></el-input>
<!--              <el-button type="primary" icon="el-icon-edit" circle></el-button>-->
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="ruleForm.email" placeholder="绑定邮箱" clearable readonly
                        style="margin-right: 10px;"></el-input>
<!--              <el-button type="primary" icon="el-icon-edit" circle></el-button>-->
            </el-form-item>

            <el-form-item label="身份证(正面)" prop="ocr_info_front" v-if="loading === false">
              <el-upload
                  v-loading="loading"
                  element-loading-text="拼命识别中"
                  element-loading-spinner="el-icon-loading"
                  class="avatar-uploader"
                  :action="upload_url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload" readonly :disabled="true">
                <img v-if="ruleForm.form.imageUrl1" :src="ruleForm.form.imageUrl1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <div v-if="ruleForm.form.imageUrl1">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="用户姓名" clearable maxlength="10" readonly></el-input>
              </el-form-item>
              <el-form-item label="身份证" prop="number_id">
                <el-input v-model="ruleForm.number_id" placeholder="身份证" clearable maxlength="18" readonly></el-input>
              </el-form-item>
            </div>
            <el-form-item label="身份证(背面)" prop="ocr_info_back">
              <el-upload
                  v-loading="loading"
                  element-loading-text="拼命识别中"
                  element-loading-spinner="el-icon-loading"
                  class="avatar-uploader"
                  :action="upload_url"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload" readonly :disabled="true">
                <img v-if="ruleForm.form.imageUrl2" :src="ruleForm.form.imageUrl2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <div v-if="ruleForm.form.imageUrl2">
              <el-form-item label="有效期:" prop="back_time">
                <el-date-picker
                    v-model="ruleForm.form.ocr_back.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" readonly>
                </el-date-picker>
              </el-form-item>
            </div>
            <!--          <el-form-item>-->
            <!--            <el-button type="primary" @click="onUpdateHandler">修 改</el-button>-->
            <!--          </el-form-item>-->
          </el-form>
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="学历信息" name="second">
      <div>
        <div class="text item">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>学历信息</span>
            </div>
            <el-card class="box-card" v-for="(item,i) in ruleForm.school_list" :key="i" :body-style="boxcard">
              <el-form ref="school_ref" :model="item" label-width="100px" size="mini">
                <el-divider>学历 {{ i + 1 }}</el-divider>
                <el-form-item label="学历:" prop="education">
                  <template>
                    <el-select v-model="item.education" placeholder="请选择" clearable readonly>
                      <el-option
                          v-for="opt in education_options"
                          :key="opt"
                          :label="opt"
                          :value="opt">
                      </el-option>
                    </el-select>
                  </template>
                </el-form-item>
                <el-form-item label="学校:">
                  <el-input v-model="item.school" maxlength="10" clearable readonly></el-input>
                </el-form-item>
                <el-form-item label="专业:">
                  <el-input v-model="item.speciality" maxlength="10" clearable readonly></el-input>
                </el-form-item>
                <el-form-item label="上学时间">
                  <el-date-picker
                      v-model="item.time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="入学日期"
                      end-placeholder="毕业日期" clearable readonly
                  >
                  </el-date-picker>

                </el-form-item>
                <el-form-item label="毕业证:" v-if="item.education != '在校学生' & item.education != ''">
                  <el-upload
                      element-loading-text="上传中"
                      element-loading-spinner="el-icon-loading"
                      class="avatar-uploader"
                      :action="upload_url"
                      :show-file-list="false" clearable readonly :disabled="true"
                  >
                    <img v-if="item.diploma" :src="item.diploma" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="学位证:" v-if="item.education != '在校学生' & item.education != ''">
                  <el-upload
                      element-loading-text="上传中"
                      element-loading-spinner="el-icon-loading"
                      class="avatar-uploader"
                      :action="upload_url"
                      :show-file-list="false" clearable readonly :disabled="true">
                    <img v-if="item.degree" :src="item.degree" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>


              </el-form>
            </el-card>
          </el-card>
        </div>

      </div>

    </el-tab-pane>
    <el-tab-pane label="工作经历" name="third">
      <div>
        <div class="text item">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>工作经历</span>
            </div>
            <el-card class="box-card" v-for="(item,i) in ruleForm.work_list" :key="i" :body-style="boxcard">
              <el-form ref="work_rules" :model="item" label-width="100px" size="mini">
                <el-divider>工作经历{{ i + 1 }}</el-divider>
                <el-form-item label="公司名:" prop="name">
                  <el-input v-model="item.name" maxlength="10" readonly></el-input>
                </el-form-item>
                <el-form-item label="从事行业:" prop="industry">
                  <el-input v-model="item.industry" maxlength="10" readonly></el-input>
                </el-form-item>
                <el-form-item label="岗位:" prop="post">
                  <el-input v-model="item.post" maxlength="10" readonly></el-input>
                </el-form-item>

                <el-form-item label="技能关键词:" prop="keyword">
                  <template>
                    <el-input v-model="item.keyword" maxlength="10" readonly></el-input>
                    <!--                                        <el-select v-model="item.keyword" placeholder="请选择" readonly>-->
                    <!--                                            <el-option-->
                    <!--                                                    v-for="item in subjects"-->
                    <!--                                                    :key="item.id"-->
                    <!--                                                    :label="item.name"-->
                    <!--                                                    :value="item.name" readonly>-->
                    <!--                                            </el-option>-->
                    <!--                                            <el-option value="其他技能" label="其他技能"></el-option>-->
                    <!--                                        </el-select>-->
                  </template>
                </el-form-item>
                <el-form-item label="其他技能:" prop="keyword_new" v-if="item.keyword == '其他技能'">
                  <el-input v-model="item.keyword_new" maxlength="10" readonly></el-input>
                </el-form-item>

                <el-form-item label="工作时间:" prop="time">
                  <el-date-picker
                      v-model="item.time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="入职时间"
                      end-placeholder="离职时间" readonly>
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </el-card>
          </el-card>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="其他证明" name="fourth">
      <div>
        <div class="text item">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>其他证明</span>
            </div>
            <el-form ref="prove_rules" :model="ruleForm.prove" label-width="100px" size="mini">
              <el-divider>其他证明材料</el-divider>
              <el-form-item label="在职证明:" prop="work">
                <el-upload
                    element-loading-text="上传中"
                    element-loading-spinner="el-icon-loading"
                    class="avatar-uploader"
                    :action="upload_url"
                    :show-file-list="false"
                    :on-success="(response) =>handleAvatarSuccess3(response, 0, 3)"
                    :before-upload="beforeAvatarUpload" :disabled="true">
                  <img v-if="ruleForm.prove.work" :src="ruleForm.prove.work" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="社保证明:" prop="security">
                <el-upload
                    element-loading-text="上传中"
                    element-loading-spinner="el-icon-loading"
                    class="avatar-uploader"
                    :action="upload_url"
                    :show-file-list="false"
                    :on-success="(response) =>handleAvatarSuccess3(response, 0, 4)"
                    :before-upload="beforeAvatarUpload" :disabled="true">
                  <img v-if="ruleForm.prove.security" :src="ruleForm.prove.security" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="其他证明:">
                <el-upload
                    element-loading-text="上传中"
                    element-loading-spinner="el-icon-loading"
                    class="avatar-uploader"
                    :action="upload_url"
                    :show-file-list="false"
                    :on-success="(response) =>handleAvatarSuccess3(response, 0, 5)"
                    :before-upload="beforeAvatarUpload" :disabled="true">
                  <img v-if="ruleForm.prove.other" :src="ruleForm.prove.other" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

            </el-form>
          </el-card>
        </div>
      </div>

    </el-tab-pane>
    <el-tab-pane label="掌握技能" name="knowledge_list">
      <div>
        <div class="text item">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>掌握技能</span>
            </div>
            <el-card class="box-card" v-for="(item,i) in ruleForm.knowledge_list" :key="i" :body-style="boxcard">
                            <el-form ref="knowledge_rules" :model="item" label-width="120px" size="mini">
                                <el-divider>专业技能</el-divider>
                                <el-form-item label="技能类型:">
                                    <template>
                                        <el-radio v-model="item.type" label="1" readonly>平台技能</el-radio>
                                        <el-radio v-model="item.type" label="2" readonly>其他技能</el-radio>
                                    </template>
                                </el-form-item>
                                <el-form-item label="技能名称:" prop="name" v-if="item.type == 1">
                                    <template>
                                        <el-select v-model="item.name" placeholder="请选择" readonly>
                                            <el-option
                                                    v-for="item in subjects"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.name" readonly>
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-form-item>
                                <el-form-item label="技能名称:" prop="name" v-if="item.type == 2">
                                    <el-input v-model="item.name" maxlength="10" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="使用时长(月):" prop="use_month">
                                    <el-input v-model.number="item.use_month" maxlength="10" readonly></el-input>
                                </el-form-item>
                                <el-form-item label="掌握程度:" prop="level">
                                    <template>
                                        <el-radio v-model="item.level" label="1" readonly>一般</el-radio>
                                        <el-radio v-model="item.level" label="2" readonly>熟练</el-radio>
                                        <el-radio v-model="item.level" label="3" readonly>良好</el-radio>
                                        <el-radio v-model="item.level" label="4" readonly>精通</el-radio>
                                    </template>
                                </el-form-item>

                            </el-form>
            </el-card>
          </el-card>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
  </el-row>
</template>
<script>

export default {
  data() {
    return {
      boxcard: {},
      subjects: [],
      education_options: ['在校学生', '中专', '大专', '专升本', '本科', '硕士研究生', '其他学历'],
      upload_url: "/",
      activeName: "first",
      loading: false,
      ruleForm: {},
      ruleForm1: {
        name: [{required: true, message: '请填写姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}],
        phone: [
          {required: true, message: '请填写手机号', trigger: 'blur'},
        ],
        number_id: [
          {required: true, message: '请填写身份证号码', trigger: 'blur'},
          {min: 18, max: 18, message: '请输入18为公民身份证号', trigger: 'blur'}
        ],
        back_time: [
          {required: true, message: '请填写身份证有效期', trigger: 'blur'},
        ]

      },
    };
  },
  // is-disabled

  mounted() {

  },
  created() {
    this.init_data()
  },
  methods: {
    init_data: function () {
      const loading = this.$loading({
          lock: true,
          target: document.querySelector('.box-card'),
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        });
      this.$http.get(DOMAIN_API_SYS + "/tea/userinfo/").then(res => {
      this.ruleForm = res.data.data;
      this.$.each(this.ruleForm.school_list, function (i) {
        this.time = [
          new Date(this.time[0].substring(0, 4),
              parseInt(this.time[0].substring(4, 6)) - 1,
              this.time[0].substring(6, 8)),
          new Date(this.time[1].substring(0, 4),
              parseInt(this.time[1].substring(4, 6)) - 1,
              this.time[1].substring(6, 8))
        ]
      })

      this.$.each(this.ruleForm.work_list, function (i) {
        this.time = [
          new Date(this.time[0].substring(0, 4),
              parseInt(this.time[0].substring(4, 6)) - 1,
              this.time[0].substring(6, 8)),
          new Date(this.time[1].substring(0, 4),
              parseInt(this.time[1].substring(4, 6)) - 1,
              this.time[1].substring(6, 8))
        ]
      })
      this.upload_url = res.data.data.upload_url;
      this.subjects = res.data.data.subjects;
      loading.close();
    })
    },
    // 上传验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 识别身份证正面
    handleAvatarSuccess(res) {
      this.ruleForm.form.imageUrl1 = this.web_file_url + res.data[0].file_url
      this.loading = true;
    },

    onUpdateHandler() {

      this.$http({
        url: DOMAIN_API_SYS + `/user_info`,
        method: "post",
        data: this.ruleForm
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message({
            message: "修改信息成功",
            type: "success",
            duration: 1500,
            onClose: () => {

            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 328px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 328px;
  height: 178px;
  display: block;
}

.el-card.box-card.is-always-shadow {
  margin-bottom: 20px;
}

.el-form {
  width: auto;
  padding-bottom: 0;
}
</style>
