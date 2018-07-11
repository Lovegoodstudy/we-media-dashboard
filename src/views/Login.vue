<template>
  <div class="login-page">
    <div class="login-img">
        <img src="../assets/login.png">
    </div>
    <el-form class="login-form" ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-button" @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {
  },
  methods: {
    onLogin() {
      this.$message.success('登录成功');
      setTimeout(() => {
        this.$router.push({
          path: '/',
          name: 'dashboard',
        });
      }, 1000);
    }
  },
  data: () => {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  }
}
</script> 

<style>
.login-page {
  max-width:420px;
  margin: 0 auto;
}
.login-img {
  padding: 96px 0 28px 0;
}
.login-img img {
  width: 260px;
}
.login-form {
  padding: 0 60px;
}

.el-button.login-button {
  margin-top: 4px;
  margin-bottom: 96px;
  height: 48px;
  width: 100%;
  color: #ffffff;
  border-color: transparent;
  background-color: #ec4b57;
}

.el-button.login-button:hover {
  border-color: transparent;
  background-color: #ffffff;
}
</style>