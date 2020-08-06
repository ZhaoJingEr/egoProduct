<template>
    <div class="login">
        <el-tabs  v-model="activeName" type="border-card" class="login-tabs" stretch @tab-click="handleClick">
            <el-tab-pane label="用户登录" name="login" class="login-tabs-tab">
                <el-form :model="user" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-form">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            
            <el-tab-pane label="用户注册" name="register">
                <el-form :model="user" status-icon :rules="rules" ref="registerForm" label-width="100px" class="login-form">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="surePassword">
                        <el-input type="password" v-model="user.surePassword"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        
        
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    //   用户名验证
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } 
      callback();
    };
    // 密码验证
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } 
      callback();
    };

    //确认密码
    var validateSurePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } 
      callback();
    };

    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } 
      callback();
    };

    return {
      user: {
        username: "",
        password: "",
        surePassword: "",
        email:""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        surePassword: [{ validator: validateSurePassword, trigger: "blur" }]
      },
      activeName:"login"
    };
  },
  methods:{
      ... mapActions("loginModule",["setUserActions"]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            // console.log(this.activeName);
            if(this.activeName === "login"){
                        /**
                         * 登陆
                         */
                this.setUserActions(this.user)        
            }
            
            if(this.activeName === "register"){
              // 注册
              this.$api.register({
                 username:this.user.username,
                 password:this.user.password,
                 email:this.user.email
              }).then(res =>{
                console.log(res.data)
              })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClick(tab, event) {
        // console.log(tab, event);

      }
  }
  
};
</script>

<style scoped lang="less">
.login {
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    .login-form {
        padding: 40px 40px;
    }
    h3 {
        margin-top: 20px;
    }
    .login-tabs {
        border-radius: 5px;
    }
}
</style>


