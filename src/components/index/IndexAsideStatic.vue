<template>
  <el-aside class="index-aside" width="190px">
    <div class="index-aside-inner menulist">
      <div class="menulist-item">

        <el-menu mode="vertical" :unique-opened="true" class="el-menu-demo" default-active="">
          <el-menu-item index="0" @click="menuHandler('')"><i v-if="true" class="el-icon-menu el-icon-s-home"/>首页
          </el-menu-item>
          <el-submenu :index="'1'">
            <template slot="title">
              <i v-if="true" class="el-icon-menu el-icon-user-solid"/>
              <span>个人中心</span>
            </template>
            <el-menu-item :index="'1-2'" @click="menuHandler('center')">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu v-for=" (menu,index) in menuList" :key="menu.id" :index="index+2+''"
                      style="border-color: rgb(50, 65, 87) !important">
            <template slot="title">
              <i class="el-icon-menu" :class="menu.icon"/>
              <span>{{ menu.mod_name }}</span>
            </template>
            <el-menu-item v-for=" (child,sort) in menu.child" :key="sort" :index="(index+2)+'-'+sort"
                          @click="menuHandler(child.mod_path)">{{ child.mod_name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </el-aside>
</template>

<script>
import router from '@/router/router-static'

export default {
  data() {
    return {
      menuList: [],
      role: '',
    }
  },
  mounted() {

      this.$http({
        url: `menu_list/`,
        method: "get",
      }).then(({data}) => {
        if (data.code === 401){
          this.$storage.clear();
          router.push({ name: 'login' })
        }
        this.menuList = data.data;
          this.$storage.set("menus", this.menuList);
      })
    this.role = this.$storage.get('role')
  },
  created() {
    //
  },
  methods: {

    menuHandler(name) {
      let router = this.$router
      name = '/' + name
      router.push(name)
    },


  }
}
</script>
<style lang="scss" scoped>
.el-container {
  display: block;
}

.index-aside {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;

  .menulistImg {
    font-size: 0;
    box-sizing: border-box;

    .el-image {
      margin: 0 auto;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      display: block;
    }
  }

  .index-aside-inner {
    height: 100%;
    margin-right: -17px;
    margin-bottom: -17px;
    overflow: scroll;
    overflow-x: hidden !important;
    padding-top: 60px;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }

    & /deep/ .el-menu {
      border: 0;
      background-color: transparent;
    }
  }

  .index-aside .index-aside-inner.menulist {
    height: 100% !important;
  }

  .menulist-item {
    width: 190px;
    margin: 0;
    border-radius: 0;
    border-width: 0 0 0px 0 !important;
    border-style: solid !important;

    background: rgb(52, 57, 87) !important;
    box-shadow: 0 0 6px rgba(30, 144, 255, .2);
    box-sizing: border-box;
  }

  .el-menu-demo {
    box-sizing: border-box;
    min-height: calc(100vh - 60px);

    & > .el-menu-item {
      width: auto;
      height: auto !important;
      line-height: 35px !important;
      padding: 10px 22px 10px 10px;
      color: rgb(191, 203, 217);
      font-size: 14px;
      border-radius: 0;
      border-width: 0 0 1px 0;
      border-style: solid;
      border-color: rgba(218, 218, 218, 0.15) !important;
      background-color: rgb(50, 65, 87) !important;
      box-shadow: 0 0 6px rgba(255, 255, 255, 0);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;

      .el-icon-menu {
        margin: 0 5px 0 0;
        padding: 0;
        width: 24px;
        line-height: 24px;
        color: rgba(144, 147, 153, 1);
        font-size: 16px;
        border-radius: 0;
        border-width: 0;
        border-style: solid;
        border-color: #fff;
        background-color: rgb(50, 65, 87) !important;
        box-shadow: 0 0 6px rgba(255, 255, 255, 0);
      }
    }

    .el-submenu {
    }

    & /deep/ .el-submenu__title {
      width: auto;
      height: auto !important;
      line-height: 35px !important;
      padding: 10px 22px 10px 10px;
      color: rgb(191, 203, 217);
      font-size: 14px;
      border-radius: 0;
      border-width: 0 0 1px 0;
      border-style: solid;
      border-color: rgba(218, 218, 218, 0.15) !important;
      background-color: rgb(50, 65, 87) !important;
      box-shadow: 0 0 6px rgba(255, 255, 255, 0);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;

      .el-icon-menu {
        margin: 0 5px 0 0;
        padding: 0;
        width: 24px;
        line-height: 24px;
        color: rgba(144, 147, 153, 1);
        font-size: 16px;
        border-radius: 0;
        border-width: 0;
        border-style: solid;

        background-color: rgb(50, 65, 87);
        box-shadow: 0 0 6px rgba(255, 255, 255, 0);
      }

      .el-submenu__icon-arrow {
        margin: 0 10px 0 0;
        padding: 0;
        width: 12px;
        line-height: 12px;
        color: rgba(144, 147, 153, 1) !important;
        font-size: 12px;
        border-radius: 0;
        border-width: 0;
        border-style: solid;

        background-color: rgb(50, 65, 87) !important;
        box-shadow: 0 0 6px rgba(255, 255, 255, 0);
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        text-align: center;
        display: block;
      }
    }

    & /deep/ .el-menu.el-menu--inline {
      //width: 150px;
      height: auto;
      padding: 0;
      margin: 0;
      //border-radius: 0px;
      //border-width: 0;
      //border-style: solid;
      //border-color: rgba(0, 0, 0, .3);
      //background-color: rgb(50, 65, 87);
      //box-shadow: 0 0 6px rgba(0, 0, 0, .3);

      .el-menu-item {
        width: 100%;
        height: 44px;
        line-height: 44px;
        padding: 0 0 0 30px !important;
        margin: 0;
        color: rgb(191, 203, 217) !important;
        font-size: 14px;
        border-radius: 0;
        border-width: 0;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0);
        background-color: #242f42 !important;
        box-shadow: 0 0 6px rgba(30, 144, 255, 0);
        text-align: left;
        min-width: auto;

        &.is-active {
          width: 100%;
          height: 44px;
          line-height: 44px;
          padding: 0 0 0 30px !important;
          margin: 0;
          color: rgba(255, 255, 255, 1) !important;
          font-size: 14px;
          border-radius: 0;
          border-width: 0;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0);
          background-color: #409eff !important;
          box-shadow: 0 0 6px rgba(30, 144, 255, 0);
          text-align: left;
        }

        &:hover {
          width: 100%;
          height: 44px;
          line-height: 44px;
          padding: 0 0 0 30px !important;
          margin: 0;
          color: rgba(255, 255, 255, 1) !important;
          font-size: 14px;
          border-radius: 0;
          border-width: 0;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0);
          background-color: #409eff !important;
          box-shadow: 0 0 6px rgba(30, 144, 255, 0);
          text-align: left;
        }
      }
    }
  }
}
</style>
<style>

