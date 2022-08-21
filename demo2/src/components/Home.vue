<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧下拉 -->
      <!-- 应该有两个宽度
			 200  64 两个值
			 也就是说  我再width这个属性的时候  也是动态绑定的属性
			 
			 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>

        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activepath"
        >
          <!-- 这为什么要写key  因为规定这个唯一标识符 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 当我menu 开启路由模式的时候  menu会把index属性的值作为我跳转的地址 -->
            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="saveNavState('/' + subitem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符  这样才能呈现我的子组件 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
export default {
  data() {
    return {
      menulist: [],
      // 凡是能从接口当中读取的数据  一般都用数组进行定义和承接
      // 一般能从页面上获取的数据，都用{}对象来承接

      // 一级列表的图标  每一个不一样 要动态获取图标
      // 手动将图标编写成key和value的形式   id为key值  value值为图标名
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      //控制菜单是折叠还是展开的选项
      isCollapse: false,
      activepath: "",
    };
  },
  created() {
    this.getMenuList();
    // 创建时就为点击蓝色
    this.activepath = window.sessionStorage.getItem("activepath");
  },
  methods: {
    logout() {
      // 登录时是通过把token保存在session中 验证是否登录
      // 退出登录就是讲token删除，再通过路由跳转的方式调回登录组件
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 向服务器请求左侧列表的函数
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      this.menulist = res.data;
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activepath) {
      window.sessionStorage.setItem("activepath", activepath);
      this.activepath = activepath;
    },
  },
};
</script>

<style lang="less" scoped="scoped">
  .home-container {
    height: 100%;
  }
  // 特性 就是标签的名字  就是你class的名字
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    color: #fff;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }

    img {
      width: 13%;
    }
  }

  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    color: #fff;
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    // 让三个||| 彼此之间不要那么近 有一定距离 0.3em
    letter-spacing: 0.3em;
    // 变成小手的样式
    cursor: pointer;
  }
</style>