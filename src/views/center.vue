<template>
  <el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
      <el-tab-pane label="基本信息" name="first" id="first">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <el-form
                size="mini"
                class="detail-form-content"
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
                      <el-image :src="ruleForm.form.imageUrl1"
                                fit="fill"></el-image>
                    </el-table-column>
                    <el-table-column
                        prop="imageUrl2"
                        label="背面" align="center">
                      <el-image :src="ruleForm.form.imageUrl2"
                                fit="fill"></el-image>
                    </el-table-column>
                  </el-table>
                </el-dialog>
                <el-button type="text" @click="img_dialog = true;">查看</el-button>
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
                <el-input v-model="ruleForm.phone_number.slice(0, 3)+ '****' + ruleForm.phone_number.slice(7, 11)"
                          autocomplete="off" disabled></el-input>
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
                <el-input v-model="ruleForm.phone_number.slice(0, 3)+ '****' + ruleForm.phone_number.slice(7, 11)"
                          autocomplete="off" disabled></el-input>
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
          <el-card class="box-card school_list">
            <div slot="header" class="clearfix">
              <span>学历信息 <el-button style="float: right;" type="text"
                                    @click="update_data('school', 1)">修改</el-button></span>
            </div>
            <el-dialog title="学历证书" :visible.sync="school_img_dialog">
              <el-table
                  style="width: 100%"
                  :data="[{'imageUrl1': ruleForm.form.imageUrl1, 'imageUrl2': ruleForm.form.imageUrl1}]">
                <el-table-column
                    prop="imageUrl1"
                    label="毕业证" align="center"
                    v-if="education !== '在校学生' && education !== '' && diploma">
                  <el-image :src="diploma"
                            fit="fill"></el-image>
                </el-table-column>
                <el-table-column
                    prop="imageUrl2"
                    label="学位证" align="center"
                    v-if="education !== '在校学生' && education !== '' && degree">
                  <el-image :src="degree"
                            fit="fill"></el-image>
                </el-table-column>
                <el-table-column
                    prop="imageUrl2"
                    label="学生证" align="center" v-if="education === '在校学生' && stu_card">
                  <el-image :src="stu_card"
                            fit="fill"></el-image>
                </el-table-column>
              </el-table>
            </el-dialog>
            <el-card class="box-card" v-for="(item,i) in ruleForm.school_list" :key="i" :body-style="boxcard">
              <el-descriptions :title="'学历'+ (i + 1)">
                <el-descriptions-item label="学历">{{ item.education }}</el-descriptions-item>
                <el-descriptions-item label="学校">{{ item.school }}</el-descriptions-item>
                <el-descriptions-item label="专业">{{ item.speciality }}</el-descriptions-item>
                <el-descriptions-item label="上学时间">
                  <span v-text="handle_time(item.time)"></span>
                </el-descriptions-item>
                <el-descriptions-item label="证书">
                  <el-button type="text" @click="look_school(item)">查看</el-button>
                </el-descriptions-item>
              </el-descriptions>
            </el-card>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>工作经历 <el-button style="float: right;" type="text"
                                    @click="update_data('work', 2)">修改</el-button></span>
            </div>
            <el-card class="box-card" v-for="(item,i) in ruleForm.work_list" :key="i" :body-style="boxcard">
              <el-descriptions :title="'工作经历' + (i + 1)">
                <el-descriptions-item label="公司名称">{{ item.name }}</el-descriptions-item>
                <el-descriptions-item label="从事行业">{{ item.industry }}</el-descriptions-item>
                <el-descriptions-item label="工作岗位">{{ item.post }}</el-descriptions-item>
                <el-descriptions-item label="技能关键词" v-if="item.keyword !== '其他技能'">{{ item.keyword }}
                </el-descriptions-item>
                <el-descriptions-item label="技能关键词" v-if="item.keyword === '其他技能'">{{ item.keyword_new }}
                </el-descriptions-item>
                <el-descriptions-item label="工作时间">{{ handle_time(item.time) }}</el-descriptions-item>
              </el-descriptions>
            </el-card>
          </el-card>
          <el-card class="box-card knowledge_list">
            <div slot="header" class="clearfix">
              <span>掌握技能 <el-button style="float: right;" type="text"
                                    @click="update_data('knowledge_list', 4)">修改</el-button></span>
            </div>
            <el-card class="box-card" v-for="(item,i) in ruleForm.knowledge_list" :key="i" :body-style="boxcard">
              <el-descriptions :title="'专业技能' + (i + 1)">
                <el-descriptions-item label="技能名称">{{ item.name }}</el-descriptions-item>
                <el-descriptions-item label="使用时长(月)">{{ item.use_month }}</el-descriptions-item>
                <el-descriptions-item label="掌握程度">{{ item.level }}</el-descriptions-item>
              </el-descriptions>
            </el-card>
          </el-card>
          <el-card class="box-card prove">
            <div slot="header" class="clearfix">
              <span>其他材料 <el-button style="float: right; margin-left: 10px;" type="text"
                                    @click="prove_img_dialog = true;">查看详情</el-button><el-button style="float: right;"
                                                                                                 type="text"
                                                                                                 @click="update_data('prove', 3)">修改</el-button></span>
            </div>
            <el-dialog title="其他材料" :visible.sync="prove_img_dialog">
              <el-table
                  style="width: 100%"
                  :data="[{'imageUrl1': ruleForm.form.imageUrl1, 'imageUrl2': ruleForm.form.imageUrl1}]">
                <el-table-column
                    prop="imageUrl1"
                    label="在职证明" align="center" v-if="ruleForm.prove.work">
                  <el-image :src="ruleForm.prove.work"
                            fit="fill"></el-image>
                </el-table-column>
                <el-table-column
                    prop="imageUrl2"
                    label="社保证明" align="center" v-if="ruleForm.prove.security">
                  <el-image :src="ruleForm.prove.security"
                            fit="fill"></el-image>
                </el-table-column>
                <el-table-column
                    prop="imageUrl2"
                    label="其他证明" align="center" v-if="ruleForm.prove.other">
                  <el-image :src="ruleForm.prove.other"
                            fit="fill"></el-image>
                </el-table-column>
              </el-table>
            </el-dialog>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="学历信息" v-if="update_ids.indexOf(1) !== -1" name="school">
        <div>
          <div class="text item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>学历信息</span>
              </div>
              <el-card class="box-card" v-for="(item,i) in ruleForm.school_list" :key="i" :body-style="boxcard">
                <el-form ref="school_ref" :model="item" label-width="100px" size="mini" :rules="school_ref">
                  <el-divider>学历 {{ i + 1 }}</el-divider>
                  <el-form-item label="学历:" prop="education">
                    <template>
                      <el-select v-model="item.education" placeholder="请选择" clearable>
                        <el-option
                            v-for="opt in education_options"
                            :key="opt"
                            :label="opt"
                            :value="opt">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
                  <el-form-item label="学校:" prop="school">
                    <el-input v-model="item.school" maxlength="10" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="专业:" prop="speciality">
                    <el-input v-model="item.speciality" maxlength="10" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="上学时间" prop="time">
                    <el-date-picker
                        v-model="item.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="入学日期"
                        end-placeholder="毕业日期" clearable
                    >
                    </el-date-picker>

                  </el-form-item>
                  <el-form-item prop="diploma" label="毕业证:" v-if="item.education != '在校学生' & item.education != ''">
                    <el-upload
                        element-loading-text="上传中"
                        element-loading-spinner="el-icon-loading"
                        class="avatar-uploader"
                        :action="upload_url"
                        :show-file-list="false"
                        :on-success="(response) =>handleAvatarSuccess3(response, i, 1)"
                        :before-upload="beforeAvatarUpload"

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
                        :show-file-list="false"
                        :on-success="(response) =>handleAvatarSuccess3(response, i, 2)"
                        :before-upload="beforeAvatarUpload">
                      <img v-if="item.degree" :src="item.degree" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                  </el-form-item>
                  <el-form-item prop="stu_card" label="学生证:" v-if="item.education === '在校学生'">
                    <el-upload
                        element-loading-text="上传中"
                        element-loading-spinner="el-icon-loading"
                        class="avatar-uploader"
                        :action="upload_url"
                        :show-file-list="false" :on-success="(response) =>handleAvatarSuccess3(response, i, 6)"
                        :before-upload="beforeAvatarUpload">
                      <img v-if="item.stu_card" :src="item.stu_card" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                  </el-form-item>
                  <el-form-item label="">
                    <el-button style="float: left;" type="primary" size="small"
                               v-if="i===ruleForm.school_list.length-1"
                               @click="add_school_det()" icon="el-icon-plus" circle>
                    </el-button>
                    <el-button style="float: left;" type="danger" size="small" v-if="i!=0"
                               @click="del_school_det(i)" icon="el-icon-minus" circle>
                    </el-button>
                  </el-form-item>

                </el-form>
              </el-card>

              <el-button type="primary" size="small" @click="save_school('school_ref')"
                         style="float: right; margin-bottom: 20px;">保存
              </el-button>
            </el-card>
          </div>

        </div>

      </el-tab-pane>
      <el-tab-pane label="工作经历" v-if="update_ids.indexOf(2) !== -1" name="work">
        <div>
          <div class="text item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>工作经历</span>
              </div>
              <el-card class="box-card" v-for="(item,i) in ruleForm.work_list" :key="i" :body-style="boxcard">
                <el-form ref="work_rules" :model="item" label-width="100px" size="mini" :rules="work_rules">
                  <el-divider>工作经历{{ i + 1 }}</el-divider>
                  <el-form-item label="公司名:" prop="name">
                    <el-input v-model="item.name" maxlength="10"></el-input>
                  </el-form-item>
                  <el-form-item label="从事行业:" prop="industry">
                    <el-input v-model="item.industry" maxlength="10"></el-input>
                  </el-form-item>
                  <el-form-item label="岗位:" prop="post">
                    <el-input v-model="item.post" maxlength="10"></el-input>
                  </el-form-item>

                  <el-form-item label="技能关键词:" prop="keyword">
                    <template>
                      <el-select v-model="item.keyword" placeholder="请选择">
                        <el-option
                            v-for="item in subjects"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                        <el-option value="其他技能" label="其他技能"></el-option>
                      </el-select>
                    </template>
                  </el-form-item>
                  <el-form-item label="其他技能:" prop="keyword_new" v-if="item.keyword == '其他技能'">
                    <el-input v-model="item.keyword_new" maxlength="10"></el-input>
                  </el-form-item>

                  <el-form-item label="工作时间:" prop="time">
                    <el-date-picker
                        v-model="item.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="入职时间"
                        end-placeholder="离职时间">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button style="float: left;" type="primary" size="small"
                               v-if="i===ruleForm.work_list.length-1"
                               @click="add_work_det()" icon="el-icon-plus" circle>
                    </el-button>

                    <el-button style="float: left;" type="danger" size="small" v-if="i!=0"
                               @click="del_work_det(i)" icon="el-icon-minus" circle>
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-card>
              <el-button type="primary" size="small" @click="save_work('work_rules')"
                         style="float: right; margin-bottom: 20px;">保存
              </el-button>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="掌握技能" v-if="update_ids.indexOf(4) !== -1" name="knowledge_list">
        <div>
          <div class="text item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>掌握技能</span>
              </div>
              <el-card class="box-card" v-for="(item,i) in ruleForm.knowledge_list" :key="i" :body-style="boxcard">
                <el-form ref="knowledge_rules" :model="item" label-width="120px" size="mini" :rules="knowledge_rules">
                  <el-divider>专业技能</el-divider>
                  <el-form-item label="技能类型:">
                    <template>
                      <el-radio v-model="item.type" label="1">平台技能</el-radio>
                      <el-radio v-model="item.type" label="2">其他技能</el-radio>
                    </template>
                  </el-form-item>
                  <el-form-item label="技能名称:" prop="name" v-if="item.type == 1">
                    <template>
                      <el-select v-model="item.name" placeholder="请选择">
                        <el-option
                            v-for="item in subjects"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
                  <el-form-item label="技能名称:" prop="name" v-if="item.type == 2">
                    <el-input v-model="item.name" maxlength="10"></el-input>
                  </el-form-item>
                  <el-form-item label="使用时长(月):" prop="use_month">
                    <el-input v-model.number="item.use_month" maxlength="10"></el-input>
                  </el-form-item>
                  <el-form-item label="掌握程度:" prop="level">
                    <template>
                      <el-radio v-model="item.level" label="1">一般</el-radio>
                      <el-radio v-model="item.level" label="2">熟练</el-radio>
                      <el-radio v-model="item.level" label="3">良好</el-radio>
                      <el-radio v-model="item.level" label="4">精通</el-radio>
                    </template>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button style="float: left;" type="primary" size="small"
                               v-if="i===ruleForm.knowledge_list.length-1"
                               @click="add_knowledge_det()" icon="el-icon-plus" circle>
                    </el-button>

                    <el-button style="float: left;" type="danger" size="small" v-if="i!=0"
                               @click="del_knowledge_det(i)" icon="el-icon-minus" circle>
                    </el-button>
                  </el-form-item>

                </el-form>
              </el-card>
              <el-button type="primary" size="small" @click="save_knowledge('knowledge_rules')"
                         style="float: right; margin-bottom: 20px;">保存
              </el-button>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="其他证明" v-if="update_ids.indexOf(3) !== -1" name="prove">
        <div>
          <div class="text item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>其他证明</span>
              </div>
              <el-form ref="prove_rules" :model="ruleForm.prove" label-width="100px" size="mini" :rules="prove_rules">
                <el-divider>其他证明材料</el-divider>
                <el-form-item label="在职证明:" prop="work">
                  <el-upload
                      element-loading-text="上传中"
                      element-loading-spinner="el-icon-loading"
                      class="avatar-uploader"
                      :action="upload_url"
                      :show-file-list="false"
                      :on-success="(response) =>handleAvatarSuccess3(response, 0, 3)"
                      :before-upload="beforeAvatarUpload">
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
                      :before-upload="beforeAvatarUpload">
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
                      :before-upload="beforeAvatarUpload">
                    <img v-if="ruleForm.prove.other" :src="ruleForm.prove.other" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-card>
            <el-button type="primary" size="small" @click="save_prove('prove_rules')"
                       style="float: right; margin-bottom: 20px;">保存
            </el-button>
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
      education: '',
      diploma: '',
      degree: '',
      stu_card: '',
      prove_img_dialog: false,
      dialog_email: false,
      send_email: "",
      update_ids: [],
      dialog_phone: false,
      send_phone_number: '',
      code: '',
      active: 1,
      school_img_dialog: false,
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
      isShow: false,
      disabled: false,
      go_login_second: 3,
      timeout: null,
      // 其他证明验证
      prove_rules: {
        work: [
          {required: true, message: '请上传在职证明', trigger: 'blur'},
        ],
        security: [
          {required: true, message: '请上传社保证明', trigger: 'blur'},
        ],

      },
      // 技能信息验证
      knowledge_rules: {
        name: [
          {required: true, message: '请选择或输入技能名称', trigger: 'blur'},
        ],
        use_month: [
          {required: true, message: '请输入使用时长', trigger: 'blur'},
        ],
        level: [
          {required: true, message: '请选择掌握程度', trigger: 'blur'},
        ],
      },
      // 工作信息验证
      work_rules: {
        name: [
          {required: true, message: '请填写公司名称', trigger: 'blur'},
        ],
        industry: [
          {required: true, message: '请填写从事行业', trigger: 'blur'},
        ],
        post: [
          {required: true, message: '请填写岗位', trigger: 'blur'},
        ],
        time: [
          {required: true, message: '请选择工作时间', trigger: 'blur'},
        ],
        keyword: [
          {required: true, message: '请填写技能关键词', trigger: 'blur'},
        ],
        keyword_new: [
          {required: true, message: '请填写技能关键词', trigger: 'blur'}
        ]
      },
      school_ref: {
        education: [
          {required: true, message: '请填写学历', trigger: 'blur'},
        ],
        school: [
          {required: true, message: '请填写毕业学校', trigger: 'blur'},
        ],
        speciality: [
          {required: true, message: '请填写专业', trigger: 'blur'},
        ],
        diploma: [
          {required: true, message: '请上传毕业证', trigger: 'blur'},
        ],
        stu_card: [
          {required: true, message: '请上传学生证', trigger: 'blur'},
        ],
        time: [
          {required: true, message: '请填写上学时间', trigger: 'blur'},
        ]
      },
    };
  },

  mounted() {

  },
  created() {
    this.init_data()
  },
  methods: {
    look_school(item) {
      console.log(item)
      this.education = item.education;
      this.diploma = item.diploma;
      this.degree = item.degree;
      this.stu_card = item.stu_card;
      this.school_img_dialog = true;
    },
    toTop() {
      document.documentElement.scrollTop = 0;
    },
    // 处理时间
    handle_times(time) {
      var start_time_year = time[0].getFullYear();
      var start_time_moth = time[0].getMonth() + 1;
      var start_time_day = time[0].getDate();
      if (start_time_moth < 10) {
        start_time_moth = '0' + start_time_moth
      }
      if (start_time_day < 10) {
        start_time_day = '0' + start_time_day
      }
      var end_time_year = time[1].getFullYear();
      var end_time_moth = time[1].getMonth() + 1;
      var end_time_day = time[1].getDate();
      if (end_time_moth < 10) {
        end_time_moth = '0' + end_time_moth
      }
      if (end_time_day < 10) {
        end_time_day = '0' + end_time_day
      }
      var start_time = `${start_time_year}${start_time_moth}${start_time_day}`
      var end_time = `${end_time_year}${end_time_moth}${end_time_day}`
      return [start_time, end_time]
    },
    save_prove(formName) {
      var thsi = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var post_data = {
            step_id: 4,
            prove: JSON.stringify(this.ruleForm.prove)
          }
          this.$http.post("/interviewer/save/", post_data).then(res => {
            if (res.data.response === 'ok') {
              this.update_ids.splice(this.update_ids.indexOf(1), 1)
              this.activeName = 'first';
              this.init_data()
            } else {
              thsi.$message.error(res.data.message);
            }
          })
        }
      });
    },
    save_school(formName) {
      var thsi = this;
      let is_val = false;
      this.$.each(this.$refs[formName], function (i) {
        this.validate((valid) => {
          if (valid) {
            is_val = true;
          } else {
            is_val = false;
          }
        });
      })
      if (is_val) {
        this.$.each(this.ruleForm.school_list, function (i) {
          var time = thsi.handle_times(this.time)
          this.start_time = time[0]
          this.end_time = time[1]
        })
        var post_data = {
          step_id: 2,
          data: JSON.stringify(this.ruleForm.school_list)
        }
        this.$http.post("/interviewer/save/", post_data).then(res => {
          if (res.data.response === 'ok') {
            this.update_ids.splice(this.update_ids.indexOf(1), 1)
            this.activeName = 'first';
            this.init_data()
          } else {
            thsi.$message.error(res.data.message);
          }
        })
      }
    },
    // 删除学历信息
    del_school_det(index) {
      this.$confirm('确定删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ruleForm.school_list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 新增学历信息
    add_school_det() {
      if (this.ruleForm.school_list.length < 5) {
        this.ruleForm.school_list.push({
          education: "",
          school: "",
          speciality: "",
          time: [],
          diploma: "",
          degree: "",
          stu_card: "",
        })
      } else {
        this.$message.error("最多添加五个");
      }
    },
    update_data(activeName, type) {
      if (!this.update_ids.length) {
        this.$confirm('修改信息后需重新审核，再此期间您的权限将变成普通用户！是否继续？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.toTop()
          this.activeName = activeName;
          if (this.update_ids.indexOf(type) === -1) {
            this.update_ids.push(type)
          }
        })
      } else {
        this.toTop()
        this.activeName = activeName;
        if (this.update_ids.indexOf(type) === -1) {
          this.update_ids.push(type)
        }
      }


    },
    // 处理时间
    handle_time(time) {
      if (time.length) {
        var start_time_year = time[0].getFullYear();
        var start_time_moth = time[0].getMonth() + 1;
        var start_time_day = time[0].getDate();
        if (start_time_moth < 10) {
          start_time_moth = '0' + start_time_moth
        }
        if (start_time_day < 10) {
          start_time_day = '0' + start_time_day
        }
        var end_time_year = time[1].getFullYear();
        var end_time_moth = time[1].getMonth() + 1;
        var end_time_day = time[1].getDate();
        if (end_time_moth < 10) {
          end_time_moth = '0' + end_time_moth
        }
        if (end_time_day < 10) {
          end_time_day = '0' + end_time_day
        }
        var start_time = `${start_time_year}${start_time_moth}${start_time_day}`
        var end_time = `${end_time_year}${end_time_moth}${end_time_day}`
        return `${start_time} -- ${end_time}`
      }
    },
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
    // 上传毕业证\学位证\学生证
    handleAvatarSuccess3(res, i, type) {
      if (type === 1) {
        this.ruleForm.school_list[i].diploma = web_file_url + res.data[0].file_url
        console.log(i, this.school_list)
      } else if (type === 2) {
        this.ruleForm.school_list[i].degree = web_file_url + res.data[0].file_url
      } else if (type === 6) {
        this.ruleForm.school_list[i].stu_card = web_file_url + res.data[0].file_url
      } else if (type === 3) {
        this.ruleForm.prove.work = web_file_url + res.data[0].file_url
      } else if (type === 4) {
        this.ruleForm.prove.security = web_file_url + res.data[0].file_url
      } else if (type === 5) {
        this.ruleForm.prove.other = web_file_url + res.data[0].file_url
      }
      this.$forceUpdate();
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
        target: document.querySelector('#first'),
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
        if (!this.ruleForm.school_list.length) {
          this.add_school_det()
        }
        if (!this.ruleForm.work_list.length) {
          this.add_work_det()
        }
        if (!this.ruleForm.knowledge_list.length) {
          this.add_knowledge_det()
        }
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
    save_work(formName) {
      // 保存工作经历
      var thsi = this;
      let is_val = false;
      this.$.each(this.$refs[formName], function (i) {
        this.validate((valid) => {
          if (valid) {
            is_val = true;
          } else {
            is_val = false;
          }
        });
      })
      if (is_val) {
        this.$.each(this.ruleForm.work_list, function (i) {
          var time = thsi.handle_times(this.time)
          this.start_time = time[0]
          this.end_time = time[1]
          if (this.keyword_new && this.keyword_new.length) {
            this.keyword = this.keyword_new
          }
        })
        var post_data = {
          step_id: 3,
          data: JSON.stringify(this.ruleForm.work_list)
        }
        this.$http.post("/interviewer/save/", post_data).then(res => {
          if (res.data.response === 'ok') {
            this.update_ids.splice(this.update_ids.indexOf(2), 1)
            this.activeName = 'first';
            this.init_data()
          } else {
            thsi.$message.error(res.data.message);
          }
        })
      }
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

    // 新增工作经历
    add_work_det() {
      if (this.ruleForm.work_list.length < 5) {
        this.ruleForm.work_list.push({
          name: "",
          industry: "",
          post: "",
          time: [],
          start_time: "",
          end_time: "",
          keyword: "",
        })
      } else {
        this.$message.error("最多添加五个");
      }
    },
    // 删除工作经历
    del_work_det(index) {
      this.$confirm('确定删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ruleForm.work_list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    save_knowledge(formName) {
      // 保存掌握技能
      var thsi = this;
      let is_val = false;
      this.$.each(this.$refs[formName], function (i) {
        this.validate((valid) => {
          if (valid) {
            is_val = true;
          } else {
            is_val = false;
          }
        });
      })
      if (is_val) {
        var post_data = {
          step_id: 5,
          data: JSON.stringify(this.ruleForm.knowledge_list)
        }
        this.$http.post("/interviewer/save/", post_data).then(res => {
          if (res.data.response === 'ok') {
            this.update_ids.splice(this.update_ids.indexOf(3), 1)
            this.activeName = 'first';
            this.init_data()
          } else {
            thsi.$message.error(res.data.message);
          }
        })
      }
    },
    // 新增技能
    add_knowledge_det() {
      if (this.ruleForm.knowledge_list.length < 20) {
        this.ruleForm.knowledge_list.push({
          name: "",
          sid: "",
          level: "",
          type: "1",
          use_month: "",
        })
      } else {
        this.$message.error("最多添加20个技能");
      }
    },
    // 删除技能
    del_knowledge_det(index) {
      this.$confirm('确定删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ruleForm.knowledge_list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

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
<style lang="scss">
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
  padding-bottom: 0 !important;
  width: 100% !important;
}

.el-dialog__wrapper {
  z-index: 998 !important;
}

.el-button--medium {
  padding: 0;
  margin-top: 4px;

}

.el-card.prove .el-card__body {
  padding: 0;
}
</style>
