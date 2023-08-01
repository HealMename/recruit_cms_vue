<template>
  <el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
      <el-tab-pane label="基本信息" name="first">
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
              <el-form-item label="手机:" prop="phone_number">
                {{ ruleForm.phone_number.slice(0, 3) }}****{{ ruleForm.phone_number.slice(7, 11) }}
                <el-button type="primary" icon="el-icon-edit" circle
                           @click="dialog_phone = true;active = 1"></el-button>
              </el-form-item>
              <el-form-item label="邮箱:">
                {{ ruleForm.email }}
                <el-button type="primary" icon="el-icon-edit" circle
                           @click="dialog_email = true;active = 1"></el-button>
              </el-form-item>
              <div v-if="ruleForm.form.imageUrl1">
                <el-form-item label="姓名:" prop="name">
                  {{ ruleForm.name }}
                </el-form-item>
                <el-form-item label="身份证:" prop="number_id">
                  {{ ruleForm.number_id.slice(0, 3) }}***********{{ ruleForm.number_id.slice(14, 18) }}
                </el-form-item>
              </div>
              <el-form-item label="身份证:" prop="ocr_info_front" v-if="loading === false">
                <el-dialog title="身份证" :visible.sync="img_dialog">
                  <el-table
                      style="width: 100%"
                      :data="[{'imageUrl1': ruleForm.form.imageUrl1, 'imageUrl2': ruleForm.form.imageUrl1}]">
                    <el-table-column
                        prop="imageUrl1"
                        label="正面" align="center">
                      <el-image style="width: 328px; height: 178px" :src="ruleForm.form.imageUrl1"
                                fit="fill"></el-image>
                    </el-table-column>
                    <el-table-column
                        prop="imageUrl2"
                        label="背面" align="center">
                      <el-image style="width: 328px; height: 178px" :src="ruleForm.form.imageUrl2"
                                fit="fill"></el-image>
                    </el-table-column>
                  </el-table>
                </el-dialog>
                <el-button type="text" @click="img_dialog = true;">点击查看</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-dialog
              id="update_phone"
              title="绑定手机号" :show-close="false"
              :visible.sync="dialog_phone" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-steps :active="active" finish-status="success">
              <el-step title="验证身份"></el-step>
              <el-step title="绑定手机号"></el-step>
              <el-step title="绑定成功"></el-step>
            </el-steps>
            <el-form v-if="active === 1" label-width="80px">
              <el-form-item label="原手机号:">
                <el-input v-model="ruleForm.phone_number.slice(0, 3)+ '****' + ruleForm.phone_number.slice(7, 11)" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="验证码:">
                <el-input v-model="code" autocomplete="off" maxlength="6"></el-input>
                <el-button style="margin-top: 12px;" @click="sendMessage(ruleForm.phone_number)" type="primary"
                           class="getcode"
                           :disabled="disabled">发送验证码
                </el-button>
              </el-form-item>
            </el-form>
            <el-form v-if="active === 2" label-width="80px">
              <el-form-item label="新手机号:">
                <el-input v-model="send_phone_number" autocomplete="off" maxlength="11"></el-input>
              </el-form-item>
              <el-form-item label="验证码:" label-width="80">
                <el-input v-model="code" autocomplete="off" maxlength="6"></el-input>
                <el-button style="margin-top: 12px;" @click="sendMessage(send_phone_number)" type="primary"
                           class="getcode"
                           :disabled="disabled">发送验证码
                </el-button>
              </el-form-item>
            </el-form>
            <Vcode :show="isShow" @success="success" @close="close"/>
            <p v-if="active === 3" style="padding: 30px;text-align: center;font-size: 20px;">
              手机号绑定成功！{{ go_login_second }}秒后重新登陆！</p>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialog_phone = false" v-if="active !== 3">取 消</el-button>
            <el-button type="primary" @click="next_verify();" v-if="active !== 3">下一步</el-button>
          </span>
          </el-dialog>
          <el-dialog
              id="update_email"
              title="绑定邮箱" :show-close="false"
              :visible.sync="dialog_email" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-steps :active="active" finish-status="success">
              <el-step title="验证身份"></el-step>
              <el-step title="绑定邮箱"></el-step>
              <el-step title="绑定成功"></el-step>
            </el-steps>
            <el-form v-if="active === 1" label-width="80px">
              <el-form-item label="原手机号:">
                <el-input v-model="ruleForm.phone_number" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="验证码:">
                <el-input v-model="code" autocomplete="off" maxlength="6"></el-input>
                <el-button style="margin-top: 12px;" @click="sendMessage(ruleForm.phone_number)" type="primary"
                           class="getcode"
                           :disabled="disabled">发送验证码
                </el-button>
              </el-form-item>
            </el-form>
            <el-form v-if="active === 2" label-width="80px">
              <el-form-item label="邮箱:">
                <el-input v-model="send_email" autocomplete="off" maxlength="100" type="email"></el-input>
              </el-form-item>
              <el-form-item label="验证码:" label-width="80">
                <el-input v-model="code" autocomplete="off"></el-input>
                <el-button style="margin-top: 12px;" @click="sendEmail()" type="primary" class="getcode"
                           :disabled="disabled">发送验证码
                </el-button>
              </el-form-item>
            </el-form>
            <Vcode :show="isShow" @success="success_email" @close="close"/>
            <p v-if="active === 3" style="padding: 30px;text-align: center;font-size: 20px;">邮箱绑定成功！</p>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialog_email = false" v-if="active !== 3">取 消</el-button>
            <el-button type="primary" @click="next_email_verify();" v-if="active !== 3">下一步</el-button>
          </span>
          </el-dialog>
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
import Vcode from "vue-puzzle-vcode";

