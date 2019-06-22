<template>
  <el-container>
    <el-header>
      <div class="box">
        <a href="#">
          <img src="../assets/heima.png" alt>
        </a>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="iscollapse ? '64px': '200px'">
        <dir
          :class="iscollapse ? 'switch el-icon-s-unfold' : 'switch el-icon-s-fold'"
          id
          @click="toggleCollapse"
        ></dir>
        <el-menu
          :default-active="state"
          background-color="rgb(54, 43, 54)"
          text-color="#fff"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
        >
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="icons[item.id]"></i>
              <span slot="title" class="title">{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="setState('/' + subItem.path)"
            >
              <template>
                <i class="el-icon-menu"></i>
                <span slot="title">{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      icons: {
        "125": "iconfont icon-users",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao"
      },
      iscollapse: false,
      state: '',
    };
  },

  methods: {
    exit() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data } = await this.$axios.get("menus");
      if (data.meta.status != 200) return;
      this.menuList = data.data;
    },
    toggleCollapse() {
      this.iscollapse = !this.iscollapse;
    },
    setState(state) {
      sessionStorage.setItem('state', state)
      this.state = state
    }
  },

  created() {
    this.getMenuList();
    this.state = sessionStorage.getItem('state')
  }
};
</script>

<style lang='less' scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: rgb(56, 54, 54);
  padding: 10px;
  .box {
    display: flex;
    align-items: center;
    padding: 0px;
    span {
      margin-left: 10px;
      font-size: 20px;
      color: #fff;
    }
  }
}

.el-aside {
  background-color: rgb(54, 43, 54);
  .title {
    margin-left: 10px;
  }
  .el-menu {
    border: 0;
  }
}

.el-main {
  background-color: #eee;
}

.el-container {
  height: 100%;
}

.switch {
  height: 25px;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #4a5064;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
}
</style>
