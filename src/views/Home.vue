<template>
  <el-container class="home-page">
    <el-aside class="aside-nav">
      <div class="logo">
        <img src="../assets/logo.png">
      </div>
      <el-menu :router="true" class="nav-menu" :default-active="getDefault($route.name)">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">DashBoard</span>
        </el-menu-item>
        <el-menu-item index="/addArticle">
          <i class="el-icon-plus"></i>
          <span slot="title">新增文章&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </el-menu-item>
        <el-menu-item index="/manageArticle">
          <i class="el-icon-setting"></i>
          <span slot="title">管理文章&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </el-menu-item>
        <el-menu-item index="/login">
          <i class="el-icon-d-arrow-left"></i>
          <span slot="title">退出登录&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  methods: {
    getDefault(path) {
      switch (path) {
        case 'dashboard':
          return '/';
        case 'add-article':
          return '/addArticle';
        case 'edit-article':
          return '/manageArticle';
        case 'manage-article':
          return '/manageArticle';
        case 'view-article':
          return '/manageArticle';
      }
    }
  }
}
</script>

<style>
.home-page {
  height: 100%;
}
.home-page .aside-nav {
  height: 100%;
  background-color: #ffffff;
}
.home-page .nav-menu.el-menu {
  border: 0;
}
.home-page .main {
  background-color: #f4f8fb;
}
</style>