export default {
  components: {
    Vcode
  },
  data() {
    return {
      dialog_email: false,
      send_email: "",
      dialog_phone: false,
      send_phone_number: '',
      code: '',
      active: 1,
      img_dialog: false,
      img_url1: "",
      img_url2: "",
      boxcard: {},
      subjects: [],
      education_options: ['在校学生', '中专', '大专', '专升本', '本科', '硕士研究生', '其他学历'],
      upload_url: "/",
      activeName: "first",
      loading: false,
      ruleForm: {
        phone_number: '',
        form: {
          imageUrl1: '',
          imageUrl2: '',
        },
        prove: {
          work: ''
        }
      },
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
      isShow: false,
      disabled: false,
      go_login_second: 3,
      timeout: null,
    };
  },
  // is-disabled

  mounted() {

  },
  created() {
    this.init_data()
  },
  methods: {
    sendEmail() {
      // 发送邮件
      // 打开验证码弹窗
      let emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailReg.test(this.send_email)) {
        this.$message.error("请输入正确的邮箱格式");
        return;
      }
      this.isShow = true;
    },
    go_login(second) {
      // 如果秒数还是大于0，则表示倒计时还没结束
      var thsi = this;
      this.go_login_second = second;
      if (second >= 0) {
        // 时间减一
        second--;
        // 一秒后重复执行
        setTimeout(function () {
          thsi.go_login(second);
        }, 1000);

      } else {
        // 登陆页
        window.location.href = `/`
      }
    },
    countDown(obj, second) {
      // 如果秒数还是大于0，则表示倒计时还没结束
      var thsi = this;
      if (second >= 0) {
        this.disabled = true;

        // 按钮置为不可点击状态
        obj.disabled = true;
        this.$(".getcode").css('background-color', 'grey')
        // 按钮里的内容呈现倒计时状态
        this.$(obj).text(String(second) + '秒后重发');
        // 时间减一
        second--;
        // 一秒后重复执行
        this.timeout = setTimeout(function () {
          thsi.countDown(obj, second);
        }, 1000);
        // 否则，按钮重置为初始状态
      } else {
        // 按钮置未可点击状态
        obj.disabled = false;
        this.disabled = false;
        this.$(".getcode").css('background-color', '#00c292')
        // 按钮里的内容恢复初始状态
        this.$(".getcode")[0].textContent = '发送验证码';
      }
    },
    // 用户通过了验证
    success(msg) {
      var thsi = this;
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      // 发送验证码
      this.countDown(this.$('.getcode'), 60)

      this.$.post(DOMAIN_API_SYS + '/sms/send/', {
        phone: this.send_phone_number,
        code_id: this.active + 5
      }, function (res) {
        if (res.response === 'ok') {
          thsi.$message.success('验证码已发送, 2分钟内有效')
        } else {
          thsi.$message.error(res.message)
        }

      })
    },

    // 用户通过了验证
    success_email(msg) {
      var thsi = this;
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      // 发送验证码
      this.countDown(this.$('.getcode'), 60)
      if (this.dialog_email && this.active === 2) {
        this.$.post(DOMAIN_API_SYS + '/sms/send_email/', {
          email: this.send_email,
          code_id: 8
        }, function (res) {
          if (res.response === 'ok') {
            thsi.$message.success('验证码已发送, 2分钟内有效')
          } else {
            thsi.$message.error(res.message)
          }
        })
      } else {
        this.$.post(DOMAIN_API_SYS + '/sms/send/', {
          phone: this.send_phone_number,
          code_id: this.active + 5
        }, function (res) {
          if (res.response === 'ok') {
            thsi.$message.success('验证码已发送, 2分钟内有效')
          } else {
            thsi.$message.error(res.message)
          }

        })
      }

    },


    close() {
      this.isShow = false;
    },

    next_email_verify() {
      let emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.active === 1) {
        this.send_phone_number = this.ruleForm.phone_number
      }
      if (this.active === 2 && this.send_email === this.ruleForm.email) {
        this.$message.error("新邮箱和旧邮箱相同");
        return;
      }
      if (this.active === 2 && !this.send_email) {
        this.$message.error("请输入手机号");
        return;
      }
      if (this.active === 2 && !emailReg.test(this.send_email)) {
        this.$message.error("请输入正确的邮箱格式");
        return;
      }
      if (!this.code) {
        this.$message.error("请输入验证码");
        return;
      }
      if (this.active === 2) {
        this.send_phone_number = this.send_email
      }

      var thsi = this;
      this.$.post(DOMAIN_API_SYS + '/sms/verify_code/',
          {
            phone: this.send_phone_number,
            code_id: this.active + 5 === 6 ? 6 : 8,
            code: this.code,
            old_phone: this.ruleForm.phone_number
          },
          function (res) {
            if (res.response === 'ok') {
              thsi.active += 1
              thsi.disabled = false;
              thsi.code = ''
              thsi.send_phone_number = ''
              thsi.$(".getcode").css('background-color', '#00c292')
              thsi.$(".getcode")[0].textContent = '发送验证码';
              clearTimeout(thsi.timeout)
              if (thsi.active === 3) {
                thsi.init_data()
              }
            } else {
              thsi.$message.error(res.message)
            }
          })
    },


    next_verify() {
      if (this.active === 1) {
        this.send_phone_number = this.ruleForm.phone_number
      }
      if (this.active === 2 && this.send_phone_number === this.ruleForm.phone_number) {
        this.$message.error("新手机号和旧手机号相同");
        return;
      }
      if (!this.send_phone_number || this.send_phone_number.length !== 11) {
        this.$message.error("请输入手机号");
        return;
      }
      if (!this.code) {
        this.$message.error("请输入验证码");
        return;
      }

      var thsi = this;
      this.$.post(DOMAIN_API_SYS + '/sms/verify_code/',
          {
            phone: this.send_phone_number,
            code_id: this.active + 5,
            code: this.code,
            old_phone: this.ruleForm.phone_number
          },
          function (res) {
            if (res.response === 'ok') {
              thsi.active += 1
              thsi.disabled = false;
              thsi.code = ''
              thsi.send_phone_number = ''
              thsi.$(".getcode").css('background-color', '#00c292')
              thsi.$(".getcode")[0].textContent = '发送验证码';
              clearTimeout(thsi.timeout)
              if (thsi.active === 3) {
                thsi.$storage.clear();
                thsi.go_login(3)
              }
            } else {
              thsi.$message.error(res.message)
            }
          })
    },
    sendMessage(username) {
      // 打开验证码弹窗
      if (!username) {
        this.$message.error("请输入手机号");
        return;
      }
      this.send_phone_number = username;
      this.isShow = true;
    },
    init_data: function () {
      const loading = this.$loading({
        lock: true,
        target: document.querySelector('.box-card'),
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      this.$http.get(DOMAIN_API_SYS + "/tea/userinfo/").then(res => {
        this.dialog_email = false;
        this.ruleForm = res.data.data;
        if (!res.data.data.prove) {
          this.ruleForm.prove = {
            work: ''
          }
        }
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
  border: 1px solid #DCDFE6
}

.avatar {
  width: 328px;
  height: 178px;
  display: block;
}

.el-card.box-card.is-always-shadow {
  margin-bottom: 20px;
}


#update_phone .el-form, #update_email .el-form, {
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
}

.el-form {
  width: auto;
  padding-bottom: 0;
}

.el-dialog__wrapper {
  z-index: 998 !important;
}

</style>
