<template>
  <div class="content">
    <div class="text main-text" v-if="open_role.indexOf('1') === -1"
         :style='{"padding":"0","boxShadow":"0 0 6px rgba(0,0,0,.1)","margin":"0 auto","borderColor":"rgba(0,0,0,.3)","backgroundColor":"#f7f7f7","color":"#333","borderRadius":"6px","borderWidth":"0","width":"auto","lineHeight":"auto","fontSize":"24px","borderStyle":"solid"}'>
      欢迎使用 {{ this.$project.projectName }}
    </div>
  <el-card class="box-card" style="width: 90%; height: 70%;margin-top: 20px;" v-if="open_role.indexOf('1') !== -1">
    <div slot="header" class="clearfix">
      <span style="float: left;">科目发展数据</span>
    </div>
    <div id="c1" style="padding: 30px;"></div>
  </el-card>

  </div>
</template>
<script>
import * as G2 from '@antv/g2'

export default {
  data() {
    return {
      open_role: this.$storage.get("open_role"),
      subject_list: []
    };
  },
  mounted() {
    this.init();
  },
  created() {

  },
  methods: {

    init() {
      this.$http({
          url: `home/index/`,
          method: "get"
      }).then(({data}) => {
        const chart = new G2.Chart({
        container: 'c1',
        autoFit: false,
        height: window.innerHeight * 0.6,
        width: window.innerWidth * 0.8,
        padding: [ 20, 180, 20, 30 ] // 上，右，下，左
      });
      console.log(data.data.subject_list)
      chart.data(data.data.subject_list);
      chart.scale('sales', {
        tickInterval: 20
      });

      chart.interval().position('name*num');
      chart.render();
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 500px;
  text-align: center;
  background: transparent;

  .main-text {
    font-size: 38px;
    font-weight: bold;
    margin-top: 15%;
  }

  .text {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}
</style>