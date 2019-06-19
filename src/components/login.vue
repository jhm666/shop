<template>
  <div class="login">
    <div class="box">
      <div class="avatar">
        <img src="../assets/logo.png" alt>
      </div>
      <el-form :model="formLabelAlign" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="formLabelAlign.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="formLabelAlign.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelAlign: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async flag => {
        if (!flag) return;
        var { data } = await this.$axios.post("login", this.formLabelAlign);
        if (data.meta.status != 200) return this.$msg.error("登陆失败");
        this.$msg.success("恭喜你,登陆成功");
        window.sessionStorage.setItem('token', data.data.token)
        this.$router.push('/home')
      });
    }
  },

  created() {}
};
</script>

<style lang='less' scoped>
.login {
  background-color: #2b4b6b;
  height: 100%;
  .box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px;
      box-shadow: 0 0 20px #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .el-form {
      width: 100%;
      position: absolute;
      bottom: 0;
      .el-form-item {
        padding: 0 20px;
      }
      .btns {
        float: right;
        margin: 0 20px 15px 0;
      }
    }
  }
}
</style>