.el-menu--horizontal .el-menu--popup {
  width: 150px;
  height: auto;
  padding: 0;
  margin: 0;
  border-radius: 0px;
  border-width: 0;
  border-style: solid;
  border-color: rgba(0, 0, 0, .3);
  background-color: rgb(50, 65, 87) !important;
  box-shadow: 0 0 6px rgba(0, 0, 0, .3);
  min-width: auto;
}

.el-menu--horizontal .el-menu--popup .el-menu-item {
  width: 100%;
  height: 44px;
  line-height: 44px;
  padding: 0 0 0 30px;
  margin: 0;
  color: rgba(255, 255, 255, 1) !important;
  font-size: 14px;
  border-radius: 0;
  border-width: 0;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0);
  background-color: rgb(50, 65, 87) !important;
  box-shadow: 0 0 6px rgba(30, 144, 255, 0);
  text-align: left;
  min-width: auto;
}

.el-menu--horizontal .el-menu--popup .el-menu-item:hover {
  width: 100%;
  height: 44px;
  line-height: 44px;
  padding: 0 0 0 30px;
  margin: 0;
  color: rgba(255, 255, 255, 1) !important;
  font-size: 14px;
  border-radius: 0;
  border-width: 0;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0);
  background-color: #409eff !important;
  box-shadow: 0 0 6px rgba(30, 144, 255, 0);
  text-align: left;
}
</style>
